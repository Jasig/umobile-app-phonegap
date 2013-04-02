YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "auth.Authentication",
        "collection.ModuleCollection",
        "model.Credential",
        "model.Module",
        "model.Notifier",
        "model.State",
        "router.RouteManager",
        "session.SessionTracker",
        "session.SessionTrackerMock",
        "storage.DB",
        "storage.Local",
        "storage.Storage",
        "utility.Utils",
        "view.Base",
        "view.Breadcrumb",
        "view.DashboardView",
        "view.Footer",
        "view.Header",
        "view.LoadedView",
        "view.Login",
        "view.Module",
        "view.ModuleView",
        "view.Notifier",
        "view.Page",
        "view.ViewManager"
    ],
    "modules": [
        "app",
        "auth",
        "collection",
        "model",
        "router",
        "session",
        "storage",
        "umobile",
        "utility",
        "view"
    ],
    "allModules": [
        {
            "displayName": "app",
            "name": "app",
            "description": "Namespace for running instances that are needed across the\numobile application."
        },
        {
            "displayName": "auth",
            "name": "auth",
            "description": "Namespace for the umobile authentication implementation."
        },
        {
            "displayName": "collection",
            "name": "collection",
            "description": "Namespace for umobile collection implementations.\nHouses the Module collection implementation."
        },
        {
            "displayName": "model",
            "name": "model",
            "description": "Namespace for umobile model implementations.\nHouses the Credential, Module and State model\nimplementations."
        },
        {
            "displayName": "router",
            "name": "router",
            "description": "Namespace for umobile router implementation."
        },
        {
            "displayName": "session",
            "name": "session",
            "description": "Namespace for the umobile session implementation."
        },
        {
            "displayName": "storage",
            "name": "storage",
            "description": "Namespace for the umobile storage implementation."
        },
        {
            "displayName": "umobile",
            "name": "umobile",
            "description": "Main module for the umobile application. Namespaces\nall source logic to the umobile namespace. Houses the\napp, bootstrap, model, collection, view, auth and storage\nsubmodules."
        },
        {
            "displayName": "utility",
            "name": "utility",
            "description": "Namespace for umobile utilities."
        },
        {
            "displayName": "view",
            "name": "view",
            "description": "Namespace for umobile view implementations.\nHouses the App, Credential and Module view\nimplementations."
        }
    ]
} };
});