export function html2dom(html) {
	let parser = new DOMParser();
	return parser.parseFromString(html, "text/html");
}
