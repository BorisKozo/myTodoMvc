define(['backbone', 'marionette', './router', 'js/views/main_layout_view', 'js/views/footer_view'],
    function (Backbone, Marionette, router, MainLayoutView, FooterView) {

    var App = new Marionette.Application();

    App.addRegions({
        section: "#todoapp",
        footer: "#info"
    });

    //Backbone.History.start();
    App.addInitializer(function (options) {
        App.section.show(new MainLayoutView());
        App.footer.show(new FooterView());
        Backbone.history.start();
    });


    return App;
});