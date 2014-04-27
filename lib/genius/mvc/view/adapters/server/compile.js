define(["fs", "genius/utils/deferred"], function (fs, deferred) {
	function compile(filePath, node, model, body) {
		var def = deferred();
		fs.readFile(filePath, "utf8", function (err, html) {
			if (err)
				def.reject.apply(def, arguments);

			processHtml(html, def);
		});

		return def;
	}

	return compile;
});