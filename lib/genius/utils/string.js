define([], function () {
	function StringWrapper(string) {
		this.string = string;
	};

	StringWrapper.prototype = {
		splice: function(index, length, replacement) { 
			return this.substring(0, index)
			+ replacement
			+ this.substring(index + length, this.length);
		}
	};

	return function (string) { return new StringWrapper(string); }
});