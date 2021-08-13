import { replaceNode } from "uitil/dom";
import { html2dom } from "./util";

function restoreState(event) {
	let { selector, element, url } = event.state;

	if (selector && element) {
		let domElement = html2dom(element).querySelector(selector);
		let toReplace = document.querySelector(selector);
		replaceNode(toReplace, domElement);
	} else if (url) {
		window.location.href = url;
	} else {
		throw Error(`Could not interpret ${event.state}`);
	}
}

export function historyChange(state, title, url) {
	history.pushState(state, title, url);
}

history.replaceState({ url: window.location.href }, document.title, window.location.href);
window.onpopstate = event => restoreState(event);
