import { html2dom } from "./util";

// Implement progressively enhanced links that retrieve / replace the document
// body upon click so that assets do not have to be added again

// /* POSSIBLE SOLUTION */
// function enhanceLink(link) {
// 	link.addEventListener("click", event => {
// 		event.preventDefault();

// 		fetch(link.href)
// 			.then(response => response.text())
// 			.then(html => {
// 				let dom = html2dom(html);

// 				document.body.outerHTML = dom.body.outerHTML;

// 				history.pushState({ selector: 'body', element: dom.body.outerHTML }, dom.title, link.href);

// 				document.querySelectorAll("a")
// 					.forEach(el => enhanceLink(el));
// 			});
// 	});
// }

// document.querySelectorAll("a")
// 	.forEach(el => enhanceLink(el));
