Planogram.App.start = function () {
    Planogram.App.Page = Backbone.View.extend({
        el: 'body',
        events: {
            "click #edit-planogram" : "editPlanogram"
        },
        initialize: function () {
            Planogram.App.stores = new Planogram.Collections.Stores();
            Planogram.App.storesContainer = new Planogram.Views.StoresContainer();
            Planogram.App.stores.fetch();
        },
        editPlanogram: function() {
            var selectedStore = $('.radio.store :checked');
            Planogram.Utilities.redirect("/planogram/edit?storeId=" + selectedStore.attr('id'));
        }
    });

    Planogram.Views.StoresContainer = Backbone.View.extend({
        el: '#storeList',
        initialize: function () {
            _.bindAll(this, 'render');
            Planogram.App.stores.on('reset', this.render);
        },
        render: function () {
            var self = this;
            Planogram.App.stores.each(function (store) {
                var storeView = new Planogram.Views.Store({ model: store });
                self.$el.append(storeView.render().el);
            });
        }
    });

    Planogram.Views.Store = Backbone.View.extend({
        tagName: "label",
        className: "radio store",
        template: _.template($('#store-template').html()),
        attributes: function() {
            return {
                id: this.model.get('Id') || "",
            };
        },
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.on('change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    Planogram.App.Page = new Planogram.App.Page();
};

Bootstrap.load([
        "@/Content/js/models/store.js",
    ])
    .wait(Planogram.App.start);