define(["genius/base/Class", "../Blog", "./Person", "genius/utils/deferred", "genius/utils/array", "genius/utils/string"], function (Class, Blog, PersonFactory, deferred, a, s) {
	return {
		all: function () {
			var output = deferred();
			var collection = Blog.$query({});
			collection.$promise
				.success(function () {
					a(collection).forEach(function (post) {
						var truncated = s(post.content.get()).truncate(500);
						post.content.set(truncated);
					});
					output.resolve(collection);
				})
				.fail(function () {
					output.reject.apply(output, arguments);
				});
			return output.promise();
		},
		byId: function (id) {
			var output = deferred();
			var post = Blog.$get(id);
			post.$promise
				.success(function () {
					output.resolve(post);
				})
				.fail(function () {
					output.reject.apply(output, arguments);
				});

			return output.promise();
		},
		create: function (params) {
			return new Blog(params);
		}
	};
});