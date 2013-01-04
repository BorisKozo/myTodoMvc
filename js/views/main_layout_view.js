define(["marionette", "hbs!templates/main_layout",'js/views/main_header_view', 'js/views/main_content_view', 'js/views/main_footer_view', "./../controller"], 
    function (Marionette, layoutTemplate, MainHeaderView, MainContentView, MainFooterView, controller) {
    var MainLayoutView = Marionette.Layout.extend({
        template: layoutTemplate,
       regions:{
            header: "#header",
            content: "#main",
            footer: "#footer",
       },

       ui: {
           "footer":"#footer"
       },

       initialize: function (options) {
           controller.vent.on("todosUpdated", this.updateFooter, this);
           this.isFooterVisible = false;
       },

       updateFooter: function (todos) {
           if (todos.length === 0 && this.isFooterVisible) {
               this.ui.footer.hide();
               return;
           }

           if (!this.isVisible && todos.length > 0) {
               this.ui.footer.show();
               this.isFooterVisible = true;
           }
       },

       onRender: function () {
           this.header.show(new MainHeaderView());
           this.content.show(new MainContentView());
           this.footer.show(new MainFooterView());
       },

       onClose: function () {
           controller.vent.off(null, null, this);
       }

    });

    return MainLayoutView;
});