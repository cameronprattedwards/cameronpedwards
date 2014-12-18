var root = "genius/mvc/model/types/";
define([
	"genius/mvc/model/resource/Resource", 
	root + "String", 
	root + "Date", 
	root + "Custom",
	"./Person",
	root + "Number"
	], function (Resource, String, Date, Custom, Person, Number) {
	return Resource.extend({
		url: function () {
			return "posts";
		},
		uniqKey: "_id",
		_id: Number({ defaultTo: function () { return undefined; } }),
		title: String(),
		content: String(),
		date: Date()
	});
});