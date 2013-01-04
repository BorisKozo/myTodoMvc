﻿define(["marionette", "hbs!templates/main_content", "./todo_item_view","./../models/todo_item_collection","./../controller"], function (Marionette, contentTemplate, TodoItemView, TodoItemCollection, controller) {
    var ContentView = Marionette.CompositeView.extend({
        template: contentTemplate,
        itemViewContainer: "#todo-list",
        itemView: TodoItemView,

        collectionEvents: {
            //"add":"render"
        },

        initialize: function (options) {
            this.collection = new TodoItemCollection();
            controller.vent.on("todoTextReady", this.addTodo, this);
        },

        addTodo: function (todoText) {
            this.collection.push({ todoText: todoText });
        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }



    });

    return ContentView;
});