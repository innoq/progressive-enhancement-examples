"use strict";

module.exports = {
	watchDirs: ["./components", "./lib"],
	js: [{
		source: "./lib/scripts.js",
		target: "./public/bundle.js"
	}],
	sass: [{
		source: "./lib/styles.scss",
		target: "./public/bundle.css"
	}]
};
