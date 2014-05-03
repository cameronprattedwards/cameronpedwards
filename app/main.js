var requirejs = require("requirejs");

requirejs.config({
	paths: {
		"genius": "lib/genius",
	},
	baseUrl: __dirname + "/../",
	nodeRequire: require
});

requirejs(["genius/dependencies/server/real"], function () {
	requirejs(["app/config", "genius/Router", "app/controllers/IndexController", "app/controllers/BlogController"], function (config, Router, IndexController) {
		Router.registerRoute("/:controller/:action/:id", {});

		Router.registerRoute("/:controller/:action", {
			controller: "index",
			action: "index"
		});

		Router.registerRoute("/:action", {
			controller: "index"
		});

		Router.registerRoute("/:controller", {
			action: "index"
		});

		Router.registerRoute("/", {
			controller: "index",
			action: "index"
		});

		Router.start();
	});
});