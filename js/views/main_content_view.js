define(["marionette", "hbs!templates/main_content", "./todo_item_view","./../models/todo_item_collection","./../controller"], function (Marionette, contentTemplate, TodoItemView, TodoItemCollection, controller) {
    var ContentView = Marionette.CompositeView.extend({
        template: contentTemplate,
        itemViewContainer: "#todo-list",
        itemView: TodoItemView,

        collectionEvents: {
            "add": "collectionItemsChanged",
            "remove":"collectionItemsChanged"
        },

        ui: {
            "toggleAll":"#toggle-all"
        },

        initialize: function (options) {
            this.collection = new TodoItemCollection();
            controller.vent.on("todoTextReady", this.addTodo, this);
            controller.vent.on("todosUpdated", this.todosUpdated, this);
        },

        addTodo: function (todoText) {
            this.collection.push({ todoText: todoText });
        },

        collectionItemsChanged: function () {
            controller.vent.trigger("todosUpdated", this.collection);
        },

        todosUpdated: function () {

        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }



    });

    return ContentView;
});