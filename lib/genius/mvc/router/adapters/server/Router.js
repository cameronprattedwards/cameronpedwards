define([
	"express", 
	"genius/base/Class", 
	"module", 
	"genius/mvc/controller/registry",
	"genius/utils/object"
	], function (express, Class, module, registry, o) {
	
	var router = express.Router();
	var app = express();
	
	app.use("/", router);

	router.param("controller", function (req, resp, next, controller) {
		if (registry[controller])
			req.controller = registry[controller];
		next();
	});

	function getController(defaults, req, resp) {
		var match;

		if (req.controller)
			return new req.controller(req, resp);
		if (match = registry[req.controller])
			return new match(req, resp);
		if (match = registry[defaults.controller])
			return new match(req, resp);
	}

	return {
		registerRoute: function (route, defaults) {
			router.get(route, function (req, resp, next) {
				var controller = getController(defaults, req, resp, next);

				if (!controller) {
					return next();
				}

				var params = o({}).extend(defaults, req.params);

				if (!params.action)
					return next();

				var action = params.action + "Action";

				if (controller[action])
					return controller[action](req.params);
				else
					return next();
			});
		},
		start: function () {
			router.use(express.static(process.cwd() + "/app/www"));
			app.listen(8080);
		}
	};
});