Planogram.App.start = function () {
    Planogram.App.Page = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            Planogram.App.displays = new Planogram.Collections.Displays();
            Planogram.App.playlists = new Planogram.Collections.Playlists();

            Planogram.App.blueprint = new Planogram.Views.Blueprint();
            Planogram.App.sidebar = new Planogram.Views.Sidebar();

            Planogram.App.displays.fetch();
            Planogram.App.playlists.fetch();
        }
    });

    Planogram.Views.Blueprint = Backbone.View.extend({
        el: '#blueprint',
        initialize: function () {
            this.$el.droppable({
                drop: function (event, ui) {
                    $(ui.draggable).trigger("displayPlaced", { showPlaylists: true});
                },
                accept: '.display'
            });
        }
    });

    Planogram.Views.Sidebar = Backbone.View.extend({
        el: '#sidebar',
        initialize: function () {
            this.displayContainer = new Planogram.Views.DisplaysContainer();
            this.playlistContainer = new Planogram.Views.PlaylistContainer();
        }
    });

    Planogram.Views.DisplaysContainer = Backbone.View.extend({
        el: '#displayContainer',
        initialize: function () {
            _.bindAll(this, 'render');
            Planogram.App.displays.on('reset', this.render);
        },
        render: function () {
            var self = this;
            Planogram.App.displays.each(function (display) {
                var displayView = new Planogram.Views.Display({ model: display });
                self.$el.append(displayView.render().el);
            });
        }
    });

    Planogram.Views.Display = Backbone.View.extend({
        tagName: "div",
        className: "display",
        attributes : function () {
            return {
                id : this.model.get('Id') || "",
            };
        },
        template: _.template($('#display-template').html()),
        events: {
            "displayPlaced": "displayPlaced"
        },
        playlistsVisible: false,
        initialize: function () {
            var self = this;
            _.bindAll(this);
            this.model.on('change', this.render);
            this.$el.draggable();
            this.$el.droppable({
                drop: function (event, ui) {
                    var playlistId = $(ui.draggable).attr("id");
                    var playlistIds = self.model.get("PlaylistIds");
                    playlistIds.push(playlistId);
                    self.model.set({"PlaylistIds": playlistIds },{forceChange: true});
                },
                accept: ".playlist",
                greedy: true
            });
        },
        render: function () {
            var templateParams = _.clone(this.model.toJSON());
            templateParams.playlistsVisible = this.playlistsVisible;
            this.$el.html(this.template(templateParams));
            return this;
        },
        displayPlaced: function(event, args) {
            if (this.playlistsVisible !== args.showPlaylists) {
                this.playlistsVisible = args.showPlaylists;
                this.render();
            }
        }
    });

    Planogram.Views.PlaylistContainer = Backbone.View.extend({
        el: '#playlistContainer',
        initialize: function () {
            _.bindAll(this, 'render');
            Planogram.App.playlists.on('reset', this.render);
        },
        render: function () {
            var self = this;
            Planogram.App.playlists.each(function (playlist) {
                var playlistView = new Planogram.Views.Playlist({ model: playlist });
                self.$el.append(playlistView.render().el);
            });
        }
    });

    Planogram.Views.Playlist = Backbone.View.extend({
        tagName: "div",
        className: "playlist",
        attributes : function () {
            return {
                id : this.model.get('Id') || "",
            };
        },
        template: _.template($('#playlist-template').html()),
        events: {},
        initialize: function () {
            this.model.on('change', this.render());
            this.$el.draggable({ helper: "clone" });
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    Planogram.App.Page = new Planogram.App.Page();
};

Bootstrap.load([
        "@/Content/js/models/display.js",
        "@/Content/js/models/playlist.js"
    ])
    .wait(Planogram.App.start);