define([
	'view',
	'jquery',
	'underscore',
	'MainView',
	'GameObjectsModel',
	'LocaleModel'

], function(View, $, _, MainView) {

	var PreloadView = View.extend({

		preload : null,
		preloadTrackWidth : 296,
		manifestLength : null,
		manifest : new Array(),
		viewName : 'PreloadView',

		initialize : function() {
			return this;
		},

		after : function() {
			if (this.preload != null) this.preload.close();

			$(document).on('preloadCompleted', _.bind( this.go, this ) );

		    document.getElementById("progress-bar").style.width = 0;

		    for( i = 0; i < gameObjects.length; i++ ) {

		    	if( !gameObjects[i]['type'] ) this.manifest[i] = gameObjects[i]['source'];
		    }
		    this.manifestLength = this.manifest.length;
		    this.preload = new createjs.LoadQueue(true, "/");

		    this.preload.addEventListener("progress", _.bind( this.handleOverallProgress, this ) );
		    this.preload.addEventListener("error", _.bind( this.handleFileError, this ) );
		    this.preload.setMaxConnections(5);

		    this.preloadAllFiles();
		},

		preloadAllFiles : function() {
		    while (this.manifest.length > 0) {
		        this.preloadAnother();
		    }
		},

		preloadAnother : function() {
		    var item = this.manifest.shift();
		    this.preload.loadFile(item);
		},

		handleOverallProgress : function(event) {

			document.getElementById('progress-bar').style.width = this.preload.progress * this.preloadTrackWidth+'px';
			document.getElementById('progress-text').innerHTML = Math.floor(this.preload.progress*100)+'%';

			if( this.preload._numItemsLoaded == this.manifestLength ) this.closePreloader();
		},

		handleFileError : function(event) {
		    console.log('error loading '+ event.item.src );
		},

		closePreloader : function() {
			document.getElementById('loadingProgress').style.opacity = 0;
			var elem = document.getElementById('loadingProgress');
			elem.parentNode.removeChild(elem);

			$(document).trigger('preloadCompleted');
		},

		go : function() {
			this.mainView = new MainView();
			this.mainView.after();
		}
	});

    return PreloadView;
});