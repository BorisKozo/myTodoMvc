/*global define*/
'use strict';

define(['marionette', 'hbs!templates/footer'], function (Marionette, footerTemplate) {
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate

    });

    return FooterView;
});