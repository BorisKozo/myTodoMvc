/*global define*/


define(['marionette', 'hbs!templates/main_content', './todo_item_view', './../models/todo_item_collection', './../controller'],
    function (Marionette, contentTemplate, TodoItemView, TodoItemCollection, controller) {
        'use strict';
        var ContentView = Marionette.CompositeView.extend({
            template: contentTemplate,
            itemViewContainer: '#todo-list',
            itemView: TodoItemView,

            collectionEvents: {
                'add': 'collectionItemsChanged',
                'remove': 'collectionItemsChanged',
                'reset': 'collectionItemsChanged',
                'finishChanged': 'collectionItemsChanged'
            },

            ui: {
                'toggleAll': '#toggle-all'
            },

            events: {
                'click #toggle-all': 'toggleAll'
            },

            initialize: function () {
                var _this = this;
                this.collection = new TodoItemCollection();
                this.collection.fetch({
                    success: function () {
                        _this.collectionItemsChanged();
                    }
                });
                controller.vent.on('todoTextReady', this.addTodo, this);
                controller.vent.on('clearCompleted', this.clearCompleted, this);
                controller.vent.on('todosUpdated', this.todosUpdated, this);
            },

            addTodo: function (todoText) {
                this.collection.push({ todoText: todoText });
            },

            collectionItemsChanged: function () {
                controller.vent.trigger('todosUpdated', this.collection);
            },

            clearCompleted: function () {
                var toRemove = this.collection.filter(function (item) {
                    return item.get('isFinished');
                });

                this.collection.remove(toRemove);
            },

            todosUpdated: function (collection) {
                var hasUnfinished = collection.some(function (item) {
                    return !item.get('isFinished');
                });

                this.ui.toggleAll.prop('checked', !hasUnfinished);

                collection.save();
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