define(["backbone","./todo_item"], function (Backbone,TodoItem) {
    var TodoItem = Backbone.Collection.extend({
       // model:TodoItem
    });

    return TodoItem;
});