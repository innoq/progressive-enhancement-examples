export class EmbeddedLink extends HTMLElement {
	connectedCallback() {
		fetch(this.link.href)
			.then(response => response.text())
			.then(html => {
				this.innerHTML = html;
			});
	}

	get link() {
		return this.querySelector("a");
	}
}











	// /* POSSIBLE SOLUTION */
	// connectedCallback() {
	// 	if (!this.link) {
	// 		return;
	// 	}

	// 	fetch(this.link.href)
	// 		.then(response => response.text())
	// 		.then(html => {
	// 			this.outerHTML = html;
	// 		});
	// }

	// get link() {
	// 	return this.querySelector("a");
	// }
