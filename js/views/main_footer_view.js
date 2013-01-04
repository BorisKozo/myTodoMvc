define(["marionette", "hbs!templates/main_footer", "./../controller"], function (Marionette, footerTemplate, controller) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,

        initialize: function (options) {
            controller.vent.on("todosUpdated", this.updateFooter, this);
            this.isVisible = false;
        },

        updateFooter: function (todos) {
            if (todos.length === 0 && this.isVisible) {
                this.$el.hide(300);
                return;
            }

            if (!this.isVisible && todos.length > 0) {
                this.$el.show(300);
            }
        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }
    });

    return FooterView;
});