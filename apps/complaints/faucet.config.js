"use strict";

module.exports = {
    watchDirs: ["./views/components", "./lib/styles"],
    sass: [{
        source: "./lib/styles/index.scss",
        target: "./dist/bundle.css"
    }]
};
