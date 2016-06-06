define([
	'view',
    'jquery',
    'createjs',
    'underscore'

], function (View, $, createjs, _) {
	var HomeView = View.extend({

		deskWelcome : new Image(),
		lgoDesk : new Image(),
		cardWinner : new Image(),
		cardAce1 : new Image(),
		cardAce2 : new Image(),
		cardCoverWinner : new Image(),
		cardCoverAce1 : new Image(),
		cardCoverAce2 : new Image(),
		startGame_context : new createjs.Container(),
		stats_context : new createjs.Container(),
		viewName : 'HomeView',

		events : {
			'startGame_context mouseover': 'startGameBtnTripleEventTypes',
			'startGame_context mouseout': 'startGameBtnTripleEventTypes',
			'startGame_context mouseup': 'startGameBtnTripleEventTypes',
			'startGame_context mousedown': 'startGameBtnDown',
			'stats_context mouseover': 'statsBtnTripleEventTypes',
			'stats_context mouseout': 'statsBtnTripleEventTypes',
			'stats_context mouseup': 'statsBtnTripleEventTypes',
			'stats_context mousedown': 'statsBtnDown'
		},

		initialize : function() {
			return this;
		},

		after : function(attrs) {
			this.parent = attrs.parent;
			console.log(this.parent.actualView.toUpperCase()+':AFTER');

			this.deskWelcome_context = new createjs.Container();
			this.lgoDesk_context = new createjs.Container();
			this.bend_context = new createjs.Container();
			this.bendShape = new createjs.Shape();
			this.cardWinner_context = this.cardAce1_context = this.cardAce2_context = null;
			this.cardWinnerImg_context = this.cardAce1Img_context = this.cardAce2Img_context = null;
			this.cardWinner_context = new createjs.Container();
			this.cardAce1_context = new createjs.Container();
			this.cardAce2_context = new createjs.Container();
			this.cardWinnerImg_context = new createjs.Container();
			this.cardAce1Img_context = new createjs.Container();
			this.cardAce2Img_context = new createjs.Container();

			this.parent.stage.addChild(this.deskWelcome_context);

			this.deskWelcome.src = gameObjects[this.parent.findKey('name', 'deskWelcome')]['source'];
			this.parent.attachImage(this.deskWelcome_context, this.deskWelcome, gameObjects[this.parent.findKey('name', 'deskWelcome')]['pos_x'], gameObjects[this.parent.findKey('name', 'deskWelcome')]['pos_y'], gameObjects[this.parent.findKey('name', 'deskWelcome')]['scale_x'], gameObjects[this.parent.findKey('name', 'deskWelcome')]['scale_y'] );

			this.shape = this.bendShape.graphics;
			this.shape.setStrokeStyle(1, 'round', 'round');
			this.shape.beginStroke('#d7880d');
			this.shape.beginLinearGradientFill(["#fdc23e","#ec9b16"], [0, .7], 0, 0, 0, 70);
			this.shape.moveTo(0, 15);
			this.shape.arcTo(0, 10, 10, 5, 10);
			this.shape.quadraticCurveTo(173, -15, 346, 5);
			this.shape.arcTo(356, 10, 356, 15, 10);
			this.shape.lineTo(356, 58);
			this.shape.arcTo(356, 55, 350, 55, 10);
			this.shape.quadraticCurveTo(172, 20, 6, 55);
			this.shape.arcTo(0, 55, 0, 58, 10);
			this.shape.lineTo(0, 15);
			
			this.shape.setStrokeStyle(2, 'round', 'round');
			this.shape.beginStroke('#bf790c');
			this.shape.endFill();
			this.shape.moveTo(0, 25);
			this.shape.arcTo(0, 15, 10, 10, 10);
			this.shape.quadraticCurveTo(173, -10, 346, 10);
			this.shape.arcTo(356, 15, 356, 25, 10);
			
			this.shape.beginStroke('#bf790c');
			this.shape.endFill();
			this.shape.moveTo(0, 60);
			this.shape.arcTo(0, 55, 10, 50, 15);
			this.shape.quadraticCurveTo(173, 15, 346, 50);
			this.shape.arcTo(356, 55, 356, 60, 10);
			
			this.bend_context.addChild(this.bendShape);
			this.bend_context.x = gameObjects[this.parent.findKey('name', 'bend')]['pos_x'];
			this.bend_context.y = gameObjects[this.parent.findKey('name', 'bend')]['pos_y'];
			this.bend_context.scaleX = gameObjects[this.parent.findKey('name', 'bend')]['scale_x'];
			this.bend_context.scaleY = gameObjects[this.parent.findKey('name', 'bend')]['scale_y'];
			
			this.lgoDesk.src = gameObjects[this.parent.findKey('name', 'lgoDesk')]['source'];
			this.parent.attachImage(this.lgoDesk_context, this.lgoDesk, gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_x'], gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_y'], gameObjects[this.parent.findKey('name', 'lgoDesk')]['scale_x'], gameObjects[this.parent.findKey('name', 'lgoDesk')]['scale_y'] );
			
			this.cardWinner.src = gameObjects[this.parent.findKey('name', 'cardWinner')]['source'];
			this.parent.attachImage(this.cardWinnerImg_context, this.cardWinner, 0, 0, 1, 1 );
			
			this.cardAce1.src = gameObjects[this.parent.findKey('name', 'cardAce1')]['source'];
			this.parent.attachImage(this.cardAce1_context, this.cardAce1, 0, 0, 1, 1 );
			
			this.cardAce2.src = gameObjects[this.parent.findKey('name', 'cardAce2')]['source'];
			this.parent.attachImage(this.cardAce2_context, this.cardAce2, 0, 0, 1, 1 );
			
			this.cardWinner_context.addChild(this.cardWinnerImg_context);
			this.cardWinner_context.x = gameObjects[this.parent.findKey('name', 'cardWinner')]['pos_x'];
			this.cardWinner_context.y = gameObjects[this.parent.findKey('name', 'cardWinner')]['pos_y'];
			this.cardWinner_context.scaleX = gameObjects[this.parent.findKey('name', 'cardWinner')]['scale_x'];
			this.cardWinner_context.scaleY = gameObjects[this.parent.findKey('name', 'cardWinner')]['scale_y'];

			this.cardAce1_context.addChild(this.cardAce1Img_context);
			this.cardAce1_context.x = gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_x'];
			this.cardAce1_context.y = gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_y'];
			this.cardAce1_context.scaleX = gameObjects[this.parent.findKey('name', 'cardAce1')]['scale_x'];
			this.cardAce1_context.scaleY = gameObjects[this.parent.findKey('name', 'cardAce1')]['scale_y'];

			this.cardAce2_context.addChild(this.cardAce2Img_context);
			this.cardAce2_context.x = gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_x'];
			this.cardAce2_context.y = gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_y'];
			this.cardAce2_context.scaleX = gameObjects[this.parent.findKey('name', 'cardAce2')]['scale_x'];
			this.cardAce2_context.scaleY = gameObjects[this.parent.findKey('name', 'cardAce2')]['scale_y'];

			this.btnStartShape = new createjs.Shape();
			this.btnStartShapeGfx = this.btnStartShape.graphics;
			this.parent.drawBtn( this.btnStartShapeGfx, 'yellow', 'standard', 401, 70);

			this.triangleStart = new createjs.Shape();
			this.triangleStartGfx = this.triangleStart.graphics;
	        this.triangleStartGfx.beginFill("#d88a0f");
	        this.triangleStartGfx.beginLinearGradientStroke(["#d3a022","#FFC642"], [0, 1], 0, 0, 0, 70);
	        this.triangleStartGfx.drawPolyStar(370, 35, 17, 3, 0, -0);

	        this.txtStart = new createjs.Text( strings.lnk_start_game, "normal 32px AGBookRoundedRegular","#333");
		    this.txtStart.textAlign="center";
		    this.txtStart.x = 200;
		    this.txtStart.y = 20;

		    this.btnStatsShape = new createjs.Shape();
			this.btnStatsShapeGfx = this.btnStatsShape.graphics;
			this.parent.drawBtn( this.btnStatsShapeGfx, 'yellow', 'standard', 401, 70);

			this.triangleStats = new createjs.Shape();
			this.triangleStatsGfx = this.triangleStats.graphics;
	        this.triangleStatsGfx.beginFill("#d88a0f");
	        this.triangleStatsGfx.beginLinearGradientStroke(["#d3a022","#FFC642"], [0, 1], 0, 0, 0, 70);
	        this.triangleStatsGfx.drawPolyStar(370, 35, 17, 3, 0, -0);

	        this.txtStats = new createjs.Text( strings.lnk_stats, "normal 32px AGBookRoundedRegular","#333");
		    this.txtStats.textAlign="center";
		    this.txtStats.x = 200;
		    this.txtStats.y = 20;
	        this.startGame_context.addChild(this.btnStartShape);
	        this.startGame_context.addChild(this.triangleStart);
	        this.startGame_context.addChild(this.txtStart);
	        this.startGame_context.cursor = "pointer";
	        this.startGame_context.mouseEnabled = true;

	        this.stats_context.addChild(this.btnStatsShape);
	        this.stats_context.addChild(this.triangleStats);
	        this.stats_context.addChild(this.txtStats);
	        this.stats_context.cursor = "pointer";
	        this.stats_context.mouseEnabled = true;

	        this.deskWelcome_context.rotation = gameObjects[this.parent.findKey('name', 'deskWelcome')]['rotation'];
			this.deskWelcome_context.addChild(this.cardAce1_context);
			this.deskWelcome_context.addChild(this.cardAce2_context);
			this.deskWelcome_context.addChild(this.cardWinner_context);

			this.deskWelcome_context.addChild(this.bend_context);
			this.deskWelcome_context.addChild(this.lgoDesk_context);
			this.deskWelcome_context.addChild(this.startGame_context);
			this.deskWelcome_context.addChild(this.stats_context);
			
			this.lgoDesk_context.scaleX = 0;
			this.lgoDesk_context.scaleY = 0;
			
			this.cardWinner_context.scaleX = 0;
			this.cardWinner_context.scaleY = 0;
			this.cardWinner_context.rotation = gameObjects[this.parent.findKey('name', 'cardWinner')]['rotation'];
			
			this.cardAce1_context.scaleX = 0;
			this.cardAce1_context.scaleY = 0;
			this.cardAce1_context.rotation = gameObjects[this.parent.findKey('name', 'cardAce1')]['rotation'];
			
			this.cardAce2_context.x = gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_x'];
			this.cardAce2_context.scaleX = 0;
			this.cardAce2_context.scaleY = 0;
			this.cardAce2_context.rotation = gameObjects[this.parent.findKey('name', 'cardAce2')]['rotation'];

			this.startGame_context.alpha = 0;
			this.startGame_context.x = 148;
			this.startGame_context.y = 175;

			this.stats_context.alpha = 0;
			this.stats_context.x = 148;
			this.stats_context.y = 270;

			this.attachDOMEvents();

			this.render();
		},

		startGameBtnTripleEventTypes : function(event) {
			this.parent.drawBtn( this.btnStartShapeGfx, 'yellow', event.type, 401, 70);
		},

		startGameBtnDown : function(event) {
			this.parent.drawBtn( this.btnStartShapeGfx, 'yellow', event.type, 401, 70);
			this.parent.soundClick.play();
			console.log(this.parent.actualView.toUpperCase()+':HANDLED:GAMEVIEW:INIT');
			this.unrender( _.bind( function() {
				this.parent.controller( 'GameView' );
			}, this ) );
		},

		statsBtnTripleEventTypes : function(event) {
			this.parent.drawBtn( this.btnStatsShapeGfx, 'yellow', event.type, 401, 70);
		},

		statsBtnDown : function(event) {
			this.parent.drawBtn( this.btnStatsShapeGfx, 'yellow', event.type, 401, 70);
			this.parent.soundClick.play();
			console.log(this.parent.actualView.toUpperCase()+':HANDLED:STATSVIEW:INIT');
			this.unrender( _.bind( function() {
				this.parent.controller( 'StatsView' );
			}, this ) );
		},

		infoBtnDown : function(event) {
			console.log(this.parent.actualView.toUpperCase()+':HANDLED:INFOVIEW:INIT');
			this.unrender( _.bind( function() {
				this.parent.stage.removeChild(this.deskWelcome_context);
				this.parent.controller( 'InfoView' );
			}, this ) );
		},

		attachDOMEvents : function() {
			$('#lnk-info-a').on('click', _.bind( this.infoBtnDown, this ) );
		},

		render : function() {
			this.bend_context.scaleX = gameObjects[this.parent.findKey('name', 'bend')]['scale_x'];
			var deskWelcome_tween = createjs.Tween.get(this.deskWelcome_context, {loop:false}).to({y: gameObjects[this.parent.findKey('name', 'deskWelcome')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'deskWelcome')]['rotation_to']}, 1050, createjs.Ease.quintOut );
			var bend_tween = createjs.Tween.get(this.bend_context, {loop:false}).wait(400).to({ scaleX: gameObjects[this.parent.findKey('name', 'bend')]['scale_to_x'] }, 450, createjs.Ease.quintOut );
			var lgoDesk_tween = createjs.Tween.get(this.lgoDesk_context, {loop:false}).wait(800).to({ x: gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_to_x'], y: gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_to_y'], scaleX: gameObjects[this.parent.findKey('name', 'lgoDesk')]['scale_to_x'], scaleY: gameObjects[this.parent.findKey('name', 'lgoDesk')]['scale_to_y'] }, 500, createjs.Ease.elasticInOut );
			var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).wait(1400).to({ y: gameObjects[this.parent.findKey('name', 'cardWinner')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'cardWinner')]['rotation_to'], scaleX: gameObjects[this.parent.findKey('name', 'cardWinner')]['scale_to_x'], scaleY: gameObjects[this.parent.findKey('name', 'cardWinner')]['scale_to_y']}, 500, createjs.Ease.quintOut );
			var cardAce1_tween = createjs.Tween.get(this.cardAce1_context, {loop:false}).wait(1600).to({ x: gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_to_x'], y: gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'cardAce1')]['rotation_to'], scaleX: gameObjects[this.parent.findKey('name', 'cardAce1')]['scale_to_x'], scaleY: gameObjects[this.parent.findKey('name', 'cardAce1')]['scale_to_y']}, 500, createjs.Ease.quintOut );
			var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).wait(1800).to({ x: gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_to_x'], y: gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'cardAce2')]['rotation_to'], scaleX: gameObjects[this.parent.findKey('name', 'cardAce2')]['scale_to_x'], scaleY: gameObjects[this.parent.findKey('name', 'cardAce2')]['scale_to_y']}, 500, createjs.Ease.quintOut );
			var btnStartGame_tween = createjs.Tween.get(this.startGame_context, {loop:false}).wait(2000).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
			var btnStats_tween = createjs.Tween.get(this.stats_context, {loop:false}).wait(2100).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
			var info_tween = setTimeout( function() { $('#lnk-info').fadeIn(400); }, 2300);
		},

		unrender : function(callback) {
			this.parent.animationStarted = true;
			if( this.parent.animationStarted ) {
				$('#lnk-info-a').off('click', _.bind( this.infoBtnDown, this ) );
				$('#lnk-info').stop().fadeOut(400).dequeue();
				
				var btnStartGame_tween = createjs.Tween.get(this.startGame_context, {loop:false}).to({ alpha: 0 }, 500, createjs.Ease.quintOut );
				var btnStats_tween = createjs.Tween.get(this.stats_context, {loop:false}).wait(100).to({ alpha: 0 }, 500, createjs.Ease.quintOut );
				var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).wait(500).to({ x: gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_x'], y: gameObjects[this.parent.findKey('name', 'cardAce2')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'cardAce2')]['rotation'], scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quintOut );
				var cardAce1_tween = createjs.Tween.get(this.cardAce1_context, {loop:false}).wait(700).to({ x: gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_x'], y: gameObjects[this.parent.findKey('name', 'cardAce1')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'cardAce1')]['rotation'], scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quintOut );
				var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).wait(900).to({ y: gameObjects[this.parent.findKey('name', 'cardWinner')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'cardWinner')]['rotation'], scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quintOut );
				var lgoDesk_tween = createjs.Tween.get(this.lgoDesk_context, {loop:false}).wait(1300).to({ x: gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_x'], y: gameObjects[this.parent.findKey('name', 'lgoDesk')]['pos_y'], scaleX: 0, scaleY: 0 }, 500, createjs.Ease.elasticInOut );
				var deskWelcome_tween = createjs.Tween.get(this.deskWelcome_context, {loop:false}).wait(1800).to({y: gameObjects[this.parent.findKey('name', 'deskWelcome')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'deskWelcome')]['rotation']}, 1050, createjs.Ease.quintOut ).call( _.bind( function() {
					this.startGame_context.removeAllEventListeners();
					this.stats_context.removeAllEventListeners();
					$('#lnk-info-a').off('click');
					this.remove();
					if( callback !== undefined ) callback();
					this.parent.animationStarted = false;
				}, this ) );
			}
		}
	});

	return HomeView;
});