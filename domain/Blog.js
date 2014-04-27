define(["genius/base/Class"], function (Class) {
	return Class.extend({
		init: function () {
			this.title = "";
			this.content = "";
			this.date = null;
			this.author = null;
		}
	});
});