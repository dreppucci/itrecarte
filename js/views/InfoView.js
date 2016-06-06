define([
	'view',
    'jquery',
    'createjs',
    'underscore'

], function (View, $, createjs, _) {
	var InfoView = View.extend({

		deskBlack : new Image(),
		btnBackHome_context : new createjs.Container(),
		viewName : 'InfoView',

		events : {
			'btnBackHome_context mouseover': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mouseout': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mouseup': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mousedown': 'backHomeBtnDown',
		},

		initialize : function() {
			return this;
		},

		after : function(attrs) {
			this.parent = attrs.parent;
			console.log(this.parent.actualView.toUpperCase()+':AFTER');

	    	this.deskBlack_context = null;
			this.deskBlack_context = new createjs.Container();
			this.parent.stage.addChild(this.deskBlack_context);

			this.deskBlack.src = gameObjects[this.parent.findKey('name', 'deskBlack')]['source'];
			this.parent.attachImage(this.deskBlack_context, this.deskBlack, gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_x'], gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_y'], gameObjects[this.parent.findKey('name', 'deskBlack')]['scale_x'], gameObjects[this.parent.findKey('name', 'deskBlack')]['scale_y'] );

			this.txtInfoTitle = new createjs.Text( strings.info, "normal 42px AGBookRoundedBold","#fff");
		    this.txtInfoTitle.x = 34;
		    this.txtInfoTitle.y = 65;

		    this.txtInfoHeadline = new createjs.Text( strings.how_it_works, "normal 32px AGBookRoundedMedium","#fff");
		    this.txtInfoHeadline.x = 34;
		    this.txtInfoHeadline.y = 200;
		    this.txtInfoHeadline.textBaseline = "alphabetic";
		    this.txtInfoHeadline.lineHeight = 36;

		    this.txtInfoBody = new createjs.Text( strings.how_it_works_desc, "normal 26px AGBookRoundedRegular","#fff");
		    this.txtInfoBody.x = 34;
		    this.txtInfoBody.y = 244;
		    this.txtInfoHeadline.textBaseline = "alphabetic";
		    this.txtInfoHeadline.lineHeight = 30;

		    this.btnBackHomeShape = new createjs.Shape();
			this.btnBackHomeShapeGfx = this.btnBackHomeShape.graphics;
			this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', 'standard', 400, 70);

			this.triangleBtnBackHome = new createjs.Shape();
			this.triangleBtnBackHomeGfx = this.triangleBtnBackHome.graphics;
			this.triangleBtnBackHomeGfx.beginFill("#d88a0f");
	        this.triangleBtnBackHomeGfx.beginLinearGradientStroke(["#d3a022","#FFC642"], [0, 1], 0, 0, 0, 70);
	        this.triangleBtnBackHomeGfx.drawPolyStar(30, 35, 17, 3, 0, -180);

	        this.txtBtnBackHome = new createjs.Text( strings.lnk_backhome, "normal 32px AGBookRoundedRegular","#333");
		    this.txtBtnBackHome.textAlign="center";
		    this.txtBtnBackHome.x = 205;
		    this.txtBtnBackHome.y = 20;

	        this.btnBackHome_context.addChild(this.btnBackHomeShape);
	        this.btnBackHome_context.addChild(this.triangleBtnBackHome);
	        this.btnBackHome_context.addChild(this.txtBtnBackHome);
	        this.btnBackHome_context.cursor = "pointer";
	        this.btnBackHome_context.mouseEnabled = true;

	        this.deskBlack_context.addChild(this.txtInfoTitle);
	        this.deskBlack_context.addChild(this.txtInfoHeadline);
	        this.deskBlack_context.addChild(this.txtInfoBody);
	        this.deskBlack_context.addChild(this.btnBackHome_context);

	        this.btnBackHome_context.x = 270;
	        this.btnBackHome_context.y = 530;

	        this.deskBlack_context.rotation = gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation'];

	        this.render();
	    },

	    render : function() {
			var deskBlack_tween = createjs.Tween.get(this.deskBlack_context, {loop:false, override: true}).to({y: gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation_to']}, 1050, createjs.Ease.quintOut );
		},

		unrender : function(callback) {
			this.parent.animationStarted = true;

			if( this.parent.animationStarted ) {
				var deskBlack_tween = createjs.Tween.get(this.deskBlack_context, {loop:false, override: true}).to({y: gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation']}, 1050, createjs.Ease.quintOut ).call( _.bind( function() {
					this.btnBackHome_context.removeAllEventListeners();
					if( callback !== undefined ) callback();
				}, this ) );
			}
		},

		backHomeBtnTripleEventTypes : function(event) {
			this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 400, 70);
		},

		backHomeBtnDown : function(event) {
			this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 400, 70);
			this.parent.soundClick.play();
			this.unrender( _.bind( function() {
				this.remove();
				this.parent.stage.removeChild(this.deskBlack_context);
				this.parent.controller( 'HomeView' );
			}, this ) );
		}
	});

	return InfoView;
});