/*global define*/

define(['backbone', 'marionette', './router', './controller', 'js/views/main_layout_view', 'js/views/footer_view'],
    function (Backbone, Marionette, router, controller, MainLayoutView, FooterView) {
        'use strict';
        var App = new Marionette.Application();

        App.addRegions({
            section: '#todoapp',
            footer: '#info'
        });

        //Backbone.History.start();
        App.addInitializer(function () {
            App.section.show(new MainLayoutView());
            App.footer.show(new FooterView());
            controller.start();
            Backbone.history.start();
        });


        return App;
    });