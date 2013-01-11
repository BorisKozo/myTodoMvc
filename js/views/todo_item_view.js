/*global define*/

define(['marionette', 'hbs!templates/todo_item', './../controller'], function (Marionette, todoItemTemplate, controller) {
    'use strict';
    var TodoItem = Marionette.ItemView.extend({
        template: todoItemTemplate,
        tagName: 'li',

        events: {
            'change .toggle': 'finishClicked',
            'click .destroy': 'deleteClicked',
            'dblclick .view > label': 'editClicked',
            'focusout .edit': 'editFocusout',
            'keydown .edit': 'inputKeypress'
        },

        ui: {
            'finishedCheckbox': '.toggle',
            'input': '.edit'
        },

        modelEvents: {
            'change:isFinished': 'render',
            'change':'save'
        },

        initialize: function () {
            controller.vent.on('displayModeChanged', this.render, this);
        },

        finishClicked: function (e) {
            var finishState = e.target.checked;
            this.model.set('isFinished', finishState);
            this.model.collection.trigger('finishChanged', [this.model], this.model.collection);
        },

        deleteClicked: function () {
            this.model.collection.remove(this.model);
        },

        editClicked: function () {
            this.$el.addClass('editing');
            this.ui.input.focus();
            this.ui.input.val(this.ui.input.val());
        },

        editFocusout: function () {
            var todoText = this.ui.input.val().trim();
            if (todoText) {
                this.model.set('todoText', todoText);
                this.$el.removeClass('editing');
                this.render();
            } else {
                this.deleteClicked();
            }
        },

        inputKeypress: function (e) {
            var ENTER_KEY = 13, ESC_KEY = 27;
            if (e.which === ENTER_KEY) {
                this.editFocusout();
                return;
            }
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
            }
        },

        save: function () {
            this.model.save();
        },

        onRender: function () {
            var finishState = this.model.get('isFinished');

            this.$el.removeClass('hidden');

            if (controller.displayMode === controller.displayModes.active && this.model.get('isFinished')) {
                this.$el.addClass('hidden');
            }

            if (controller.displayMode === controller.displayModes.completed && !this.model.get('isFinished')) {
                this.$el.addClass('hidden');
            }

            if (finishState) {
                this.$el.removeClass('active').addClass('completed');
            } else {
                this.$el.addClass('active').removeClass('completed');
            }
            this.ui.finishedCheckbox.prop('checked', finishState);

        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }

    });

    return TodoItem;
});