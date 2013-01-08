/*global define*/

define(['backbone', './todo_item', 'localstorage'], function (Backbone, TodoItem) {
    'use strict';
    var TodoItemCollection = Backbone.Collection.extend({
        model:TodoItem,
        localStorage: new Backbone.LocalStorage("TodoItemCollection"),
        setFinished: function (value) {
            this.each(function (item) {
                item.set('isFinished', value);
            });
            this.trigger('finishChanged');
        }
    });

    return TodoItemCollection;
});