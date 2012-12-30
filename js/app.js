define(['marionette', 'js/views/header_view', 'js/views/footer_view', 'js/views/main_layout_view'], function (Marionette, HeaderView, FooterView, MainLayoutView) {
    App = new Marionette.Application();

    App.addRegions({
        header: "#header",
        content: "#content",
        footer: "#footer"
    });

    //Backbone.History.start();
    App.addInitializer(function (options) {
        App.header.show(new HeaderView());
        App.footer.show(new FooterView());
        App.content.show(new MainLayoutView());
    });

    
    return App;
});