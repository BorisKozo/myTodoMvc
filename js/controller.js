/*global define*/

define(['backbone', 'marionette', 'underscore', './models/todo_item_collection'],
    function (Backbone, Marionette, _, TodoItemCollection) {
        'use strict';
        var Controller = Marionette.Controller.extend({
            vent: _.extend({}, Backbone.Events),

            displayModes: {
                all: 'All',
                active: 'Active',
                completed: 'Completed'
            },

            displayModeAll: function () {
                this.displayMode = this.displayModes.all;
                this.vent.trigger('displayModeChanged', this.displayMode);
            },

            displayModeActive: function () {
                this.displayMode = this.displayModes.active;
                this.vent.trigger('displayModeChanged', this.displayMode);
            },

            displayModeCompleted: function () {
                this.displayMode = this.displayModes.completed;
                this.vent.trigger('displayModeChanged', this.displayMode);
            },

            todosCollection: new TodoItemCollection(),

            start: function () {
                this.todosCollection.fetch();
            }

        });

        return new Controller();
    });