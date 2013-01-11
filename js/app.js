/*global define*/

define(['backbone', 'marionette'],
    function (Backbone, Marionette) {
        'use strict';
        var App = new Marionette.Application();

        App.addRegions({
            section: '#todoapp',
            footer: '#info'
        });

        //Backbone.History.start();
        App.addInitializer(function () {
            Backbone.history.start();
        });


        return App;
    });