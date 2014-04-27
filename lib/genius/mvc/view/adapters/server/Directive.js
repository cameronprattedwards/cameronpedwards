define(["genius/base/Class", "genius/utils/deferred", "require", "./processHtml"], function (Class, deferred, require, processHtml) {
	return Class.extend({
		init: function (content) {
			this.content = content;
			this.args = [];
		},
		compile: function (model) {
			return require("./processHtml")(this.content, deferred(), model);
		}
	});
});