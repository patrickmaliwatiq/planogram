Planogram.Views.DisplayDetailsView = Backbone.View.extend({
    el: "#display-details",
    events: {
        'click .close-details' : "hide"
    },
    _animating: false,
    _visible: false,
    initialize: function(options) {
        this.model = options.model;
        //bind to change
    },
    hide: function() {
        if (!this._animating && this._visible) {
            debugger;
            $('html').unbind('click');
            this._animating = true;

            var self = this;
            var callback = function() {
                self._animating = false;
                self._visible = false;
            };
            this.$el.hide('slide', { direction: 'left' }, 350, callback);
        }
    },
    quickHide: function() {
        if (!this._animating && this._visible) {
            $('html').unbind('click');
            this.$el.hide();
            this._visible = false;
        }
    },
    render: function() {
        
    },
    show: function(view) {
        if (!this._animating && !this._visible) {
            this._animating = true;

            var self = this;
            var $view = $(view);
            var callback = function() {
                self._animating = false;
                self._visible = true;
            };
            this.$el.css('bottom', '')
                .css('top', $view.offset().top)
                .css('left', $view.offset().left + $view.outerWidth() +2)
                .show('slide',{direction:'left'},350, callback);

        } 
    }
});
