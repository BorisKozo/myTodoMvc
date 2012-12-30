define(["marionette", "hbs!templates/main_layout","./main_content_view","./main_footer_view"], function (Marionette, layoutTemplate,ContentView, FooterView) {
    var MainLayout = Marionette.Layout.extend({
        template: layoutTemplate,
        regions: {
            "content": "#main_layout_content",
            "footer":"#main_layout_footer"
        },
        onRender: function () {
            this.content.show(new ContentView());
            this.footer.show(new FooterView());
        }
    });

    return MainLayout;
});