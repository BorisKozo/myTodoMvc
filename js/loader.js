/*global define*/

define(['require', './app'],
    function (require, App) {
        'use strict';
        var loader = {
            start: function () {
                require(['./controller', './router'], function (controller) {
                    //Here you should load and start *all* the controllers. Obviously in this simple application
                    //there is only one
                    controller.start();
                    App.start();
                });
            }
        };
        return loader;
    });