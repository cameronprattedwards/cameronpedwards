define(["genius/mvc/controller/Controller"], function (Controller) {
	return Controller.extend("index", {
		indexAction: function () {
			var model = {
				title: "Home Page"
			};

			return this.render("app/views/index/index.html", null, model);
		},
		aboutAction: function () {
			var model = {
				title: "About Me!"
			};

			return this.render("app/views/index/about.html", null, model);
		}
	});
});