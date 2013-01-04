define(["marionette", "underscore", "hbs!templates/main_footer", "./../controller"], function (Marionette, _, footerTemplate, controller) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,
        initialize: function (options) {
            this.unfinishedItemsCount = 0;
            this.itemString = "items";
            controller.vent.on("todosUpdated", this.updateData, this);
        },
        serializeData: function () {
            return {
                unfinishedItemsCount: this.unfinishedItemsCount,
                itemString: this.itemString
            }
        },

        updateData: function (collection) {
            var count = 0;
            collection.each(function (todo) {
                if (!todo.get("isFinished")) {
                    count++;
                }
            });
                
            this.unfinishedItemsCount = count;
            if (this.unfinishedItemsCount === 1) {
                this.itemString = "item";
            } else {
                this.itemString = "items";
            }
            this.render();
        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }

    });

    return FooterView;
});