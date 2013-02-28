YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "app.Bootstrap",
        "auth.Authentication",
        "collection.ModuleCollection",
        "model.Credential",
        "model.Module",
        "model.State",
        "session.SessionTracker",
        "session.SessionTrackerMock",
        "storage.DB",
        "storage.Local",
        "storage.Storage",
        "view.App",
        "view.Credential",
        "view.Module"
    ],
    "modules": [
        "app",
        "auth",
        "collection",
        "model",
        "session",
        "storage",
        "umobile",
        "view"
    ],
    "allModules": [
        {
            "displayName": "app",
            "name": "app",
            "description": "Namespace for running instance of the umobile application."
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
            "displayName": "view",
            "name": "view",
            "description": "Namespace for umobile view implementations.\nHouses the App, Credential and Module view\nimplementations."
        }
    ]
} };
});