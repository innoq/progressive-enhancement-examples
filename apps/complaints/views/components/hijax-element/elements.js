import { submitForm } from "hijax-form/util";
import { replaceNode } from "uitil/dom";
import { html2dom } from "../../../lib/scripts/util";

export class HijaxElement extends HTMLElement {
	connectedCallback() {
		this.forms.forEach(form => {
			form.addEventListener("submit", event => {
				if (form.getAttribute("data-hijax") !== "disable") {
					event.preventDefault();

					submitForm(form)
						.then(response => response.text())
						.then(html => {
							let htmlDom = html2dom(html);
							let hijaxElement = htmlDom.querySelector(this.selector);

							replaceNode(this, hijaxElement);
						})
				}
			});
		});
	}

	get selector() {
		if (this.id) {
			return `${this.tagName}#${this.id}`;
		}
		return `${this.tagName}`;
	}

	get forms() {
		return this.querySelectorAll("form");
	}
}
