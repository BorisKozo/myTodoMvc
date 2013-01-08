/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    var TodoItem = Backbone.Model.extend({
        defaults: {
            isFinished: false
        }
    });

    return TodoItem;
});