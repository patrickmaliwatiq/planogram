Planogram.App.start = function () {
    Planogram.App.Page = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            Planogram.App.blueprint = new Planogram.Views.Blueprint();
            Planogram.App.sidebar = new Planogram.Views.Sidebar();
        }
    });

    Planogram.Views.Blueprint = Backbone.View.extend({
        el: '#blueprint',
        initialize: function () {

        }
    });

    Planogram.Views.Sidebar = Backbone.View.extend({
        el: '#sidebar',
        initialize: function () {
            this.$(".draggable").draggable();
            this.$(".droppable").droppable({
                drop: function (event, ui) {
                    debugger;
                    $(this)
          .addClass("ui-state-highlight")
          .find("p")
            .html("Dropped!");
                }
            });
        }
    });

    var pageView = Planogram.App.Page = new Planogram.App.Page();
};

Bootstrap.load([
        
    ])
    .wait(Planogram.App.start);