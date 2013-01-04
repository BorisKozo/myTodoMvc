define(["marionette","hbs!templates/todo_item", "./../controller"], function (Marionette,todoItemTemplate,controller) {
    var TodoItem = Marionette.ItemView.extend({
        template: todoItemTemplate,
        tagName: "li",

        events:{
            "change .toggle": "finishClicked",
            "click .destroy": "deleteClicked"
        },

        ui:{
            "finishedCheckbox":".toggle"
        },

        serializeData: function () {
            return {
                todoText: this.model.get("todoText"),
                isFinished: this.model.get("isFinished")
            }
        },
        finishClicked: function (e) {
            var finishState = e.target.checked;
            this.model.set("isFinished", finishState);
            if (finishState) {
                this.$el.addClass("completed").removeClass("active");
            } else {
                this.$el.addClass("active").removeClass("completed");
            }
        },
        deleteClicked: function () {
            this.model.collection.remove(this.model);
        }
    });

    return TodoItem;
});