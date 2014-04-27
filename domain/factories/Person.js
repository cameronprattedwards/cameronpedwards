define(["../Person"], function (Person) {
	return {
		dummy: function () {
			var person = new Person();
			person.firstName = "Cameron";
			person.lastName = "Edwards";
			return person;
		}
	};
});