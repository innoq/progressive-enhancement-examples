"use strict";

module.exports = {
	watchDirs: ["./views/components", "./lib"],
	js: [{
		source: "./lib/scripts/index.js",
		target: "./dist/bundle.js"
	}],
	sass: [{
		source: "./lib/styles/index.scss",
		target: "./dist/bundle.css"
	}],
	static: [{
		source: "./lib/images",
		target: "./dist/images"
	}]
};
