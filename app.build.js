
({
    baseUrl: "./",


    hbs: {
        templateExtension: 'hbs',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n: true
    },

    pragmasOnSave: {
        //removes Handlebars.Parser code (used to compile template strings) set
        //it to `false` if you need to parse template strings even after build
        excludeHbsParser : true,
        // kills the entire plugin set once it's built.
        excludeHbs: true,
        // removes i18n precompiler, handlebars and json2
        excludeAfterBuild: true
    },

    locale: "en_ca",

    out: "main-built.js",
    mainConfigFile:"js/main.js",

    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'localstorage': 'lib/backbone.localstorage',
        'marionette': 'lib/backbone.marionette',
        'handlebars': 'lib/handlebars',
        'i18nprecompile': 'lib/i18nprecompile',
        'json2': 'lib/json2',
        'hbs': 'lib/hbs'
    },

    name:"js/main.js",

    fileExclusionRegExp: "node_modules",

    inlineText: true,

    findNestedDependencies: true,

    optimize:"none"

})
