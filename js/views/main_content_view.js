/*global define*/


define(['backbone', 'marionette', 'underscore', 'hbs!templates/main_content', './todo_item_view', './../models/todo_item_collection', './../controller'],
    function (Backbone, Marionette, _, contentTemplate, TodoItemView, TodoItemCollection, controller) {
        'use strict';
        var ContentView = Marionette.CompositeView.extend({
            template: contentTemplate,
            itemViewContainer: '#todo-list',
            itemView: TodoItemView,

            collectionEvents: {
                'add': 'todoAdded',
                'remove': 'todoRemoved',
                'reset': 'collectionLoaded',
                'finishChanged': 'collectionUpdated'
            },

            ui: {
                'toggleAll': '#toggle-all'
            },

            events: {
                'click #toggle-all': 'toggleAll'
            },

            initialize: function () {
                controller.vent.on('todoTextReady', this.addTodo, this);
                controller.vent.on('clearCompleted', this.clearCompleted, this);
                controller.vent.on('todosUpdated', this.todosUpdated, this);
            },

            addTodo: function (todoText) {
                this.collection.push({ todoText: todoText }).save();
            },

            todoAdded: function (model, collection) {
                controller.vent.trigger('todosUpdated', { added: [model], collection: collection });
            },

            todoRemoved: function (model, collection) {
                controller.vent.trigger('todosUpdated', { removed: [model], collection: collection });
                model.destroy();
            },

            collectionLoaded: function (collection) {
                controller.vent.trigger('todosUpdated', { collection: collection });
            },

            collectionUpdated: function (models, collection) {
                controller.vent.trigger('todosUpdated', { updated: models, collection: collection });
                _.each(models, function (model) {
                    model.save();
                });
            },

            clearCompleted: function () {
                var toRemove = this.collection.filter(function (item) {
                    return item.get('isFinished');
                });

                this.collection.remove(toRemove);
            },

            todosUpdated: function (data) {
                var hasUnfinished = data.collection.some(function (item) {
                    return !item.get('isFinished');
                });

                this.ui.toggleAll.prop('checked', !hasUnfinished);
            },

            toggleAll: function () {
                this.collection.setFinished(this.ui.toggleAll.is(':checked'));
            },

            onClose: function () {
                controller.vent.off(null, null, this);
            }



        });

        return ContentView;
    });