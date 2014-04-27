define(["./compile", "genius/utils/string"], function (compile, s) {
	var layoutRegex = /\{\{\#layout\s\"([^\"]+)\"\s\/\}\}/g,
		bodyRegex = /\{\{#doBody\s([^\/]*)\/\}\}/g,
		varRegex = /\{\{([^\}#]+)\}\}/g,
		dirRegex = /\{\{\#([^\s\/]+)\s([^\}\/]+)\}\}/g;

	return function (html, def, model) {
		var doBody = bodyRegex.exec(html);

		if (doBody) {
			html = html.replace(doBody[0], body);
		}

		var layout = layoutRegex.exec(html);

		var match;

		while (match = dirRegex.exec(html)) {
			var startIndex = html.search(match[0]) + match[0].length;

			var closingTag = "{{/" + match[1] + "}}";
			var closeIndex = html.search(closingTag);

			var content = html.substring(startIndex, closeIndex);
			var dir = new Directive(content);
			var args = match[2].trim().split(/\s+/);

			for (var i = 0; i < args.length; i++) {
				with (model) {
					dir.args.push(eval(args[i]));
				}
			}

			var compilePromise = dir.compile.apply(dir, [model].concat(dir.args));

			var compiledContents = dir.compile.apply(dir, [model].concat(dir.args));

			html = s(html).splice(startIndex, closeIndex, compiledContents);

			html = html.replace(match[0], "");
			html = html.replace(closingTag, "");
		}

		while (match = varRegex.exec(html)) {
			var toInsert;
			with (model) {
				toInsert = eval(match[1]);
			}
			html = html.replace(match[0], toInsert);
		}


		if (layout) {
			var match = layout[1].trim().replace(/^('|")/, "").replace(/("|')$/);
			html = html.replace(layout[0], "");

			compile(match, null, model, html)
				.success(function () {
					def.resolve.apply(def, arguments);
				})
				.fail(function () {
					def.reject.apply(def, arguments);
				});
		} else {
			def.resolve(html);
		}
	}
});