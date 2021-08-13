import { html2dom } from "../../../lib/scripts/util";
import { replaceNode } from "uitil/dom";

export class LinkEnhancer extends HTMLElement {
	connectedCallback() {
		document.querySelectorAll("a").forEach(link => {
			link.addEventListener("click", event => {
				event.preventDefault();

				fetch(link.href)
					.then(response => response.text())
						.then(html => {
							let newDocument = html2dom(html);
							let title = newDocument.title;
							let body = newDocument.body;

							replaceNode(document.body, body);

							history.pushState({ selector: 'body', element: body.outerHTML }, title, link.href);
						});
			});
		});
	}
}
