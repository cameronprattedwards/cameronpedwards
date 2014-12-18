define(["genius/mvc/controller/Controller", "domain/factories/Blog", "genius/utils/object", "genius/utils/deferred"], function (Controller, Blog, o, deferred) {
	return Controller.extend("admin", {
		deleteAction: function (params) {
			var _self = this;

			var promise = Blog.byId(params.id).success(function (post) {
				post.$del()
					.success(function () {
						var model = {
							title: "Post Deleted",
							content: "Post deleted: " + params.id
						};

						_self.render("app/views/admin/delete.html", null, model);
					});
			});

			return promise;
		},
		indexAction: function (params) {
			var _self = this;

			var promise = Blog.all().success(function (posts) {
				var model = {
					title: "Admin",
					posts: posts
				};

				_self.render("app/views/admin/index.html", null, model);
			});

			return promise;
		},
		editAction: function (params) {
			var _self = this;

			var promise = Blog.byId(params.id).success(function (post) {
				var model = {
					title: "Edit Post: " + post.title.get(),
					post: post
				};

				_self.render("app/views/admin/edit.html", null, model);
			});

			return promise;
		},
		submitEditAction: function (params) {
			var _self = this;

			var output = deferred();

			var promise = Blog.byId(params.id).success(function (post) {
				var fields = ["title", "content"];

				for (var i = 0; i < fields.length; i++) {
					var fieldName = fields[i];
					if (params[fieldName]) {
						post[fieldName].set(params[fieldName]);
					}
				}

				post.$save().success(function () {
					var model = {
						title: "Post Edited!",
						post: post
					};

					_self.render("app/views/admin/submitEdit.html", null, model);
				}).bind.fail(output);

			}).bind.fail(output);

			return output;
		},
		createAction: function (params) {
			var _self = this;

			var blog = Blog.create(o(params).pick("title", "content"));

			blog._id.set(blog.title.get().toLowerCase().replace(/\s+/g, "-"));

			var promise = blog.$save().success(function () {
				var model = {
					title: "You created the thing!",
					post: blog
				};

				_self.render("app/views/admin/create.html", null, model);
			});

			return promise;
		}
	});
});