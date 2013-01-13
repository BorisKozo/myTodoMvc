/*global define*/

define(['require', './app'],
    function (require, App) {
        'use strict';
        var loader = {
            start: function () {
                require(['./controller', './router'], function (controller) {

                    //Load and start *all* the controllers (if there are more controllers implemented you should
                    // start them all before starting the application.
                    controller.start();
                    App.start();
                });
            }
        };
        return loader;
    });