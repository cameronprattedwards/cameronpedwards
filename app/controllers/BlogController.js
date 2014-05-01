define(["genius/mvc/controller/Controller", "domain/factories/Blog"], function (Controller, BlogFactory) {
	return Controller.extend("blog", {
		indexAction: function () {
			var model = BlogFactory.all();
			model.title = "Blog!";
			this.render("app/views/blog/index.html", null, model);
		},
		postAction: function (params) {
			var model = BlogFactory.byId(params.id);
			this.render("app/views/blog/post.html", null, model);
		}
	});
});