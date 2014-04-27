define(["genius/base/Class", "../Blog", "./Person"], function (Class, Blog, PersonFactory) {
	var person = PersonFactory.dummy();

	var blog1 = new Blog();
	blog1.title = "Why jQuery Sucks";
	blog1.content = "<p>jQuery just sucks real bad. It's no good.</p><p>Don't use it.</p>";
	blog1.date = new Date(2014, 3, 1);
	blog1.author = person;

	var blog2 = new Blog();
	blog2.title = "Roll Your Own JavaScript Framework";
	blog2.content = "<p>If you want to stay nimble while following best practices:</p><p>Learn design patterns.</p>";
	blog2.date = new Date(2014, 3, 17);
	blog2.author = person;

	var all = [blog1, blog2];

	return {
		all: function () {
			return all;
		},
		byId: function (id) {
			return all[id - 1];
		}
	};
});