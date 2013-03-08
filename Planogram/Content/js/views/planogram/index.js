Planogram.App.start = function () {
    Planogram.App.Page = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            Planogram.App.displays = new Planogram.Collections.Displays();
            Planogram.App.playlists = new Planogram.Collections.Playlists();

            Planogram.App.blueprint = new Planogram.Views.Blueprint();
            Planogram.App.sidebar = new Planogram.Views.Sidebar();

            Planogram.App.playlists.fetch();
            Planogram.App.displays.fetch();

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
                var displayView;
                switch (display.get("Type")) {
                case Planogram.Constants.DisplayType.Browse:
                    displayView = new Planogram.Views.BrowseDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.AdPlay:
                    displayView = new Planogram.Views.AdPlayDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.Stream:
                    displayView = new Planogram.Views.StreamDisplay({ model: display });
                    break;
                default:
                }
                self.$el.append(displayView.render().el);
            });
        }
    });

    Planogram.Views.Display = Backbone.View.extend({
        tagName: "div",
        className: "display",
        events: {
            "displayPlaced" : "displayPlaced",
            "click .assigned-playlist .remove" : "removePlaylist"
        },
        attributes: function() {
            return {
                id: this.model.get('Id') || "",
            };
        },
        droppableAccept: "",
        initialize: function() {
            var self = this;
            _.bindAll(this);
            this.model.on('change', this.render);
            this.$el.draggable();
            this.$el.droppable({
                drop: function(event, ui) {
                    var playlistId = $(ui.draggable).attr("id");
                    var playlistIds = self.model.get("PlaylistIds");
                    
                    // XXX: Pull this logic out
                    if (playlistIds.length === 1 && (self.model.get("Type") === Planogram.Constants.DisplayType.AdPlay
                        || self.model.get("Type") === Planogram.Constants.DisplayType.Stream)) 
                        return;
                    
                    playlistIds.push(playlistId);
                    self.model.set({ "PlaylistIds": playlistIds }, { forceChange: true });
                },
                accept: this.droppableAccept,
                greedy: true
            });
        },
        render: function() {
            var templateParams = _.clone(this.model.toJSON());
            templateParams.playlistsVisible = this.playlistsVisible;
            var assignedPlaylists = [];
            _.each(this.model.get("PlaylistIds"), function(playlistId) {
            var playlist = _.find(Planogram.App.playlists.models, function(pl) {
                    return pl.get("Id") === playlistId;
                });
                if (playlist) {
                    assignedPlaylists.push(playlist.toJSON());
                }
            });
            templateParams.assignedPlaylists = assignedPlaylists;
            this.$el.html(this.template(templateParams));
            return this;
        },
        displayPlaced: function(event, args) {
            this.$el.droppable({activeClass: "active-display"});
            if (this.playlistsVisible !== args.showPlaylists) {
                this.playlistsVisible = args.showPlaylists;
                this.render();
            }
        },
        removePlaylist: function(event) {
            debugger;
            var rowIndex = $(event.currentTarget.parentElement).attr("rowIndex");
            var playlists = this.model.get("PlaylistIds");
            if (rowIndex >= 0) {
                playlists.splice(rowIndex, 1);
            }
            this.model.set({ "PlaylistIds": playlists }, { forceChange: true });
        }
    });

    Planogram.Views.BrowseDisplay = Planogram.Views.Display.extend({
        className: "browse display",
        droppableAccept: ".playlist.browse",
        template: _.template($('#browse-display-template').html()),
        events:{
        },
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.Display.prototype.events, this.events);
            Planogram.Views.Display.prototype.initialize.call(this);
        }
    });

    Planogram.Views.AdPlayDisplay = Planogram.Views.Display.extend({
        className: "adplay display",
        droppableAccept: ".playlist.adplay",
        template: _.template($('#adplay-display-template').html()),
        events: {
        },
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.Display.prototype.events, this.events);
            Planogram.Views.Display.prototype.initialize.call(this);
        }
    });

    Planogram.Views.StreamDisplay = Planogram.Views.Display.extend({
        className: "stream display",
        droppableAccept: ".playlist.stream",
        template: _.template($('#stream-display-template').html()),
        events: {
        },
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.Display.prototype.events, this.events);
            Planogram.Views.Display.prototype.initialize.call(this);
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
                var playlistView;
                switch (playlist.get("Type")) {
                case Planogram.Constants.PlaylistTypes.Browse:
                    playlistView = new Planogram.Views.BrowsePlaylist({ model: playlist });
                    break;
                case Planogram.Constants.PlaylistTypes.AdPlay:
                    playlistView = new Planogram.Views.AdPlayPlaylist({ model: playlist });
                    break;
                case Planogram.Constants.PlaylistTypes.Stream:
                    playlistView = new Planogram.Views.StreamPlaylist({ model: playlist });
                    break;
                default:
                }
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

    Planogram.Views.BrowsePlaylist = Planogram.Views.Playlist.extend({
        className: "playlist browse",
        template: _.template($('#browse-playlist-template').html()),
    });
    Planogram.Views.AdPlayPlaylist = Planogram.Views.Playlist.extend({
        className: "playlist adplay",
        template: _.template($('#adplay-playlist-template').html()),
    });
    Planogram.Views.StreamPlaylist = Planogram.Views.Playlist.extend({
        className: "playlist stream",
        template: _.template($('#stream-playlist-template').html()),
    });
    Planogram.App.Page = new Planogram.App.Page();
};



Bootstrap.load([
        "@/Content/js/models/display.js",
        "@/Content/js/models/playlist.js"
    ])
    .wait(Planogram.App.start);