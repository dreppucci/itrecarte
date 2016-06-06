define([
	'view',
    'jquery',
    'createjs',
    'underscore'

], function (View, $, createjs, _, HomeView, GameView, InfoView) {
	var StatsView = View.extend({

		deskBlack : new Image(),
		btnBackHome_context : new createjs.Container(),
		btnDeleteStats_context : new createjs.Container(),
		viewName : 'StatsView',

		events : {
			'btnBackHome_context mouseover': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mouseout': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mouseup': 'backHomeBtnTripleEventTypes',
			'btnBackHome_context mousedown': 'backHomeBtnDown',
			'btnDeleteStats_context mouseover': 'deleteStatsBtnTripleEventTypes',
			'btnDeleteStats_context mouseout': 'deleteStatsBtnTripleEventTypes',
			'btnDeleteStats_context mouseup': 'deleteStatsBtnTripleEventTypes',
			'btnDeleteStats_context mousedown': 'deleteStatsBtnDown'
		},

		initialize : function(attrs) {
			return this;
		},

		after : function(attrs) {
			this.parent = attrs.parent;
			console.log(this.parent.actualView.toUpperCase()+':AFTER');

			this.deskBlack_context = new createjs.Container();
			this.parent.stage.addChild(this.deskBlack_context);

			this.deskBlack.src = gameObjects[this.parent.findKey('name', 'deskBlack')]['source'];
			this.parent.attachImage(this.deskBlack_context, this.deskBlack, gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_x'], gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_y'], gameObjects[this.parent.findKey('name', 'deskBlack')]['scale_x'], gameObjects[this.parent.findKey('name', 'deskBlack')]['scale_y'] );

			this.txtStatsTitle = new createjs.Text( strings.stats, "normal 42px AGBookRoundedBold","#fff");
			this.txtStatsTitle.x = 34;
			this.txtStatsTitle.y = 65;

			// BTN BACKHOME
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

			// BTN DELETE STATS
			this.btnDeleteStatsShape = new createjs.Shape();
			this.btnDeleteStatsShapeGfx = this.btnDeleteStatsShape.graphics;
			this.parent.drawBtn( this.btnDeleteStatsShapeGfx, 'red', 'standard', 400, 70);

			this.triangleBtnDeleteStats = new createjs.Shape();
			this.triangleBtnDeleteStatsGfx = this.triangleBtnDeleteStats.graphics;
			this.triangleBtnDeleteStatsGfx.beginFill("#ac0000");
			this.triangleBtnDeleteStatsGfx.beginLinearGradientStroke(["#f33","#ae2c1a"], [0, 1], 0, 0, 0, 70);
			this.triangleBtnDeleteStatsGfx.drawPolyStar(370, 35, 17, 3, 0, -0);

			this.txtBtnDeleteStats = new createjs.Text( strings.lnk_emptystats , "normal 32px AGBookRoundedRegular","#fff");
			this.txtBtnDeleteStats.textAlign="center";
			this.txtBtnDeleteStats.x = 185;
			this.txtBtnDeleteStats.y = 20;

			this.btnDeleteStats_context.addChild(this.btnDeleteStatsShape);
			this.btnDeleteStats_context.addChild(this.triangleBtnDeleteStats);
			this.btnDeleteStats_context.addChild(this.txtBtnDeleteStats);
			this.btnDeleteStats_context.cursor = "pointer";
			this.btnDeleteStats_context.mouseEnabled = true;

			this.deskBlack_context.addChild(this.txtStatsTitle);
			this.deskBlack_context.addChild(this.btnBackHome_context);
			if( this.parent.gameStats().count() != 0 ) this.deskBlack_context.addChild(this.btnDeleteStats_context);

			this.btnBackHome_context.x = 50;
			this.btnBackHome_context.y = 530;
			this.btnDeleteStats_context.x = 490;
			this.btnDeleteStats_context.y = 530;

			this.deskBlack_context.rotation = gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation'];

			this.render();
		},

		printDB : function() {
			$('#stats-table table tbody').html('');
			$('#stats-table table thead tr th.gamewon').html(strings.game_won);
			$('#stats-table table thead tr th.date').html(strings.date);

			if( this.parent.gameStats().count() != 0 ) {
				var i = 1;
				this.parent.gameStats().limit(5).order('gamewon desc, date desc').each(function (r) {
					var tr = '<tr><td class="number">'+(i++)+'.</td><td class="gamewon">'+r.gamewon+'</td><td class="date">'+r.date+'</td><tr>';
			    	$('#stats-table table').append(tr);
				});
		    } else {
		    	$('#stats-table table').append('<tr><td colspan="3">'+strings.db_empty+'</td></tr>');
		    }
		},

		backHomeBtnTripleEventTypes : function(event) {
			this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 400, 70);
		},

		backHomeBtnDown : function(event) {
			this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 401, 70);
			this.parent.soundClick.play();
			this.unrender( _.bind( function() {
				this.parent.controller( 'HomeView' );
			}, this ) );
		},

		deleteStatsBtnTripleEventTypes : function(event) {
			this.parent.drawBtn( this.btnDeleteStatsShapeGfx, 'red', event.type, 400, 70);
		},

		deleteStatsBtnDown : function(event) {
			this.parent.drawBtn( this.btnDeleteStatsShapeGfx, 'red', event.type, 401, 70);
			this.parent.gameStats().remove();
			this.parent.soundClick.play();
			this.printDB();
			var btnDeleteStats_tween = createjs.Tween.get(this.btnDeleteStats_context, {loop:false}).to({ alpha: 0 }, 500, createjs.Ease.quintOut );
		},

		render : function() {
			this.printDB();
			var deskBlack_tween = createjs.Tween.get(this.deskBlack_context, {loop:false, override: true}).to({y: gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation_to']}, 1050, createjs.Ease.quintOut ).call( function() {
				$('#stats-table').stop(true, true).fadeIn(400);
			});
		},

		unrender : function(callback) {
			var gameclass = this;
			this.parent.animationStarted = true;

			if( this.parent.animationStarted ) {

				$('#stats-table').stop(true, true).fadeOut(400);
				var deskBlack_tween = createjs.Tween.get(this.deskBlack_context, {loop:false, override: true}).wait(300).to({y: gameObjects[this.parent.findKey('name', 'deskBlack')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'deskBlack')]['rotation']}, 1050, createjs.Ease.quintOut ).call( _.bind( function() {
					this.parent.stage.removeChild(this.deskBlack_context);
					this.parent.animationStarted = false;
					this.remove();
					if( callback !== undefined ) callback();
				}, this ) );
			}
		}
	});

	return StatsView;
});