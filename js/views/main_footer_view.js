define(["marionette", "hbs!templates/main_footer", "./../controller"], function (Marionette, footerTemplate, controller) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,

    });

    return FooterView;
});