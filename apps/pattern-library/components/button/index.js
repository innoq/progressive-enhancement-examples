// /* POSSIBLE SOLUTION */
class AlertButton extends HTMLButtonElement {
	connectedCallback() {
		this.addEventListener("click", () => {
			alert(this.text);
		});
	}

	get text() {
		return this.getAttribute("data-text") || "button clicked!";
	}
}

customElements.define("custom-button", AlertButton, { extends: 'button' });
