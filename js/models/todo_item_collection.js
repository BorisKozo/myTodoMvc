/*global define*/
'use strict';

define(['backbone'], function (Backbone) {
    var TodoItemCollection = Backbone.Collection.extend({
        setFinished: function (value) {
            this.each(function (item) {
                item.set('isFinished', value);
            });
            this.trigger('finishChanged');
        }
    });

    return TodoItemCollection;
});