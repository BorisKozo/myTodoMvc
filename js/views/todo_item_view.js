define(["marionette", "hbs!templates/todo_item", "./../controller"], function (Marionette, todoItemTemplate, controller) {
    var TodoItem = Marionette.ItemView.extend({
        template: todoItemTemplate,
        tagName: "li",

        events: {
            "change .toggle": "finishClicked",
            "click .destroy": "deleteClicked",
            "dblclick .view": "editClicked",
            "focusout .edit": "editFocusout",
            'keypress .edit': 'inputKeypress'
        },

        ui: {
            "finishedCheckbox": ".toggle",
            "input": ".edit"
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
                this.$el.removeClass("active").addClass("completed");
            } else {
                this.$el.addClass("active").removeClass("completed");

            }
        },

        deleteClicked: function () {
            this.model.collection.remove(this.model);
        },

        editClicked: function () {
            this.$el.addClass("editing");
            this.ui.input.focus();
        },

        editFocusout: function () {
            var todoText = this.ui.input.val().trim();
            if (todoText) {
                this.model.set("todoText", todoText);
                this.$el.removeClass("editing");
                this.render();
            }
        },

        inputKeypress: function (e) {
            var ENTER_KEY = 13;
            if (e.which === ENTER_KEY) {
                this.editFocusout();
            }
        }

    });

    return TodoItem;
});