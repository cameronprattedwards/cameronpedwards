requirejs.config({
	paths: {
		"genius": "lib/genius"
	},
	deps: [
		"genius/mvc/view/adapters/client/nodes/components/event",
		"genius/mvc/view/adapters/client/nodes/components/value",
		"genius/mvc/view/adapters/client/nodes/controlFlows/with"
	]
});

require(["genius/mvc/view/adapters/client/compile", "genius/config", "genius/model/observable/Observable"], function (compile, config, Observable) {
	config.set({
		baseNode: document.body
	});

	window.model = {
		mick: function () {
			model.jimberly.set(new Date());
		},
		jimberly: new Observable("Jimberly"),
		size: new Observable(200),
		crap: { some: "something", ergh: "something else" }
	};

	scope = {
		dom: [document.body],
		components: {},
		model: [model]
	};

	console.log(model);

	compile("tmp.html", model);
});