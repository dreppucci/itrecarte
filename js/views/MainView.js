define([
    'view',
    'jquery',
    'createjs',
    'underscore',
    'taffy',
    'views/HomeView',
    'views/GameView',
    'views/StatsView',
    'views/InfoView'

], function (View, $, createjs, _, TAFFY, HomeView, GameView, StatsView, InfoView) {
    
    var MainView = View.extend({
        stage: null,
        gameStats : TAFFY(),
        btnColors : new Array(),
        bmpImage : new Array(),
        soundClick : null,
        soundCard : null,
        soundWin : null,
        soundLose : null,
        actualView : '',
        actualViewInitialized : {},
        animationStarted : false,

        initialize : function() {
            return this;
        },

        after : function() {
            this.initSounds();
            this.initDB();
            this.declareButtonsColorArrays();
            this.createStage();
            this.controller('HomeView');
        },

        declareButtonsColorArrays : function() {
            this.btnColors['yellow'] = new Array();
            this.btnColors['green'] = new Array();
            this.btnColors['red'] = new Array();
            this.btnColors['blue'] = new Array();
            this.btnColors['yellow']['standard'] = ['#FFC642','#ea9611'];
            this.btnColors['yellow']['mouseover'] = ['#ffb634','#faa525'];
            this.btnColors['yellow']['mouseout'] = ['#FFC642','#ea9611'];
            this.btnColors['yellow']['mouseup'] = ['#FFC642','#ea9611'];
            this.btnColors['yellow']['mousedown'] = ['#e29713','#da8601'];
            this.btnColors['green']['standard'] = ['#68ac00','#3f6900'];
            this.btnColors['green']['mouseover'] = ['#569300','#325d00'];
            this.btnColors['green']['mouseout'] = ['#68ac00','#3f6900'];
            this.btnColors['green']['mouseup'] = ['#68ac00','#3f6900'];
            this.btnColors['green']['mousedown'] = ['#477700','#2c4900'];
            this.btnColors['blue']['standard'] = ['#3e5c9c','#00246f'];
            this.btnColors['blue']['mouseover'] = ['#2b406d','#021c51'];
            this.btnColors['blue']['mouseout'] = ['#3e5c9c','#00246f'];
            this.btnColors['blue']['mouseup'] = ['#3e5c9c','#00246f'];
            this.btnColors['blue']['mousedown'] = ['#e29713','#da8601'];
            this.btnColors['red']['standard'] = ['#f33','#bc0000'];
            this.btnColors['red']['mouseover'] = ['#d80019','#9d0000'];
            this.btnColors['red']['mouseout'] = ['#f33','#bc0000'];
            this.btnColors['red']['mouseup'] = ['#f33','#bc0000'];
            this.btnColors['red']['mousedown'] = ['#a80000','#7d0000'];
        },

        initSounds : function() {
            this.soundClick = new buzz.sound( gameObjects[this.findKey('name', 'btnClick')]['source'], { formats: [ "ogg", "mp3", "aac", "wav" ], preload: false, autoplay: false, loop: false }),
            this.soundCard = new buzz.sound( gameObjects[this.findKey('name', 'soundCard')]['source'], { formats: [ "ogg", "mp3", "aac", "wav" ], preload: false, autoplay: false, loop: false }),
            this.soundWin = new buzz.sound( gameObjects[this.findKey('name', 'soundWin')]['source'], { formats: [ "ogg", "mp3", "aac", "wav" ], preload: false, autoplay: false, loop: false }),
            this.soundLose = new buzz.sound( gameObjects[this.findKey('name', 'soundLose')]['source'], { formats: [ "ogg", "mp3", "aac", "wav" ], preload: false, autoplay: false, loop: false });
        },

        initDB : function() {
            this.gameStats.store('gameDB');
        },

        createStage : function() {
            this.stage = new createjs.Stage('thegame');
            createjs.Ticker.setFPS(80);
            createjs.Ticker.useRAF = true;

            createjs.Touch.enable(this.stage);
            this.stage.enableMouseOver(10);

            this.stage.canvas.width = 960;
            this.stage.canvas.height = 640;
            this.stage.autoClear = true;
            this.stage.webkitImageSmoothingEnabled = true;
            this.stage.mozImageSmoothingEnabled = true;

            this.queue = new createjs.LoadQueue(false);

            createjs.Ticker.addEventListener('tick', this.stage);
        },

        findKey : function(property, value) {
            for(var key in gameObjects) {
                if(gameObjects[key][property]==value) return(key);
            }
        },

        attachImage : function(container, object, pos_x, pos_y, scale_x, scale_y) {
            this.bmpImage[object] = new createjs.Bitmap(object);
            container.addChild(this.bmpImage[object]);

            container.x = pos_x;
            container.y = pos_y;
            
            this.bmpImage[object].scaleX = scale_x;
            this.bmpImage[object].scaleY = scale_y;
        },

        drawBtn : function(object, color, state, width, height) {
            object.clear();
            object.beginLinearGradientFill([this.btnColors[color][state][0],this.btnColors[color][state][1]], [.5, .51], 0, 0, 0, 70);
            object.setStrokeStyle(2, 'round', 'round');
            object.beginStroke('#666');
            object.drawRoundRect(0,0,width,height,4);
        },

        controller : function(view) {
            switch (view) {
                case 'HomeView':
                    if( this.actualView !== 'HomeView' ) this.actualViewInitialized = new HomeView();
                    break;
                case 'InfoView':
                    if( this.actualView !== 'InfoView' ) this.actualViewInitialized = new InfoView();
                    break;
                case 'GameView':
                    if( this.actualView !== 'GameView' ) this.actualViewInitialized = new GameView();
                    break;
                case 'StatsView':
                    if( this.actualView !== 'StatsView' ) this.actualViewInitialized = new StatsView();
                    break;
                default:
                    if( this.actualView !== 'HomeView' ) this.actualViewInitialized = new HomeView();
                    break;
            }
            if( this.actualViewInitialized.viewName !== this.actualView ) {
                this.actualView = this.actualViewInitialized.viewName;
                console.log('%c VIEW:'+this.actualView.toUpperCase()+':INIT', 'color: #f33');
                this.actualViewInitialized.after({ parent: this });
            }
        }
    });

    return MainView;
});