define(["marionette","hbs!templates/todo_item"], function (Marionette,todoItemTemplate) {
    var TodoItem = Marionette.ItemView.extend({
        template: todoItemTemplate,
        tagName: "li",

        serializeData: function () {
            return {
                todoText: this.model.get("todoText"),
                isFinished: this.model.get("isFinished")
            }
        }
    });

    return TodoItem;
});