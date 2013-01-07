/*global define*/
'use strict';

define(['backbone'], function (Backbone) {
    var TodoItem = Backbone.Model.extend({
        defaults: {
            isFinished: false
        }
    });

    return TodoItem;
});