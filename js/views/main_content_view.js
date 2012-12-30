define(["marionette", "hbs!templates/main_content"], function (Marionette, contentTemplate) {
    var FooterView = Marionette.ItemView.extend({
        template: contentTemplate
    });

    return FooterView;
});