define(["backbone","marionette"], function (Backbone, Marionette) {

    var Controller = Marionette.Controller.extend({
        vent: _.extend({}, Backbone.Events),

        displayModes: {
            all: "All",
            active: "Active",
            completed: "Completed"
        },

        displayModeAll: function () {
            this.vent.trigger("displayModeChanged", this.displayModes.all);
        },

        displayModeActive: function () {
            this.vent.trigger("displayModeChanged", this.displayModes.active);
        },

        displayModeCompleted: function () {
            this.vent.trigger("displayModeChanged", this.displayModes.completed);
        }

    });

    return new Controller();
});