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

require(["angular", "nav/nav", "angular-ui-router", "bootstrap"], function(angular, nav) {
	angular.module("app", ["ui.router"])
		.value("nav", nav)
		.controller("navCtrl", function($scope) {
			$scope.nav = nav;
		})
		.config(function($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise("/about");

			$stateProvider
				.state("about", {
					url: "/about",
					templateUrl: "/about/about.html",
					controller: function() {
						nav.activate("about");
					}
				})
				.state("resume", {
					url: "/resume",
					templateUrl: "/resume/resume.html",
					controller: function() {
						nav.activate("resume");
					}
				});
		});

	angular.bootstrap(document.body, ["app"]);
});