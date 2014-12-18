requirejs.config({
	baseUrl: "/",
	paths: {
		"angular": "bower_components/angular/angular.min",
		"angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router.min",
		"bootstrap": "bower_components/bootstrap/dist/js/bootstrap.min",
		"jquery": "bower_components/jquery/dist/jquery.min"
	},
	shim: {
		"angular-ui-router": {
			deps: ["angular"]
		},
		"angular": {
			exports: "angular",
			deps: ["jquery"]
		},
		"bootstrap": {
			deps: ["jquery"]
		}
	}
});

require(["angular", "angular-ui-router", "bootstrap"], function(angular) {
	angular.module("app", ["ui.router"])
		.config(function($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise("/about");

			$stateProvider.state("about", {
				url: "/about",
				templateUrl: "/about/about.html"
			});
		});

	angular.bootstrap(document.body, ["app"]);
});