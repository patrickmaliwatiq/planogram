Planogram.App.start = function () {
    Planogram.App.Page = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            Planogram.App.displays = new Planogram.Collections.Displays({storeId: STORE_ID});
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
            _.bindAll(this, 'render');
            Planogram.Utilities.makeApiCall("/planogram/" + STORE_ID, "GET", {}, function() {
            }, function() {
                //success
            },
            function() {
                //error
            });
            this.$el.droppable({
                drop: function(event, ui) {
                    var coordinates = {
                        "top": $(ui.helper).css("top"),
                        "left": $(ui.helper).css("left")
                    };
                    $(ui.draggable).trigger("displayPlaced", { coordinates: coordinates });
                },
                accept: '.sidebarDisplay,.placedDisplay'
            });
            Planogram.App.displays.on('reset', this.render);
        },
        render: function() {
            var self = this;
            Planogram.App.displays.each(function (display) {
                var blueprintDisplayView;
                switch (display.get("Type")) {
                case Planogram.Constants.DisplayType.Browse:
                    blueprintDisplayView = new Planogram.Views.BrowsePlacedDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.AdPlay:
                    blueprintDisplayView = new Planogram.Views.AdplayPlacedDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.Stream:
                    blueprintDisplayView = new Planogram.Views.StreamPlacedDisplay({ model: display });
                    break;
                default:
                }
                self.$el.append(blueprintDisplayView.render().el);
            });
        }
    });

    Planogram.Views.Sidebar = Backbone.View.extend({
        el: '#sidebar',
        initialize: function () {
            this.displayContainer = new Planogram.Views.DisplaysContainer();
            this.playlistContainer = new Planogram.Views.PlaylistContainer();
            $('#tabs a').click(function(e) {
                e.preventDefault();
                $(this).tab('show');
            });
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
                var sidebarDisplayView;
                switch (display.get("Type")) {
                case Planogram.Constants.DisplayType.Browse:
                    sidebarDisplayView = new Planogram.Views.BrowseDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.AdPlay:
                    sidebarDisplayView = new Planogram.Views.AdPlayDisplay({ model: display });
                    break;
                case Planogram.Constants.DisplayType.Stream:
                    sidebarDisplayView = new Planogram.Views.StreamDisplay({ model: display });
                    break;
                default:
                }
                self.$el.append(sidebarDisplayView.render().el);
            });
        }
    });

    Planogram.Views.Display = Backbone.View.extend({
        className: "sidebarDisplay",
        tagName: "tr",
        events: {
            "displayPlaced" : "displayPlaced"
        },
        attributes: function() {
            return {
                id: this.model.get('Id') || "",
            };
        },
        initialize: function() {
            _.bindAll(this);
            this.model.on('change', this.render);
        },
        render: function() {
            var self = this;
            var templateParams = _.clone(this.model.toJSON());
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

            if (this.model.get("Coordinates")) {
                this.$el.addClass("placed");
                this.$el.draggable("disable");
            } else {
                this.$el.removeClass("placed");
                this.$el.draggable({
                    stop: function(event, ui) {
                        console.log(ui.position);
                    },
                    helper: "clone",
                    cursorAt: {"left": 0, "top": 0 },
                    start: function(event, ui) {
                        $(ui.helper).html(self._helperHtml);
                    }
                });
                this.$el.draggable("enable");
            }
            
            return this;
        },
        displayPlaced: function(event, args) {
            this.model.set({ "Coordinates": args.coordinates });
        }
    });
    
    Planogram.Views.PlacedDisplay = Backbone.View.extend({
        className: "placedDisplay",
        tagName: "div",
        events: {
            "click .assigned-playlist .remove" : "removePlaylist",
            "click #remove-display" : "removeDisplay",
            "displayPlaced" : "displayPlaced",
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
            this.$el.droppable({
                drop: function(event, ui) {
                    var playlistId = $(ui.draggable).attr("id");
                    self.drop(playlistId);
                },
                accept: this.droppableAccept,
                greedy: true
            });
            this.detailView = new Planogram.Views.DisplayDetailsView(this.model);
            this.$el.on("click", this.showDetails);
        },
        showDetails: function() {
            this.detailView.show(this.$el);
        },
        drop: function(playlistId) {
            var playlistIds = this.model.get("PlaylistIds");
            playlistIds.push(playlistId);
            this.model.set({ "PlaylistIds": playlistIds }, { forceChange: true });
        },
        render: function() {
            if (this.model.get("Coordinates")) {
                var self = this;
                var templateParams = _.clone(this.model.toJSON());
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
                var coordinates = this.model.get("Coordinates");
                this.$el.css({ "top": coordinates["top"], "left": coordinates["left"] });
                this.$el.droppable({ activeClass: "active-display" });

                this.$el.draggable({
                    start: function() {
                        self.detailView.quickHide();
                        self.$el.off("click", self.showDetails);
                    },
                    stop: function(event, ui) {
                        console.log(ui.position);
                        self.$el.on("click", self.showDetails);
                    },
                    helper: "original"
                });
                this.$el.show();
            } else {
                this.$el.hide();
            }
            return this;
        },
        removePlaylist: function(event) {
            var playlistId = $(event.currentTarget.parentElement).attr("id");
            var playlists = this.model.get("PlaylistIds");
            var itemIndex = _.indexOf(playlists, playlistId);
            if (itemIndex >= 0) {
                playlists.splice(itemIndex, 1);
            }
            this.model.set({ "PlaylistIds": playlists }, { forceChange: true });
        },
        removeDisplay: function() {
            this.model.set("Coordinates", null);
        },
        displayPlaced: function(event, args) {
            this.model.set({ "Coordinates": args.coordinates });
        }
    });
    
    Planogram.Views.BrowsePlacedDisplay = Planogram.Views.PlacedDisplay.extend({
        droppableAccept: ".playlist.browse",
        template: _.template($('#browse-placed-display-template').html()),
        events:{},
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.PlacedDisplay.prototype.events, this.events);
            Planogram.Views.PlacedDisplay.prototype.initialize.call(this);
        },
        drop: function(playlistId) {
            var playlistIds = this.model.get("PlaylistIds");
            if (_.indexOf(playlistIds, playlistId) >= 0)
                return;
            playlistIds.push(playlistId);
            this.model.set({ "PlaylistIds": playlistIds }, { forceChange: true });
        }
    });
    
    Planogram.Views.AdplayPlacedDisplay = Planogram.Views.PlacedDisplay.extend({
        droppableAccept: ".playlist.adplay",
        template: _.template($('#adplay-placed-display-template').html()),
        events:{},
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.PlacedDisplay.prototype.events, this.events);
            Planogram.Views.PlacedDisplay.prototype.initialize.call(this);
        },
        drop: function(playlistId) {
            var playlistIds = this.model.get("PlaylistIds");
            if (playlistIds.length === 1)
                return;
            
            playlistIds.push(playlistId);
            this.model.set({ "PlaylistIds": playlistIds }, { forceChange: true });
        }
    });
    
    Planogram.Views.StreamPlacedDisplay = Planogram.Views.PlacedDisplay.extend({
        droppableAccept: ".playlist.stream",
        template: _.template($('#stream-placed-display-template').html()),
        events:{},
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.PlacedDisplay.prototype.events, this.events);
            Planogram.Views.PlacedDisplay.prototype.initialize.call(this);
        },
        drop: function(playlistId) {
            var playlistIds = this.model.get("PlaylistIds");
            if (playlistIds.length === 1)
                return;
            
            playlistIds.push(playlistId);
            this.model.set({ "PlaylistIds": playlistIds }, { forceChange: true });
        }
    });

    Planogram.Views.BrowseDisplay = Planogram.Views.Display.extend({
        droppableAccept: ".playlist.browse",
        template: _.template($('#browse-display-template').html()),
        _helperHtml: "<div class='icon my-icons-browse'></div>",
        events: {
        },
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.Display.prototype.events, this.events);
            Planogram.Views.Display.prototype.initialize.call(this);
        }
    });

    Planogram.Views.AdPlayDisplay = Planogram.Views.Display.extend({
        droppableAccept: ".playlist.adplay",
        template: _.template($('#adplay-display-template').html()),
        _helperHtml: "<div class='icon my-icons-adplay'></div>",
        events: {
        },
        initialize: function() {
            this.events = _.extend({}, Planogram.Views.Display.prototype.events, this.events);
            Planogram.Views.Display.prototype.initialize.call(this);
        }
    });

    Planogram.Views.StreamDisplay = Planogram.Views.Display.extend({
        droppableAccept: ".playlist.stream",
        template: _.template($('#stream-display-template').html()),
        _helperHtml: "<div class='icon my-icons-stream'></div>",
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
        tagName: "tr",
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
        "@/Content/js/models/playlist.js",
        "@/Content/js/views/common/displayDetailsView.js"
    ])
    .wait(Planogram.App.start);