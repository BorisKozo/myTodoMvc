define(["marionette", "hbs!templates/footer"], function (Marionette, footerTemplate) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,
        serializeData: function () {
        }
    });

    return FooterView;
});