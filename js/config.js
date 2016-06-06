require.config({
    baseUrl: 'js/',
    urlArgs : "v=" + (new Date()).getTime(),
    waitSeconds: 60,
    optimize: 'uglify2',
    preserveLicenseComments: false,
    paths: {
        'GameObjectsModel': 'models/GameObjects',
        'LocaleModel': 'models/Locale',
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'view': 'libs/view',
        'createjs': 'libs/createjs',
        'json2': 'libs/json2',
        'taffy': 'libs/taffy.min',
        'MainView': 'views/MainView',
        'PreloadView': 'views/PreloadView',
        'HomeView': 'views/HomeView',
        'GameView': 'views/GameView',
        'StatsView': 'views/StatsView',
        'InfoView': 'views/InfoView'
    },
    shim : {
        'underscore' : {
            exports : '_'
        },
        'createjs' : {
            exports : 'createjs'
        },
        'view' : {
            exports : 'View',
            deps : [
                'underscore'
            ]
        },
        'taffy' : {
            exports : 'TAFFY'
        },
        'jquery' : {
            deps : [
                'view'
            ]
        }
    }
});