define(["../Directive", "../processHtml"], function (Directive, processHtml) {
	return Directive.extend({
		compile: function (model, toIterate) {
			var promises = [];
			for (var i = 0; i < toIterate.length; i++) {
				promises.push(processHtml(this.contents, deferred(), ));
			}
			return stackedPromise(promises);
		}
	});
});