define(["marionette","hbs!templates/todo_item"], function (Marionette,todoItemTemplate) {
    var TodoItem = Marionette.ItemView.extend({
        template:todoItemTemplate
    });

    return TodoItem;
});