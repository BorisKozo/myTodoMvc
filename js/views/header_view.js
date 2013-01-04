define(["marionette", "hbs!templates/header", "./../controller"], function (Marionette, headerTemplate, controller) {
    var HeaderView = Marionette.ItemView.extend({
        template: headerTemplate,
        ui: {
            "input": "#new-todo"
        },
        events: {
            'keypress #new-todo': 'inputKeypress'
        },

        inputKeypress: function (e) {
            var ENTER_KEY = 13,
             todoText = this.ui.input.val().trim();

            if (e.which === ENTER_KEY && todoText) {
                controller.vent.trigger("todoTextReady", todoText);
                this.ui.input.val('');
            }
        }

    });

    return HeaderView;
});