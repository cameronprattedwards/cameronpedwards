define(["genius/mvc/controller/Controller", "domain/factories/Blog"], function (Controller, BlogFactory) {
	return Controller.extend("blog", {
		indexAction: function () {
			var _self = this;

			BlogFactory.all()
				.success(function (model) {
					model.title = "Blargh!";
					_self.render("app/views/blog/index.html", null, model);
				})
				.fail(function (error) {
					var model = {
						title: "Something went wrong",
						error: error
					};
					
					_self.render("app/views/error.html", null, model);
				});
		},
		postAction: function (params) {
			var _self = this;

			BlogFactory.byId(params.id).success(function (model) {
				_self.render("app/views/blog/post.html", null, model);
			});
		}
	});
});