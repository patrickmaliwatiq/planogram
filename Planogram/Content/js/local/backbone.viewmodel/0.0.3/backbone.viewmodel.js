/*
Backbone.ViewModel.js 0.0.1

(c) 2012 Willson Haw, iQmetrix Software
*/

/*global _:false, jQuery:false, Backbone:false */
(function ($, _, Backbone) {
    "use strict";

    var oldConfigure = Backbone.View.prototype._configure;

    var View = Backbone.View.extend({
        //Extend view to allow passing in "viewModel" as an option, and automatically
        //  set the viewModel property
        _configure: function (options) {
            oldConfigure.call(this, options);
            if (options && options.viewModel) {
                this.viewModel = options.viewModel;
            }
        }
    });

    var ViewModel = Backbone.Model.extend({
        model: null,
        isNew: function () {
            return this.model.isNew();
        },
        properties: {},
        _setAttribute: Backbone.Model.prototype.set,
        read: function (attr, options) {
            var property = this.properties[attr];
            var val;

            if (property.read) {
                if (_.isFunction(property.read)) {
                    val = property.read.call(this, attr);
                } else {
                    val = this.model.get(property.read);
                }
            } else {
                val = this.model.get(attr);
            }

            this._setAttribute(attr, val, options);
            return val;
        },
        _doSet: function (attr, value, options) {
            var property = this.properties[attr];

            //Run validation
            if (property.validate && _.isFunction(property.validate)) {
                var error = property.validate(value);
                if (error) {
                    if (options.error) {
                        options.error(this, error, options);
                    } else {
                        this.trigger("error", this, error, options);
                    }
                    return false;
                }
            }

            var result;

            if (property.write) {
                if (_.isFunction(property.write)) {
                    result = property.write.call(this, value, options);
                } else {
                    result = this.model.set(property.write, value, options);
                }
            } else {
                result = true;
            }

            if (result) {
                this._setAttribute(attr, value, options);
            }

            return result;
        },
        constructor: function (model) {
            var attrs = {};
            var self = this;

            this.model = model;
            this._escapedAttributes = {};
            this.cid = _.uniqueId('c');
            this.changed = {};
            this._silent = {};
            this._pending = {};
            this.attributes = {};
            this.initialize.apply(this, arguments);

            //Set all initial values first, otherwise read functions won't be able to use them
            _.each(this.properties, function (property, attr) {
                attrs[attr] = property.initial;
            });
            this._setAttribute(attrs, { silent: true });

            //Set all the model attribute values if they exist
            _.each(this.properties, function (property, attr) {
                if (_.isFunction(property.read)) {
                    attrs[attr] = property.read.call(self, attr);
                } else if (model.attributes) {
                    if (_.isString(property.read)) {
                        attrs[attr] = model.attributes[property.read];
                    } else {
                        attrs[attr] = model.attributes[attr];
                    }
                }
                if (attrs[attr] === undefined) {
                    attrs[attr] = property.initial;
                }

                var changeCallback = function () {
                    this.read(attr, { silent: true });
                };

                //Automatically bind to model change events
                if (_.isArray(property.change)) {
                    _.each(property.change, function (prop) {
                        self.model.on("change:" + prop, changeCallback, self);
                    });
                } else if (property.change) {
                    self.model.on("change:" + property.change, changeCallback, self);
                } else {
                    self.model.on("change:" + attr, changeCallback, self);
                }
            });
            this._setAttribute(attrs, { silent: true });

            //our doGet triggers sets silently, so this triggers a change on the VM
            this.model.on("change", function () {
                this.trigger("change");
            }, this);

            //raising errors in the model should also raise the same error in the VM
            this.model.on("error", function (model, err, obj) {
                this.trigger("error", model, err, obj);
            }, this);

            // Reset change tracking.
            this.changed = {};
            this._silent = {};
            this._pending = {};
            this._previousAttributes = _.clone(this.attributes);
        },
        set: function (key, value, options) {
            options = options || {};

            if (!key || !this.properties[key]) {
                return false;
            }

            //Run set function
            return this._doSet(key, value, options);
        },
        get: function (attr) {
            return this.attributes[attr];
        },
        save: function () {
            return this.model.save();
        }
    });

    Backbone.View = View;
    Backbone.ViewModel = ViewModel;
})(jQuery, _, Backbone);