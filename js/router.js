/*global define*/
'use strict';

define(['marionette', './controller'], function (Marionette, controller) {

    var MainRouter = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'displayModeAll',
            'active': 'displayModeActive',
            'completed': 'displayModeCompleted'
        },
        controller: controller
    });

    return new MainRouter();
});