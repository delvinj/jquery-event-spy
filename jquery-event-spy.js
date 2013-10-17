// :noTabs=false:mode=javascript:tabSize=2:indentSize=2:folding=indent:

/**
 * Captures jQuery events in the console. Invoke once to start, again to stop.
 */
(function() {
	var triggerId = "~jQuery.event.trigger";
	
	if (window[triggerId] !== undefined) {
		/* uninstall */
		jQuery.event.trigger = window[triggerId];
		
		window[triggerId] = undefined;
	} else {
		/* install */
		var originalTrigger = jQuery.event.trigger;
		var count = 0;
		
		window[triggerId] = originalTrigger;
		
		jQuery.event.trigger = function() {
			++count;
			if (arguments[0] instanceof jQuery.Event) {
				var type = arguments[0].type || "jQuery.Event";
				var a = [].slice.call(arguments, 1);
			} else if (arguments[0] && arguments[0].constructor === String) {
				var type = arguments[0];
				var a = [].slice.call(arguments, 1);
			} else {
				var type = "Unknown";
				var a = [].slice.call(arguments);
			}
			(window.console && console.info && console.info(count, type, a));
			return originalTrigger.apply(arguments.callee.caller, arguments);
		};
	}
})();
