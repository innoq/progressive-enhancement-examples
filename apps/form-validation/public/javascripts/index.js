// limits the rate of `fn` invocations
// `delay` is the rate limit in milliseconds
// `ctx` (optional) is the function's execution context (i.e. `this`)
// `fn` is the respective function
// adapted from StuffJS <https://github.com/bengillies/stuff-js>
function debounce(delay, ctx, fn) {
	if(fn === undefined) { // shift arguments
		fn = ctx;
		ctx = null;
	}

	let timer;
	return function() {
		let args = arguments;
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(_ => {
			fn.apply(ctx, args);
			timer = null;
		}, delay);
	};
}

function html2dom(html) {
	let parser = new DOMParser();
	return parser.parseFromString(html, "text/html");
}

function replaceNode(oldNode, ...newNodes) {
	let container = oldNode.parentNode;
	newNodes.forEach(node => {
		container.insertBefore(node, oldNode);
	});
	container.removeChild(oldNode);
}

function serializeForm(form) {
	return [].slice.call(form.querySelectorAll("input"))
		.map(input => input.name + "=" + input.value)
		.join("&");
}

function getDescription(document, input) {
	if (!input.hasAttribute("aria-describedby")) {
		return null;
	}
	return document.getElementById(input.getAttribute("aria-describedby"));
}

/*
Add a listener for keydowns for an input field (with a debounce!). On keydown,
make a request to the server which returns the HTML form validated. Then
find the correct input field in the returned HTML and replace the necessary
information:
1. Toggle the class (has-errors)
2. Update the aria-describedby attribute based on whether or not there are errors
3. Update the errors element in the DOM
*/

class FormValidator extends HTMLFormElement {
	connectedCallback() {
		this.inputs.forEach(input => this.addListenerForInput(input));
	}

	addListenerForInput(input) {
		input.addEventListener("keyup", debounce(500, event => {
			let inputField = event.target;

			if (event.keyCode === 9) { // Prevent validation directly when the user tabs into the field
				return;
			}

			// /* POSSIBLE SOLUTION:	*/

			// fetch(this.validationUri + "?" + serializeForm(inputField.closest('form')))
			// 	.then(res => res.text())
			// 	.then(html => {

			// 		let newDocument = html2dom(html);

			// 		let newInput = newDocument.getElementById(inputField.id);

			// 		let oldError = document.getElementById(inputField.getAttribute("aria-describedby"));
			// 		let newError = newDocument.getElementById(newInput.getAttribute("aria-describedby"));

			// 		inputField.classList = newInput.classList;

			// 		if (oldError && newError) {
			// 			replaceNode(oldError, newError);
			// 		} else if (oldError) {
			// 			inputField.removeAttribute("aria-describedby");
			// 			oldError.innerHTML = "";
			// 		} else if (newError) {
			// 			inputField.setAttribute("aria-describedby", newError.id);
			// 			replaceNode(document.getElementById(newError.id), newError);
			// 		}
			// 	});

		}));
	}

	get inputs() {
		return this.querySelectorAll("input");
	}

	get validationUri() {
		return this.getAttribute("data-validation-uri") || this.action;
	}
}

customElements.define("form-validator", FormValidator, { extends: 'form' });

