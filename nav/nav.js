define(function() {
	"use strict";

	var items = {
		about: {
			display: "About",
			href: "about",
			active: false
		},
		resume: {
			display: "Résumé",
			href: "resume",
			active: false
		}
	},
	activeItem;

	return {
		items: [items.about, items.resume],
		activate: function(name) {
			if (activeItem)
				activeItem.active = false;

			activeItem = items[name];
			activeItem.active = true;
		}
	};
});
