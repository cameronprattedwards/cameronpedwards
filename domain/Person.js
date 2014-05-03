define(["genius/mvc/model/resource/Resource", "genius/mvc/model/types/String"], function (Resource, String) {
	return Resource.extend({
		firstName: String(),
		lastName: String()
	});
});