export class EmbeddedLink extends HTMLElement {
	connectedCallback() {
		this.replaceLink(this.link);
	}

	replaceLink(a) {
		fetch(a.href)
			.then(response => response.text())
			.then(html => {
				a.outerHTML = html;
			});
	}

	get link() {
		return this.querySelector("a");
	}
}
