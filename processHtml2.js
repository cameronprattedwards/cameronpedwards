define(["genius/utils/deferred", "./compile", "./Directive", "genius/utils/stackedPromise"], function (deferred, compile, directive, stackedPromise) {
	var layoutRegex = /\{\{\#layout\s\"([^\"]+)\"\s\/\}\}/g,
		bodyRegex = /\{\{#doBody\s([^\/]*)\/\}\}/g,
		varRegex = /\{\{([^\}#]+)\}\}/g,
		dirRegex = /\{\{\#([^\s\/]+)\s([^\}\/]+)\}\}/g;

	return function (html, def, model, body) {
		var output = deferred(),
			promises = [],
			doBody,
			dirMatch,
			varMatch,
			layoutMatch,
			index = 0;

		if (doBody = bodyRegex.exec(html)) {
			html = html.replace(doBody[0], body);
		}

		while (dirMatch = dirRegex.exec(html.substring(index, html.length))) {
			(function () {
				var startIndex = html.search(dirMatch[0]) + dirMatch[0].length,
					closingTag = "{{/" + dirMatch[1] + "}}",
					closeIndex = html.search(closingTag),
					content = html.substring(startIndex, closeIndex),
					dir = new Directive(content),
					args = dirMatch[2].trim().split(/\s+/),
					innerMatch = dirMatch[0];

				index = closeIndex + closingTag.length;

				for (var i = 0; i < args.length; i++) {
					with (model) {
						dir.args.push(eval(args[i]));
					}
				}

				var promise = dir.compile(model);

				promise.success(function (content) {
					var start = html.search(innerMatch);
					var end = html.search(closingTag) + closingTag.length;

					html.splice(start, end - start, content);
				});

				promises.push(promise);
			}());
		}

		while (varMatch = varRegex.exec(html)) {
			var toInsert;

			with (model) {
				toInsert = eval(varMatch[1]);
			}

			html = html.replace(varMatch[0], toInsert);
		}

		var stacked = stackedPromise(promises);

		if (layoutMatch = layoutRegex.exec(html)) {
			var fileName = layoutMatch[1].trim().replace(/^('|")/, "").replace(/("|')$/, "");
			html = html.replace(layoutMatch[0], "");

			stacked.success(function () {
				var promise = compile(fileName, null, model, html);
				promise.bind.always(output);
			});
		} else {
			stacked.success(function () {
				output.resolve(html);
			});
		}

		stacked.bind.fail(output);

		return output;
	}
});