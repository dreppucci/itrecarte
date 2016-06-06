define([
    'view',
    'jquery',
    'createjs',
    'underscore'

], function (View, $, createjs, _) {
	var GameView = View.extend({

        indexDifficult : 0,
        cardAnimationDuration : 2000,
        cardAnimationThreshold : 2,
        standardGameWon : 0,
        standardGameLevel : 1,
        standardLifeLeft : 3,
        deskPlay : new Image(),
        cardWinner : new Image(),
        cardAce1 : new Image(),
        cardAce2 : new Image(),
        cardCoverWinner : new Image(),
        cardCoverAce1 : new Image(),
        cardCoverAce2 : new Image(),
        cardOrder : new Array(),
        oldCardOrder : new Array(),
        cardsPosition : new Array(),
        cardWinner_context : new createjs.Container(),
        cardAce1_context : new createjs.Container(),
        cardAce2_context : new createjs.Container(),
        btnBackHome_context : new createjs.Container(),
        btnContinue_context : new createjs.Container(),
        btnShareFB_context : new createjs.Container(),
        deskPlay_context : new createjs.Container(),
        cardWinnerImg_context : new createjs.Container(),
        cardAce1Img_context : new createjs.Container(),
        cardAce2Img_context : new createjs.Container(),
        cardCoverWinnerImg_context : new createjs.Container(),
        cardCoverAce1Img_context : new createjs.Container(),
        cardCoverAce2Img_context : new createjs.Container(),
        alertBox_context : new createjs.Container(),
        txtGameWon : new createjs.Text( strings.game_won+':', "normal 36px AGBookRoundedRegular","#fff"),
        txtGameWonValue : new createjs.Text( 0, "bold 36px AGBookRoundedMedium","#ffef01"),
        txtLifeLeft : new createjs.Text( strings.life_left+':', "normal 36px AGBookRoundedRegular","#fff"),
        txtLifeLeftValue : new createjs.Text( 3, "bold 36px AGBookRoundedMedium","#ffef01"),
        txtGameLevel : new createjs.Text( strings.game_level+':', "normal 36px AGBookRoundedRegular","#fff"),
        txtGameLevelValue : new createjs.Text( 1, "bold 36px AGBookRoundedMedium","#ffef01"),
        cardsShadow : new createjs.Shadow('#000', 0, 5, 30),
        alertBoxShape : new createjs.Shape(),
        btnBackHomeShape : new createjs.Shape(),
        triangleBtnBackHome : new createjs.Shape(),
        txtBtnBackHome : new createjs.Text( strings.lnk_backhome, "normal 32px AGBookRoundedRegular","#333"),
        btnContinueShape : new createjs.Shape(),
        triangleBtnContinue : new createjs.Shape(),
        btnShareFBShape : new createjs.Shape(),
        triangleBtnShareFB : new createjs.Shape(),
        txtBtnShareFB : new createjs.Text( strings.share_fb, "normal 32px AGBookRoundedRegular","#fff"),
        playing : false,
        viewName : 'GameView',

        events : {
            'cardWinner_context mousedown': 'cardWinnerDown',
            'cardAce1_context mousedown': 'cardAce1Down',
            'cardAce2_context mousedown': 'cardAce2DOwn',
            'btnBackHome_context mouseover': 'backHomeBtnTripleEventTypes',
            'btnBackHome_context mouseout': 'backHomeBtnTripleEventTypes',
            'btnBackHome_context mouseup': 'backHomeBtnTripleEventTypes',
            'btnBackHome_context mousedown': 'backHomeBtnDown',
            'btnContinue_context mouseover': 'continueGameBtnTripleEventTypes',
            'btnContinue_context mouseout': 'continueGameBtnTripleEventTypes',
            'btnContinue_context mouseup': 'continueGameBtnTripleEventTypes',
            'btnContinue_context mousedown': 'continueGameBtnDown',
            'btnShareFB_context mouseover': 'shareFBBtnTripleEventTypes',
            'btnShareFB_context mouseout': 'shareFBBtnTripleEventTypes',
            'btnShareFB_context mouseup': 'shareFBBtnTripleEventTypes',
            'btnShareFB_context mousedown': 'shareFBBtnDown'
        },

        initialize : function() {
            return this;
        },

		after : function(attrs) {
			this.parent = attrs.parent;
            console.log('%c '+this.parent.actualView.toUpperCase()+':AFTER', 'color: #333');

            this.declarecardsPositionArrays();

            this.parent.stage.addChild(this.deskPlay_context);

            this.deskPlay.src = gameObjects[this.parent.findKey('name', 'deskPlay')]['source'];
            this.parent.attachImage(this.deskPlay_context, this.deskPlay, gameObjects[this.parent.findKey('name', 'deskPlay')]['pos_x'], gameObjects[this.parent.findKey('name', 'deskPlay')]['pos_y'], gameObjects[this.parent.findKey('name', 'deskPlay')]['scale_x'], gameObjects[this.parent.findKey('name', 'deskPlay')]['scale_y'] );
            this.deskPlay_context.rotation = gameObjects[this.parent.findKey('name', 'deskPlay')]['rotation'];

            this.txtGameWon.x = 20;
            this.txtGameWon.y = 20;
            this.txtGameWon.alpha = 0;
            this.txtGameWonValue.x = 230;
            this.txtGameWonValue.y = 20;
            this.txtGameWonValue.alpha = 0;

            this.txtLifeLeft.x = 20;
            this.txtLifeLeft.y = 70;
            this.txtLifeLeft.alpha = 0;
            this.txtLifeLeftValue.x = 295;
            this.txtLifeLeftValue.y = 70;
            this.txtLifeLeftValue.alpha = 0;

            this.txtGameLevel.x = 760;
            this.txtGameLevel.y = 20;
            this.txtGameLevel.alpha = 0;
            this.txtGameLevelValue.x = 885;
            this.txtGameLevelValue.y = 20;
            this.txtGameLevelValue.alpha = 0;

            this.cardWinner.src = gameObjects[this.parent.findKey('name', 'cardWinner')]['source'];
            this.parent.attachImage(this.cardWinnerImg_context, this.cardWinner, 0, 0, 1, 1 );
            
            this.cardAce1.src = gameObjects[this.parent.findKey('name', 'cardAce1')]['source'];
            this.parent.attachImage(this.cardAce1Img_context, this.cardAce1, 0, 0, 1, 1 );
            
            this.cardAce2.src = gameObjects[this.parent.findKey('name', 'cardAce2')]['source'];
            this.parent.attachImage(this.cardAce2Img_context, this.cardAce2, 0, 0, 1, 1 );

            this.cardCoverWinner.src = gameObjects[this.parent.findKey('name', 'cardCover')]['source'];
            this.parent.attachImage(this.cardCoverWinnerImg_context, this.cardCoverWinner, 0, 0, 1, 1 );

            this.cardCoverAce1.src = gameObjects[this.parent.findKey('name', 'cardCover')]['source'];
            this.parent.attachImage(this.cardCoverAce1Img_context, this.cardCoverAce1, 0, 0, 1, 1 );

            this.cardCoverAce2.src = gameObjects[this.parent.findKey('name', 'cardCover')]['source'];
            this.parent.attachImage(this.cardCoverAce2Img_context, this.cardCoverAce2, 0, 0, 1, 1 );
            
            this.cardWinner_context.addChild(this.cardCoverWinnerImg_context);
            this.cardWinner_context.addChild(this.cardWinnerImg_context);
            this.cardWinnerImg_context.scaleX = 1;
            this.cardWinnerImg_context.scaleY = 1;
            this.cardWinner_context.x = 240;
            this.cardWinner_context.y = 960;
            this.cardWinner_context.shadow = this.cardsShadow;
            this.cardCoverWinnerImg_context.scaleX = 0;
            this.cardCoverWinnerImg_context.x = this.cardWinner.width/2;
            this.cardWinner_context.scaleX = 1.5;
            this.cardWinner_context.scaleY = 1.5;

            this.cardAce1_context.addChild(this.cardCoverAce1Img_context);
            this.cardAce1_context.addChild(this.cardAce1Img_context);
            this.cardAce1Img_context.scaleX = 1;
            this.cardAce1Img_context.scaleY = 1;
            this.cardAce1_context.x = 0;
            this.cardAce1_context.y = 960;
            this.cardAce1_context.shadow = this.cardsShadow;
            this.cardCoverAce1Img_context.scaleX = 0;
            this.cardCoverAce1Img_context.x = this.cardAce1.width/2;
            this.cardAce1_context.scaleX = 1.5;
            this.cardAce1_context.scaleY = 1.5;

            this.cardAce2_context.addChild(this.cardCoverAce2Img_context);
            this.cardAce2_context.addChild(this.cardAce2Img_context);
            this.cardAce2Img_context.scaleX = 1;
            this.cardAce2Img_context.scaleY = 1;
            this.cardAce2_context.x = 480;
            this.cardAce2_context.y = 960;
            this.cardAce2_context.shadow = this.cardsShadow;
            this.cardCoverAce2Img_context.scaleX = 0;
            this.cardCoverAce2Img_context.x = this.cardAce2.width/2;
            this.cardAce2_context.scaleX = 2;
            this.cardAce2_context.scaleY = 2;

            this.deskPlay_context.addChild(this.txtGameWon);
            this.deskPlay_context.addChild(this.txtGameWonValue);
            this.deskPlay_context.addChild(this.txtGameLevel);
            this.deskPlay_context.addChild(this.txtGameLevelValue);
            this.deskPlay_context.addChild(this.txtLifeLeft);
            this.deskPlay_context.addChild(this.txtLifeLeftValue);
            this.deskPlay_context.addChild(this.cardAce1_context);
            this.deskPlay_context.addChild(this.cardAce2_context);
            this.deskPlay_context.addChild(this.cardWinner_context);

            this.cardOrder[0] = this.cardAce1_context;
            this.cardOrder[1] = this.cardWinner_context;
            this.cardOrder[2] = this.cardAce2_context;

            this.render();
        },

        declarecardsPositionArrays : function() {
            this.cardsPosition['yCoords'] = new Array(),
            this.cardsPosition['xCoords'] = new Array(),
            this.cardsPosition['zIndex'] = new Array();

            console.log('%c '+this.parent.actualView.toUpperCase()+':DECLARE:CARDS:POS:ARRAYS', 'color: #999');

            this.defineCardsPosition();
        },

        defineCardsPosition : function() {
            this.cardsPosition['yCoords'][0] = [214, 220];
            this.cardsPosition['xCoords'][0] = [120, 130];
            this.cardsPosition['xCoords'][1] = [360, 370];
            this.cardsPosition['xCoords'][2] = [600, 610];
            this.cardsPosition['zIndex'][0] = [1, 5];

            console.log('%c '+this.parent.actualView.toUpperCase()+':DEFINE:CARDS:POS', 'color: #999');
        },

        showWinnerCard : function() {
            console.log(this.parent.actualView.toUpperCase()+':SHOW:WINNER:CARD');
            var cardAce1_tween = cardWinner_tween = cardAce2_tween = cardsShadow_tween = null;

            var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).to({ x: this.cardWinner_context.x+110, rotation: 0 }, 300, createjs.Ease.quintOut);
            var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).to({ x: this.cardAce2_context.x-110, rotation: 0 }, 300, createjs.Ease.quintOut);

            var flipTwoCards = setTimeout( _.bind( function() {
                var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).to({ x: this.cardWinner_context.x+20, rotation: Number(this.randomRange(-2, 2, 0)) }, 300, createjs.Ease.quintOut);
                var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).to({ x: this.cardAce2_context.x-20, rotation: Number(this.randomRange(-2, 2, 0)) }, 300, createjs.Ease.quintOut);
                this.flipCards('cover', this.cardWinnerImg_context, this.cardCoverWinnerImg_context);
                this.flipCards('cover', this.cardAce1Img_context, this.cardCoverAce1Img_context);
                this.flipCards('cover', this.cardAce2Img_context, this.cardCoverAce2Img_context);

                var shuffleCards = setTimeout( _.bind( function() {
                    this.shuffleCards();
                }, this ), 200 );
            }, this ), 400 );
        },

        showCards : function() {
            console.log(this.parent.actualView.toUpperCase()+':SHOW:CARDS');

            var cardAce1_tween = cardWinner_tween = cardAce2_tween = cardsShadow_tween = null;

            var cardAce1_tween = createjs.Tween.get(this.cardAce1_context, {loop:false}).wait(1100).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][0][0], this.cardsPosition['xCoords'][0][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, 300, createjs.Ease.quintOut);
            var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).wait(1200).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][1][0], this.cardsPosition['xCoords'][1][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, 300, createjs.Ease.quintOut);
            var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).wait(1400).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][2][0], this.cardsPosition['xCoords'][2][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, 300, createjs.Ease.quintOut);
            var cardsShadow_tween = createjs.Tween.get(this.cardsShadow, {loop:false}).wait(1100).to({ offsetY: 0, blur: 7 }, 300, createjs.Ease.quintOut);

            var showWinnerCard = setTimeout( _.bind( function() {
                this.showWinnerCard();
            }, this ), 1800);

        },

        hideCards : function(continuegame) {
            var cardAce1_tween = cardWinner_tween = cardAce2_tween = cardsShadow_tween = null;

            var cardAce1_tween = createjs.Tween.get(this.cardAce1_context, {loop:false}).to({ scaleX: 1.2, scaleY: 1.2, y: 960 }, 300, createjs.Ease.quintOut);
            var cardWinner_tween = createjs.Tween.get(this.cardWinner_context, {loop:false}).wait(100).to({ scaleX: 1.2, scaleY: 1.2, y: 960 }, 300, createjs.Ease.quintOut);
            var cardAce2_tween = createjs.Tween.get(this.cardAce2_context, {loop:false}).wait(200).to({ scaleX: 1.2, scaleY: 1.2, y: 960 }, 300, createjs.Ease.quintOut);
            var cardsShadow_tween = createjs.Tween.get(this.cardsShadow, {loop:false}).wait(100).to({ offsetY: 0, blur: 30 }, 300, createjs.Ease.quintOut);

            if( continuegame == 'yes' ) {
                if( restartTimer != null ) clearTimeout(restartTimer);
                var restartTimer = setTimeout( _.bind( function() {
                    this.flipCards('card', this.cardWinnerImg_context, this.cardCoverWinnerImg_context);
                    this.flipCards('card', this.cardAce1Img_context, this.cardCoverAce1Img_context);
                    this.flipCards('card', this.cardAce2Img_context, this.cardCoverAce2Img_context);
                    this.showCards();
                }, this ), 800);
            }
        },

        flipCards : function(what, number, cover) {
            var cardNumber_tween = what == 'cover' ? createjs.Tween.get(number, {loop:false, override:true}).to({ scaleX: 0, x: 105 }, 100, createjs.Ease.linear) : createjs.Tween.get(number, {loop:false}).to({ scaleX: 1, x: 0 }, 100, createjs.Ease.linear);
            var cardCover_tween = what == 'cover' ? createjs.Tween.get(cover, {loop:false, override:true}).to({ scaleX: 1, x: 0 }, 100, createjs.Ease.linear) : createjs.Tween.get(cover, {loop:false}).to({ scaleX: 0, x: 105 }, 100, createjs.Ease.linear).call( _.bind( function() {
                this.parent.animationStarted = false;
            }, this ) );
            this.parent.soundCard.play();
        },

        shuffleCards : function() {
            console.log(this.parent.actualView.toUpperCase()+':SHUFFLE:CARDS');
            for(i = 0; i < this.cardOrder.length; i++) { this.oldCardOrder[i] = this.cardOrder[i]; }
            this.shuffle(this.cardOrder);
            this.compareArrays(this.oldCardOrder, this.cardOrder);
        },
        
        repositionCards : function() {
            console.log(this.parent.actualView.toUpperCase()+':REPOSITION:CARD:ANIM');
            var cardRandom1_tween = cardRandom2_tween = cardRandom3_tween = null;

            cardRandom1_tween = createjs.Tween.get(this.cardOrder[0], {loop:false, override:true}).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][0][0], this.cardsPosition['xCoords'][0][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, this.cardAnimationDuration, createjs.Ease.quintOut);
            cardRandom2_tween = createjs.Tween.get(this.cardOrder[1], {loop:false, override:true}).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][1][0], this.cardsPosition['xCoords'][1][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, this.cardAnimationDuration, createjs.Ease.quintOut);
            cardRandom3_tween = createjs.Tween.get(this.cardOrder[2], {loop:false, override:true}).to({ scaleX: 1, scaleY: 1, y: Number(this.randomRange(this.cardsPosition['yCoords'][0][0], this.cardsPosition['yCoords'][0][1], 0)), x: Number(this.randomRange(this.cardsPosition['xCoords'][2][0], this.cardsPosition['xCoords'][2][1], 0)), rotation: Number(this.randomRange(-2, 2, 0)) }, this.cardAnimationDuration, createjs.Ease.quintOut).call( _.bind( function() { this.repositionCardsAnimationComplete(this); }, this ) );

        },

        repositionCardsAnimationComplete : function() {
            this.indexDifficult++;

            var levelDifficult = this.txtGameLevelValue.text;

            if( this.indexDifficult == levelDifficult ) { this.playing = true; }
            else this.shuffleCards();
        },

        createAlertBox : function( state ) {
            this.alertBoxShapeGfx = this.alertBoxShape.graphics;
            this.alertBoxShapeGfx.beginFill("#333333");
            this.alertBoxShapeGfx.setStrokeStyle(4, 'round', 'round');
            this.alertBoxShapeGfx.beginStroke('#646464');
            this.alertBoxShapeGfx.drawRoundRect(0,0,860,250,4);
            this.alertBoxShape.scaleX = 0;
            this.alertBoxShape.scaleY = 0;
            this.txtAlertBoxFeedback = new createjs.Text( this.alertBoxFeedback(state), "normal 30px AGBookRoundedRegular","#fff");
            this.txtAlertBoxFeedback.textAlign="center";
            this.txtAlertBoxFeedback.x = 430;
            this.txtAlertBoxFeedback.y = 16;
            this.txtAlertBoxFeedback.alpha = 0;

            // BTN BACKHOME
            this.btnBackHomeShapeGfx = this.btnBackHomeShape.graphics;
            this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', 'standard', 300, 70);

            this.triangleBtnBackHomeGfx = this.triangleBtnBackHome.graphics;
            this.triangleBtnBackHomeGfx.beginFill("#d88a0f");
            this.triangleBtnBackHomeGfx.beginLinearGradientStroke(["#d3a022","#FFC642"], [0, 1], 0, 0, 0, 70);
            this.triangleBtnBackHomeGfx.drawPolyStar(30, 35, 17, 3, 0, -180);

            this.txtBtnBackHome.textAlign="center";
            this.txtBtnBackHome.x = 160;
            this.txtBtnBackHome.y = 20;

            this.btnBackHome_context.addChild(this.btnBackHomeShape);
            this.btnBackHome_context.addChild(this.triangleBtnBackHome);
            this.btnBackHome_context.addChild(this.txtBtnBackHome);
            this.btnBackHome_context.cursor = "pointer";
            this.btnBackHome_context.mouseEnabled = true;

            // BTN CONTINUE
            this.btnContinueShapeGfx = this.btnContinueShape.graphics;
            this.parent.drawBtn( this.btnContinueShapeGfx, 'green', 'standard', 250, 70);

            this.triangleBtnContinueGfx = this.triangleBtnContinue.graphics;
            this.triangleBtnContinueGfx.beginFill("#68ac00");
            this.triangleBtnContinueGfx.beginLinearGradientStroke(["#3f6900","#68ac00"], [0, 1], 0, 0, 0, 70);
            this.triangleBtnContinueGfx.drawPolyStar(220, 35, 17, 3, 0, -0);
            var lifeLeft = this.txtLifeLeftValue.text;
            this.txtBtnContinue = new createjs.Text( lifeLeft !== 0 ? strings.game_continue : strings.game_restart , "normal 32px AGBookRoundedRegular","#fff"),
            this.txtBtnContinue.textAlign="center";
            this.txtBtnContinue.x = 125;
            this.txtBtnContinue.y = 20;

            this.btnContinue_context.addChild(this.btnContinueShape);
            this.btnContinue_context.addChild(this.triangleBtnContinue);
            this.btnContinue_context.addChild(this.txtBtnContinue);
            this.btnContinue_context.cursor = "pointer";
            this.btnContinue_context.mouseEnabled = true;

            // BTN SHARE FB
            this.btnShareFBShapeGfx = this.btnShareFBShape.graphics;
            this.parent.drawBtn( this.btnShareFBShapeGfx, 'blue', 'standard', 250, 70);

            this.triangleBtnShareFBGfx = this.triangleBtnShareFB.graphics;
            this.triangleBtnShareFBGfx.beginFill("#68ac00");
            this.triangleBtnShareFBGfx.beginLinearGradientStroke(["#3f6900","#68ac00"], [0, 1], 0, 0, 0, 70);
            this.triangleBtnShareFBGfx.drawPolyStar(220, 35, 17, 3, 0, -0);

            this.txtBtnShareFB.textAlign="center";
            this.txtBtnShareFB.x = 125;
            this.txtBtnShareFB.y = 20;

            this.btnShareFB_context.addChild(this.btnShareFBShape);
            this.btnShareFB_context.addChild(this.triangleBtnShareFB);
            this.btnShareFB_context.addChild(this.txtBtnShareFB);
            this.btnShareFB_context.cursor = "pointer";
            this.btnShareFB_context.mouseEnabled = true;

            this.alertBox_context.x = 480;
            this.alertBox_context.y = 320;

            this.btnContinue_context.y = 150;
            this.btnBackHome_context.y = 150;
            this.btnShareFB_context.y = 150;
            this.btnContinue_context.x = 500;
            this.btnBackHome_context.x = 100;
            this.btnShareFB_context.x = 800;
            this.btnContinue_context.alpha = 0;
            this.btnBackHome_context.alpha = 0;
            this.btnShareFB_context.alpha = 0;

            this.alertBox_context.addChild(this.alertBoxShape);
            this.alertBox_context.addChild(this.txtAlertBoxFeedback);
            this.alertBox_context.addChild(this.btnContinue_context);
            this.alertBox_context.addChild(this.btnBackHome_context);

            this.parent.stage.addChild(this.alertBox_context);

            var showAlertBoxShape_tween = createjs.Tween.get(this.alertBoxShape, {loop:false, override:true}).to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.elasticInOut);
            var showAlertBox_tween = createjs.Tween.get(this.alertBox_context, {loop:false, override:true}).to({ x: 50, y: 195, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.elasticInOut);
            var showAlertBoxText_tween = createjs.Tween.get(this.txtAlertBoxFeedback, {loop:false, override:true}).wait(500).to({ alpha: 1 }, 500, createjs.Ease.quintOut);
            var showAlertBoxBtnBackHome_tween = createjs.Tween.get(this.btnBackHome_context, {loop:false, override:true}).wait(500).to({ alpha: 1 }, 500, createjs.Ease.quintOut);
            var showAlertBoxContinue_tween = createjs.Tween.get(this.btnContinue_context, {loop:false, override:true}).wait(500).to({ alpha: 1 }, 500, createjs.Ease.quintOut);
        },

        showAlert : function(choice) {
            this.playing = false;
            console.log(this.parent.actualView.toUpperCase()+':CARD:CLICKED');
            if( choice == 'wrong' ) {
                console.log(this.parent.actualView.toUpperCase()+':SHOW:ALERTBOX:WRONG');
                var lifeLeft = this.txtLifeLeftValue.text-1;
                this.txtLifeLeftValue.text = lifeLeft;
                this.indexDifficult = 0;

                if( lifeLeft == 0 ) {
                    this.createAlertBox('gameover');
                    this.saveStats();
                }
                else this.createAlertBox('wrong');

                this.parent.soundLose.play();
            }
            else if( choice == 'right' ) {
                console.log(this.parent.actualView.toUpperCase()+':SHOW:ALERTBOX:RIGHT');
                this.createAlertBox('right');

                var gameWon = this.txtGameWonValue.text + 1,
                    gameLevel = this.txtGameLevelValue.text +1;

                this.txtGameWonValue.text = gameWon;
                this.txtGameLevelValue.text = gameLevel;

                this.indexDifficult = 0;
                this.cardAnimationDuration = (1000*this.cardAnimationThreshold)/gameLevel;

                this.parent.soundWin.play();
                this.btnContinue_context.dispatchEvent('mousedown');
            }
        },

        hideAlertBox : function( state ) {
            console.log(this.parent.actualView.toUpperCase()+':HIDE:ALERTBOX');
            var hideAlertBoxShape_tween = createjs.Tween.get(this.alertBoxShape, {loop:false, override:true}).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.elasticInOut).call( _.bind(function() {
                console.log(this.parent.actualView.toUpperCase()+':HIDE:ALERTBOX:COMPLETED');
                this.alertBox_context.removeChild(this.alertBoxShape);
                this.alertBox_context.removeChild(this.txtAlertBoxFeedback);
                this.alertBox_context.removeChild(this.btnContinue_context);
                this.alertBox_context.removeChild(this.btnBackHome_context);
                this.parent.stage.removeChild(this.alertBox_context);
            }, this) );
            var hideAlertBox_tween = createjs.Tween.get(this.alertBox_context, {loop:false, override:true}).to({ x: 480, y: 320, scaleX: 0, scaleY: 0 }, 500, createjs.Ease.elasticInOut);
            var hideAlertBoxText_tween = createjs.Tween.get(this.txtAlertBoxFeedback, {loop:false, override:true}).to({ alpha: 0 }, 500, createjs.Ease.quintOut);
            var hideAlertBoxBtnBackHome_tween = createjs.Tween.get(this.btnBackHome_context, {loop:false, override:true}).to({ alpha: 0 }, 500, createjs.Ease.quintOut);
            var hideAlertBoxContinue_tween = createjs.Tween.get(this.btnContinue_context, {loop:false, override:true}).to({ alpha: 0 }, 500, createjs.Ease.quintOut);
        },

        alertBoxFeedback : function( state ) {
            if( state == 'gameover' ) return strings.card_gameover;
            if( state == 'wrong' ) return strings.card_error;
            if( state == 'right' ) return strings.card_right;
        },

        cardWinnerDown : function(event) {
            if( this.playing ) {
                if( !this.parent.animationStarted ) {
                    this.flipCards('card', this.cardWinnerImg_context, this.cardCoverWinnerImg_context);
                    this.showAlert('right');
                }
            }
        },

        cardAce1Down : function(event) {
            if( this.playing ) {
                if( !this.parent.animationStarted ) {
                    this.flipCards('card', this.cardAce1Img_context, this.cardCoverAce1Img_context);
                    this.showAlert('wrong');
                }
            }
        },

        cardAce2DOwn : function(event) {
            if( this.playing ) {
                if( !this.parent.animationStarted ) {
                    this.flipCards('card', this.cardAce2Img_context, this.cardCoverAce2Img_context);
                    this.showAlert('wrong');
                }
            }
        },

        backHomeBtnTripleEventTypes : function(event) {
            this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 300, 70);
        },

        backHomeBtnDown : function(event) {
            if( !this.parent.animationStarted ) {
                this.parent.animationStarted = true;
                this.parent.drawBtn( this.btnBackHomeShapeGfx, 'yellow', event.type, 300, 70);
                this.hideAlertBox();
                this.resetGameVars();
                this.parent.soundClick.play();
                this.unrender( _.bind( function() {
                    this.parent.controller('HomeView');
                }, this ) );
            }
        },

        continueGameBtnTripleEventTypes : function(event) {
            this.parent.drawBtn( this.btnContinueShapeGfx, 'green', event.type, 250, 70);
        },

        continueGameBtnDown : function(event) {
            if( !this.parent.animationStarted ) {
                this.parent.animationStarted = true;
                this.parent.drawBtn( this.btnContinueShapeGfx, 'green', event.type, 250, 70);
                this.hideAlertBox();
                this.parent.soundClick.play();

                var lifeLeft = this.txtLifeLeftValue.text;
                if( lifeLeft == 0 ) {
                    this.hideCards();
                    this.resetGameVars();
                    this.flipCards('card', this.cardWinnerImg_context, this.cardCoverWinnerImg_context);
                    this.flipCards('card', this.cardAce1Img_context, this.cardCoverAce1Img_context);
                    this.flipCards('card', this.cardAce2Img_context, this.cardCoverAce2Img_context);
                    var showCards_tween = setTimeout( _.bind( function() { this.parent.animationStarted = false; this.showCards(); }, this ), 800);
                } else {
                    this.hideCards('yes');
                }
            }
        },

        shareFBBtnTripleEventTypes : function(event) {
            this.parent.drawBtn( this.btnShareFBShapeGfx, 'blue', event.type, 250, 70);
        },

        shareFBBtnDown : function(event) {
            this.parent.drawBtn( this.btnShareFBShapeGfx, 'blue', event.type, 250, 70);
            this.parent.soundClick.play();
        },

        resetGameVars : function() {
            this.indexDifficult = 0;
            this.cardAnimationDuration = 2000;
            this.txtGameWonValue.text = this.standardGameWon;
            this.txtLifeLeftValue.text = this.standardLifeLeft;
            this.txtGameLevelValue.text = this.standardGameLevel;
        },

        randomRange : function(minVal,maxVal,floatVal) {
            var randVal = minVal+(Math.random()*(maxVal-minVal));
            return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
        },

        shuffle : function(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        },

        compareArrays : function(a, b) {
            if( a.length == b.length ) {
                z = 0;
                // increase same array indexes
                for( key in a ) { if( a[key] == b[key] ) { z++; } }
                // if same array indexes == array.length then remake shuffle
                if ( z == a.length ) { this.shuffle(b); this.compareArrays(a, b); }
                // if same array indexes != array.length then reposition cards on the desk
                else {
                    if( reposCards !== undefined ) clearTimeout(reposCards);
                    var reposCards = setTimeout( _.bind( function() {
                        console.log(this.parent.actualView.toUpperCase()+':REPOSITION:CARDS');
                        this.repositionCards();
                    }, this ), 200);
                }
            }
        },

        saveStats : function() {
            timestamp = Math.round(new Date().getTime() / 1000);
            dateTime = this.getDayDate()+' '+this.formatTime(timestamp, 'hourly');

            this.parent.gameStats.insert({gamewon: this.gameWon, date: dateTime });
        },

        formatTime : function( timestamp, type ) {
            var date = new Date(timestamp*1000);
            
            switch(type) {
                case 'hourly':
                    var hours = date.getHours();
                    if( hours < 10 ) { hours = '0'+hours; }
                    var minutes = date.getMinutes();
                    if( minutes < 10 ) { minutes = '0'+minutes; }
                    return formattedTime = hours + ':' + minutes;
                    break;
                case 'minutely':
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    if( minutes < 10 ) { minutes = '0'+minutes; }
                    return formattedTime = minutes;
                    break;
                default:
                    var hours = date.getHours();
                    if( hours < 10 ) { hours = '0'+hours; }
                    var minutes = date.getMinutes();
                    if( minutes < 10 ) { minutes = '0'+minutes; }
                    return formattedTime = hours + ':' + minutes;
                    break;
            }
        },

        getDayDate : function() {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            dateDay = (day + "/" + month + "/" + year);
            return dateDay;
        },

        render : function() {
            console.log(this.parent.actualView.toUpperCase()+':ENTER:ANIMATION');
            var deskPlay_tween = createjs.Tween.get(this.deskPlay_context, {loop:false}).to({y: gameObjects[this.parent.findKey('name', 'deskPlay')]['pos_to_y'], rotation: gameObjects[this.parent.findKey('name', 'deskPlay')]['rotation_to']}, 1050, createjs.Ease.quintOut );
            var txtGameWon_tween = createjs.Tween.get(this.txtGameWon, {loop:false}).wait(900).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            var txtGameWonValue_tween = createjs.Tween.get(this.txtGameWonValue, {loop:false}).wait(900).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            var txtGameLevel_tween = createjs.Tween.get(this.txtGameLevel, {loop:false}).wait(900).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            var txtGameLevelValue_tween = createjs.Tween.get(this.txtGameLevelValue, {loop:false}).wait(900).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            var txtLifeLeft_tween = createjs.Tween.get(this.txtLifeLeft, {loop:false}).wait(1200).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            var txtLifeLeftValue_tween = createjs.Tween.get(this.txtLifeLeftValue, {loop:false}).wait(1200).to({ alpha: 1 }, 500, createjs.Ease.quintOut );
            this.showCards();
        },

        unrender : function(callback) {
            this.parent.animationStarted = true;
            console.log(this.parent.actualView.toUpperCase()+':EXIT:ANIMATION');

            if( this.parent.animationStarted ) {
                var deskPlay_Awaytween = createjs.Tween.get(this.deskPlay_context, {loop:false}).to({y: gameObjects[this.parent.findKey('name', 'deskPlay')]['pos_y'], rotation: gameObjects[this.parent.findKey('name', 'deskPlay')]['rotation']}, 1050, createjs.Ease.quintOut ).call( _.bind( function() {
                    this.deskPlay_context.removeChild(this.cardAce1_context);
                    this.deskPlay_context.removeChild(this.cardAce2_context);
                    this.deskPlay_context.removeChild(this.cardWinner_context);
                    this.alertBox_context.removeChild(this.alertBoxShape);
                    this.alertBox_context.removeChild(this.txtAlertBoxFeedback);
                    this.alertBox_context.removeChild(this.btnContinue_context);
                    this.alertBox_context.removeChild(this.btnBackHome_context);
                    this.parent.stage.removeChild(this.alertBox_context);
                    this.parent.stage.removeChild(this.deskPlay_context);
                    this.parent.animationStarted = false;
                    this.remove();

                    if( callback !== undefined ) callback();
                }, this ) );
            }
        }

    });

    return GameView;
});