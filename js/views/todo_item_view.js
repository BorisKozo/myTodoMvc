define(["marionette", "hbs!templates/todo_item"], function (Marionette, todoItemTemplate) {
    var TodoItem = Marionette.ItemView.extend({
        template: todoItemTemplate,
        tagName: "li",

        events: {
            "change .toggle": "finishClicked",
            "click .destroy": "deleteClicked",
            "dblclick .view > label": "editClicked",
            "focusout .edit": "editFocusout",
            'keydown .edit': 'inputKeypress'
        },

        ui: {
            "finishedCheckbox": ".toggle",
            "input": ".edit"
            
        },

        modelEvents: {
            "change:isFinished": "finishChanged"
        },

        finishClicked: function (e) {
            var finishState = e.target.checked;
            this.model.set("isFinished", finishState);
            this.model.collection.trigger("finishChanged");
        },

        finishChanged: function (model) {
            var finishState = model.get("isFinished");
            if (finishState) {
                this.$el.removeClass("active").addClass("completed");
            } else {
                this.$el.addClass("active").removeClass("completed");
            }
            this.ui.finishedCheckbox.prop("checked", finishState);
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
            var ENTER_KEY = 13, ESC_KEY = 27;
            if (e.which === ENTER_KEY) {
                this.editFocusout();
                return;
            }
            if (e.which === ESC_KEY) {
                this.$el.removeClass("editing");
            }
        }

    });

    return TodoItem;
});