// :noTabs=true:mode=javascript:tabSize=2:indentSize=2:folding=indent:

/**
 * Captures jQuery events in the console. Invoke once to start, again to stop.
 */
(function() {
	var triggerId = "~jQuery.event.trigger";
	var counterId = triggerId + ".count";
	
	function loggingTrigger() {
		var originalTrigger = this[triggerId];
		var count = this[counterId];
		if (count === undefined) {
			count = 0;
		}
		/* Go fishing for some common event types/info. */
		var type, arr;
		if (arguments[0] instanceof this.jQuery.Event) {
			type = arguments[0].type || "jQuery.Event";
			arr = [].slice.call(arguments, 1);
		} else if (arguments[0] && arguments[0].constructor === String) {
			type = arguments[0];
			arr = [].slice.call(arguments, 1);
		} else {
			type = "Unknown";
			arr = [].slice.call(arguments);
		}
		(window.console && console.debug && console.debug(count, type, arr));
		this[counterId] = ++count;
		
		return originalTrigger.apply(arguments.callee.caller, arguments);
	}
	
	function installOrRemove(scope) {
		try {
			if (triggerId in scope) {
				scope.jQuery.event.trigger = scope[triggerId];
				delete scope[triggerId];
				delete scope[counterId];
			} else {
				var original = scope.jQuery.event.trigger;
				scope[triggerId] = original;
				scope.jQuery.event.trigger = loggingTrigger.bind(scope);
			}
		} catch (x) {
			(window.console && console.error && console.error(x));
		}
	}
	
	if (window.frames.length >= 1) {
		for (var j=0; j < window.frames.length; ++j) {
			installOrRemove(window.frames[j]);
		}
	} else {
		installOrRemove(window);
	}
	
})();
