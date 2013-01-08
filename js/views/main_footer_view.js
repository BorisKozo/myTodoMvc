/*global define*/

define(['marionette', 'underscore', 'hbs!templates/main_footer', './../controller'], function (Marionette, _, footerTemplate, controller) {
    'use strict';
    var FooterView = Marionette.ItemView.extend({
        template: footerTemplate,
        initialize: function () {
            //TODO: These should be in the model
            this.unfinishedItemsCount = 0;
            this.finishedItemsCount = 0;
            this.itemString = 'items';
            controller.vent.on('todosUpdated', this.updateData, this);
            controller.vent.on('displayModeChanged', this.render, this);
        },

        ui: {
            'clearCompletedButton': '#clear-completed',
            'allFilter': '.filter-all',
            'activeFilter': '.filter-active',
            'completedFilter': '.filter-completed'
        },

        events: {
            'click #clear-completed': 'clearCompletedClicked'
        },

        serializeData: function () {
            return {
                unfinishedItemsCount: this.unfinishedItemsCount,
                finishedItemsCount: this.finishedItemsCount,
                itemString: this.itemString
            };
        },

        updateData: function (data) {
            var count = 0;
            data.collection.each(function (todo) {
                if (!todo.get('isFinished')) {
                    count += 1;
                }
            });

            this.unfinishedItemsCount = count;
            this.finishedItemsCount = data.collection.length - count;

            if (this.unfinishedItemsCount === 1) {
                this.itemString = 'item';
            } else {
                this.itemString = 'items';
            }

            this.render();
        },

        clearCompletedClicked: function () {
            controller.vent.trigger('clearCompleted');
        },


        onRender: function () {
            if (this.finishedItemsCount > 0) {
                this.ui.clearCompletedButton.show();
            } else {
                this.ui.clearCompletedButton.hide();
            }

            this.ui.allFilter.removeClass('selected');
            this.ui.activeFilter.removeClass('selected');
            this.ui.completedFilter.removeClass('selected');

            if (controller.displayMode === controller.displayModes.all) {
                this.ui.allFilter.addClass('selected');
                return;
            }

            if (controller.displayMode === controller.displayModes.active) {
                this.ui.activeFilter.addClass('selected');
                return;
            }

            if (controller.displayMode === controller.displayModes.completed) {
                this.ui.completedFilter.addClass('selected');
                return;
            }

        },

        onClose: function () {
            controller.vent.off(null, null, this);
        }

    });

    return FooterView;
});