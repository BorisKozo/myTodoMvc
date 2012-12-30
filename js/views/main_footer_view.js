define(["marionette", "hbs!templates/main_footer"], function (Marionette, footerTemplate) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate
    });

    return FooterView;
});