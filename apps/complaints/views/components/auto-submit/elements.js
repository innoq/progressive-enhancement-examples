export class AutoSubmit extends HTMLElement {
	connectedCallback() {
		this.submitButton.hidden = true;
		this.fields.forEach(field => {
			field.addEventListener("change", () => {
				this.submitButton.click();
			});
		});
	}

	get submitButton() {
		return this.querySelector("[type=submit]");
	}

	get fields() {
		return this.querySelectorAll("input[type=checkbox], input[type=radio], select");
	}
}
