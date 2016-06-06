/********************************************/
/*	app.js
/*******************************************/

requireWithRetry(
	'config',
	function () {
		require(['PreloadView'],
		function (PreloadView) {
			var preloadView = new PreloadView();
			preloadView.after();
		});
	});