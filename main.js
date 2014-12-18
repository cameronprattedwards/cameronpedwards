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
		.directive("resume", function() {
			return {
				restrict: "A",
				link: function(scope) {
					scope.open = true;
					scope.message = function() {
						var allOpen = scope.accordions.every(function(accordion) {
							return accordion.isOpen;
						});
						var allClosed = scope.accordions.every(function(accordion) {
							return !accordion.isOpen;
						});
						if (allOpen) {
							scope.open = true;
							return "Collapse";
						}
						if (allClosed) {
							scope.open = false;
							return "Open";
						}
						return scope.open ? "Collapse" : "Open";
					};
				},
				controller: function($scope) {
					var accordions = [];
					$scope.accordions = accordions;
					this.addAccordion = function(accordion) {
						accordions.push(accordion);
					};
					$scope.closeAll = function() {
						accordions.forEach(function(accordion) {
							accordion.close();
						});
					};
					$scope.openAll = function() {
						accordions.forEach(function(accordion) {
							accordion.open();
						});
					};
					$scope.toggle = function() {
						if ($scope.open)
							$scope.closeAll();
						else
							$scope.openAll();
						$scope.open = !$scope.open;
					}
				}
			};
		})
		.directive("accordion", function() {
			return {
				require: "^resume",
				restrict: "A",
				scope: {
					open: "="
				},
				transclude: true,
				templateUrl: "/accordion.html",
				link: function(scope, elem, attrs, resume) {
					resume.addAccordion(scope.ctrl);
				},
				controller: function($scope, $timeout) {
					$scope.accordion = {
						open: $scope.open
					};
					$scope.ctrl = this;
					this.isOpen = $scope.open;
					this.toggle = function() {
						var _self = this;
						$timeout(function() {
							$scope.accordion.open = !$scope.accordion.open;
							_self.isOpen = $scope.accordion.open;
						});
					};
					this.open = function() {
						var _self = this;
						$timeout(function() {
							$scope.accordion.open = true;
							_self.isOpen = true;
						});
					};
					this.close = function() {
						var _self = this;
						$timeout(function() {
							$scope.accordion.open = false;
							_self.isOpen = false;
						});
					};
				}
			};
		})
		.directive("accordionTrigger", function($timeout) {
			return {
				restrict: "A",
				require: "^accordion",
				link: function(scope, element, attrs, accordion) {
					element
						.append("<i class=\"fa fa-chevron-up\"></i><i class=\"fa fa-chevron-down\"></i>")
						.bind("click", function() {
							accordion.toggle();
						})
						.addClass("text-muted").addClass("pull-right");
				}
			}
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