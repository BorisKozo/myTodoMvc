define(["marionette", "underscore", "hbs!templates/main_footer", "./../controller"], function (Marionette, _, footerTemplate, controller) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,
        initialize: function (options) {
            //TODO: These should be in the model
            this.unfinishedItemsCount = 0;
            this.finishedItemsCount = 0;
            this.itemString = "items";
            controller.vent.on("todosUpdated", this.updateData, this);
        },

        ui: {
            "clearCompletedButton": "#clear-completed"
        },

        events: {
            "click #clear-completed": "clearCompletedClicked"
        },

        serializeData: function () {
            return {
                unfinishedItemsCount: this.unfinishedItemsCount,
                finishedItemsCount: this.finishedItemsCount,
                itemString: this.itemString
            };
        },

        updateData: function (collection) {
            var count = 0;
            collection.each(function (todo) {
                if (!todo.get("isFinished")) {
                    count += 1;
                }
            });

            this.unfinishedItemsCount = count;
            this.finishedItemsCount = collection.length - count;

            if (this.unfinishedItemsCount === 1) {
                this.itemString = "item";
            } else {
                this.itemString = "items";
            }

            this.render();
        },

        clearCompletedClicked: function () {
            controller.vent.trigger("clearCompleted");
        },

        onRender: function () {
            if (this.finishedItemsCount > 0) {
                this.ui.clearCompletedButton.show();
            } else {
                this.ui.clearCompletedButton.hide();
            }
        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }

    });

    return FooterView;
});