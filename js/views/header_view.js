define(["marionette","hbs!templates/header"], function (Marionette,headerTemplate) {
    var HeaderView = Marionette.ItemView.extend({
        template: headerTemplate,
        serializeData: function () {
            console.log("Data");
        }
    });

    return HeaderView;
});