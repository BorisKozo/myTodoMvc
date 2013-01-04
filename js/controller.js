define(["backbone","marionette"], function (Backbone, Marionette) {

    var Controller = Marionette.Controller.extend({
        vent:_.extend({},Backbone.Events)
    });

    return new Controller();
});