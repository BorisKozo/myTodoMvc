/*global define*/

define(['backbone', 'marionette', 'underscore', './app', './models/todo_item_collection'],
    function (Backbone, Marionette, _, App, TodoItemCollection) {
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



            start: function () {
                var _this = this,
                    todosCollection = new TodoItemCollection(),
                    todoPromise = todosCollection.fetch();

                require(['js/views/main_layout_view', 'js/views/footer_view'], function (MainLayoutView, FooterView) {
                    App.section.show(new MainLayoutView({ todosCollection: todosCollection }));
                    App.footer.show(new FooterView());
                    todoPromise.done(function () {
                        _this.vent.trigger("todosUpdated", { collection: todosCollection });
                    });
                });
            }

        });

        return new Controller();
    });