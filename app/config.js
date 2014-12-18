define(["genius/config"], function (config) {
	config.set({
		db: {
			adapter: "mongo",
			collections: ["posts"],
			url: "localhost/blog"
		}
	});
});