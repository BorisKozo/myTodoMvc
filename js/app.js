define(['marionette', 'js/views/main_layout_view','js/views/footer_view'], function (Marionette, MainLayoutView, FooterView) {

    var App = new Marionette.Application();

    App.addRegions({
        section: "#todoapp",
        footer: "#info"
    });

    //Backbone.History.start();
    App.addInitializer(function (options) {
        App.section.show(new MainLayoutView());
        App.footer.show(new FooterView());
    });

    
    return App;
});