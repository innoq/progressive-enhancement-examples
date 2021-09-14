// 1. First build an embeddable-link component without using custom elements
// 2. Then modify it to use custom elements to initialize the component

import { EmbeddedLink } from "./elements/embedded-link";

customElements.define("embedded-link", EmbeddedLink);

// document.querySelectorAll("embedded-link a")
// 	.forEach(a => replaceLink(a));

































// /* POSSIBLE SOLUTION */
// import { EmbeddedLink } from "./elements/embedded-link";

// customElements.define("embedded-link", EmbeddedLink);
