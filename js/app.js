define(['require','marionette', 'js/views/main_header_view', 'js/views/main_content_view', 'js/views/main_footer_view', 'js/views/footer_view'], function (require, Marionette) {

    var App = new Marionette.Application(),

    MainHeaderView = require('js/views/main_header_view'),
    MainContentView = require('js/views/main_content_view'),
    MainFooterView = require('js/views/main_footer_view'),
    FooterView = require('js/views/footer_view');

    App.addRegions({
        main_header: "#header",
        main_content: "#main",
        main_footer: "#footer",
        footer: "#info"
    });

    //Backbone.History.start();
    App.addInitializer(function (options) {
        App.main_header.show(new MainHeaderView());
        App.main_content.show(new MainContentView());
        App.main_footer.show(new MainFooterView());
        App.footer.show(new FooterView());
    });

    
    return App;
});