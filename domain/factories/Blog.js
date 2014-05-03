define(["genius/base/Class", "../Blog", "./Person", "genius/utils/deferred"], function (Class, Blog, PersonFactory, deferred) {
	Blog.prototype.myIndex = function () {
		return all.indexOf(this);
	}

	var person = PersonFactory.dummy();

	var blog1 = new Blog();
	blog1.title.set("Why jQuery Sucks");
	blog1.content.set("<p>jQuery just sucks real bad. It's no good.</p><p>Don't use it.</p>");
	blog1.date.set(new Date(2014, 3, 1));
	blog1.author.set(person);

	var blog2 = new Blog();
	blog2.title.set("Roll Your Own JavaScript Framework");
	blog2.content.set("<p>If you want to stay nimble while following best practices:</p><p>Learn design patterns.</p>");
	blog2.date.set(new Date(2014, 3, 17));
	blog2.author.set(person);

	var all = [blog1, blog2];

	return {
		all: function () {
			var output = deferred();
			var collection = Blog.$query({});
			collection.$promise
				.success(function () {
					output.resolve(collection);
				})
				.fail(function () {
					output.reject.apply(output, arguments);
				});
			return output.promise();
		},
		byId: function (id) {
			var output = deferred();
			var post = Blog.$get({ "_id": id });
			post.$promise
				.success(function () {
					output.resolve(post);
				})
				.fail(function () {
					output.reject.apply(output, arguments);
				});

			return output;
		}
	};
});