define(["../Person"], function (Person) {
	return {
		dummy: function () {
			var person = new Person();
			person.firstName.set("Cameron");
			person.lastName.set("Edwards");
			return person;
		}
	};
});