$(function(){

    var App;
    
    var AppState = Backbone.Model.extend({
        defaults: function () {
            return {
                id: "state",
                authenticated: false,
                lastSessionAccess: null
            };
        },
        sync: umobile.storage.sync(window["umobile"]["storage"][config.storageFn], "state")
    });
    
    var state = new AppState;
    
    var Module = Backbone.Model.extend({
        defaults: function () {
            return {
                fname: "fname",
                title: "Title",
                url: "url",
                iconUrl: "imgUrl",
                newItemCount: 0,
                isNative: false
            };
        },
        sync: umobile.storage.sync(window["umobile"]["storage"][config.storageFn], "module")
    });

    var ModuleList = Backbone.Collection.extend({
        model: Module,
        initialize: function () {
            this.sync = umobile.storage.sync(window["umobile"]["storage"][config.storageFn], "modules");
        },
        save: function (options) {
            this.sync("update", this, options);
        },
        fetch: function (options) {
            this.sync("read", this, options);
        }
    });
    
    var Modules = new ModuleList;

    var ModuleView = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#module-template").html()),
        events: {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON())).addClass("module-item").addClass("portlet");
            this.$el.find(".badge").addClass("up-new-item-count-" + this.model.attributes.newItemCount);

            var module = this.model;
            this.$el.find("a").bind("click", function () { 
                showModule(module);
            });
            return this;
        }
    });
    
    var showModule = function (module) {
        // construct the URL for the selected module
        console.log("Displaying module " + module.attributes.fname + " with URL " + module.attributes.url);

        // update the module page to contain the title and text for the
        // selected module
        $(".module-page-title").text(module.attributes.title);
        $("iframe").attr("src", module.attributes.url);

        // transition to the module page
        $.mobile.changePage("#module", { transition: "none" });
        state.save({ currentView: module.get("fname") });
    };
        
    var Credentials = Backbone.Model.extend({
        defaults: function () {
            return {
                id: "credentials",
                username: null,
                password: null
            };
        },
        sync: umobile.storage.sync(window["umobile"]["storage"][config.storageFn], "credentials")
    });
    
    var Creds = new Credentials;
    
    var CredentialsView = Backbone.View.extend({
        template: _.template($("#auth-template").html()),
        events: {
            "submit form": "updateCredentials",
            "click .logout-button": "logout"
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.usernameInput = this.$("input[name=username]");
            this.passwordInput = this.$("input[name=password]");
            return this;
        },
        updateCredentials: function () {
            this.model.save({ username: this.usernameInput.val(), password: this.passwordInput.val() }, { silent: true });
            this.model.change();
        },
        logout: function () {
            this.usernameInput = this.$("input[name=username]").val("");
            this.passwordInput = this.$("input[name=password]").val("");
            this.model.save({ username: null, password: null });
            console.log("Logging out");
        }
    });

    var onUpdateCredentials = function (appInstance) { 
        $.mobile.changePage("#home", { transition: "none" });
        $.mobile.showPageLoadingMsg("a", "Loading modules");
        getSession(function () { App.render(); });
    };
    
    var getSession = function (success) {
        var loginFn = window["umobile"]["auth"][config.loginFn];
        loginFn(
            Creds,
            function (data) {
                console.log("Rendering response for user " + data.user);
                var newmodules = [];
                $(data.layout.folders).each(function (idx, folder) {
                    $(folder.portlets).each(function (idx, portlet) {
                        portlet.id = portlet.fname;
                        
                        if (config.nativeIcons[portlet.fname]) {
                            portlet.iconUrl = "icons/" + config.nativeIcons[portlet.fname];
                        } else {
                            portlet.iconUrl = config.uPortalServerUrl + portlet.iconUrl;
                        }

                        if (config.nativeModules[portlet.fname]) {
                            portlet.url = config.nativeModules[portlet.fname];
                            portlet.isNative = true;
                        } else {
                            portlet.url = config.uMobileServerUrl + portlet.url;
                        }

                                            newmodules.push(new Module(portlet));
                    });
                });
                Modules.reset(newmodules);

                state.save({
                    "lastSessionAccess": (new Date()).getTime(),
                    "authenticated": Creds.get("username") ? true : false
                });
                console.log("Setting session tracking");
                SessionTracking.set(state.get("lastSessionAccess"));
                Modules.save({ success: success });

            },
            function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + textStatus + ", " + errorThrown);
            } 

        );
    };
    
    var AppView = Backbone.View.extend({
        el: "html",
        initialize: function () {
            this.footer = this.$(".umobile-auth-invitation");
            
            this.authView = new CredentialsView({ model: Creds });
            return this;
            
        },
        render: function () {

            console.log("rendering");
            this.$(".portal-nav").html("");
                                       console.log("cleared html");
            Modules.each(function (module) {
                var moduleView = new ModuleView({ model: module });
                this.$(".portal-nav").append(moduleView.render().el);
            });
                                       console.log("added modules");
            
            if (!state.get("authenticated")) {
                this.footer.show();
            } else {
                this.footer.hide();
            }

            this.$("#prefs .portlet-content").append(this.authView.render().el);
            $.mobile.hidePageLoadingMsg();

            if ((!Creds.get("username") || state.get("authenticated")) && state.get("currentView") && state.get("currentView") !== 'home') {
                Modules.each(function (module) {
                    if (module.get("fname") == state.get("currentView")) {
                        showModule(module);
                    }
                });
            }
        
        }
    });
    
    var getUrlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    };

    // Finally, we kick things off by creating the **App**.
    var onDeviceReady = function () {
        console.log("ready");
        App = new AppView;

        $.mobile.showPageLoadingMsg("a", "Loading modules");
        state.fetch({
            success: function () {
                Creds.fetch({
                    success: function () {
                        SessionTracking.get(function (time) { 
                            
                            var module = getUrlParam("module");
                            if (module) {
                                state.save("currentView", module);
                            }
                            
                            console.log("Session time: " + time);
                            if (time != 0) {
                                state.save("lastSessionAccess", time);
                            }
                                
                            var now = (new Date()).getTime();
                            if ((now - Number(state.get("lastSessionAccess"))) < 1000*60*10) {
                                Modules.fetch({ success: function () { 
                                    App.render();
                                    Creds.bind('change', onUpdateCredentials, this);
                                    Creds.bind('destroy', onUpdateCredentials, this);
                                } });
                            } else {
                                getSession(function () {
                                    App.render();
                                    Creds.bind('change', onUpdateCredentials, this);
                                    Creds.bind('destroy', onUpdateCredentials, this);
                                });
                            }
                            
                        });
                    }
                });
            }
        });
        
        
    };
    
    document.addEventListener("deviceready", onDeviceReady, false);
    if (config.loginFn === 'mockLogin') {
        onDeviceReady();
    }

});
