define(["genius/config"], function (config) {
	config.set({
		db: {
			adapter: "mongo",
			collections: ["blogs"],
			url: "localhost/cameronpedwards"
		}
	});
});