define(["./Collection", "genius/utils/array"], function (Collection, a) {
	return function(T) {
		return Collection.extend({
			parse: function (aValue) {
				a(aValue).map(function (value) { return new T(value); });
			},
			addNew: function () {
				return this.push(new T().valueOf());
			},
			url: function () {
				return T.prototype.url();
			}
		});
	}
});