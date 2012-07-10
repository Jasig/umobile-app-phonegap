var umobile = umobile || {};
umobile.auth = umobile.auth || {};

(function ($) {
        
    var getLocalLoginServletUrl = function () {
        return config.uMobileServerUrl + config.uMobileServerContext + "/Login";
    };
    
    var getLocalLogoutServletUrl = function () {
        return config.uMobileServerUrl + config.uMobileServerContext + "/Logout";
    };
    
    /**
     * Store the user's credentials in the local app storage.
     */
    umobile.auth.storeCredentials = function(credentials) {
    
        var username, password;
        
        username = GibberishAES.enc(credentials.username, config.encryptionKey);
        password = GibberishAES.enc(credentials.password, config.encryptionKey);
    
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);    
    
    };
    
    /**
     * Retrieve the user's credentials from local app storage.
     */
    umobile.auth.retrieveCredentials = function () {
        
        var encUsername, encPassword, username, password, credentials;
        
        encUsername = window.localStorage.getItem("username");
        encPassword = window.localStorage.getItem("password");
        
        if (username && password) {
            username = GibberishAES.dec(credentials.encUsername, config.encryptionKey);
            password = GibberishAES.dec(credentials.encPassword, config.encryptionKey);
            return { username: username, password: password };
        } else {
            console.log("No credentials found for user");
            return null;
        }
    
    };

    umobile.auth.mockLogin = function(credentials, onSuccess, onError) {
        
        var data, url;
    
        // if credentials are included, add them to the POST data
        if (credentials && credentials.get("username") && credentials.get("password")) {
            url = config.uMobileServerUrl + config.uMobileServerContext + "/layout-student.json";
            console.log("Attempting local login via URL " + url);
        }
        
        else {
            url = config.uMobileServerUrl + config.uMobileServerContext + "/layout-guest.json";
            console.log("Establishing guest session via URL " + url);
        }
    
        // POST to the uMobile login servlet
        $.ajax({
            url : url,
            success : function(data, textStatus, jqXHR) {
                if (!credentials || !credentials.attributes.username) {
                    console.log("Established guest session");
                    onSuccess(data);
                } else if (credentials.attributes.username === data.user) {
                    console.log("Successful authentication for user " + credentials.attributes.username);
                    onSuccess(data);
                } else {
                    console.log("Error performing local authentication: " + textStatus + ", " + errorThrown);
                    onError(jqXHR, "Auth failure");
                }
            },
            error : function (jqXHR, textStatus, errorThrown) { 
                console.log("Error performing local authentication: " + textStatus + ", " + errorThrown);
                onError(jqXHR, textStatus, errorThrown); 
            },
            dataType : "json",
            type : "GET"
        });
        
    };

    
    /**
     * Perform authentication via the uMobile application server's local authentication
     * controller.
     */
    umobile.auth.localLogin = function(credentials, onSuccess, onError) {
        
        var data, url;
        
        data = { refUrl: config.uMobileServerContext + "/layout.json" };
        url = getLocalLoginServletUrl();
    
        // if credentials are included, add them to the POST data
        if (credentials && credentials.get("username") && credentials.get("password")) {
            data.userName = credentials.attributes.username;
            data.password = credentials.attributes.password;
            console.log("Attempting local login via URL " + url);
        }
        
        else {
            console.log("Establishing guest session via URL " + url);
        }
    
        // POST to the uMobile login servlet
        $.ajax({
            url : getLocalLoginServletUrl(),
            data: data,
            success : function(data, textStatus, jqXHR) {
                if (!credentials || !credentials.attributes.username) {
                    console.log("Established guest session");
                    onSuccess(data);
                } else if (credentials.attributes.username === data.user) {
                    console.log("Successful authentication for user " + credentials.attributes.username);
                    onSuccess(data);
                } else {
                    console.log("Error performing local authentication: " + textStatus + ", " + errorThrown);
                    onError(jqXHR, "Auth failure");
                }
            },
            error : function (jqXHR, textStatus, errorThrown) {
                console.log("Error performing local authentication: " + textStatus + ", " + errorThrown);
                onError(jqXHR, textStatus, errorThrown); 
            },
            dataType : "json",
            type : "POST"
        });
        
    };

    umobile.auth.casLogin = function(credentials, onSuccess, onError) {
        
        var casUrl, serviceUrl;

        if (!credentials) {
            return umobile.auth.localLogin(credentials, onSuccess, onError);
        }
        
        casUrl = config.casServerUrl + '/cas/login';
        serviceUrl = getLocalLoginServletUrl() + "?refUrl=" + config.uMobileServerContext + "/layout.json";
        console.log("Attempting CAS authentication to URL " + casUrl + " using serviceUrl " + serviceUrl);
        
        // POST to the uMobile login servlet
        $.ajax({
            url : casUrl,
            data: { service: serviceUrl },
            success : function(html, textStatus, jqXHR) {
                
                var flowRegex, executionRegex, flowId, executionId, data;
                
                // if this doesn't look like the CAS login form, we already
                // have a CAS session and were directed straight to uMobile
                if (html.indexOf('name="lt"') === -1) {
                    data = $.parseJSON(html);
                    if (!credentials || credentials.attributes.username === data.user) {
                        onSuccess(data);
                    } else {
                        console.log("Error parsing layout JSON response");
                        onError(jqXHR, "Auth failure");
                    }
                } 
                
                // otherwise submit the user's credentials
                else {
                    
                    flowRegex = /input type="hidden" name="lt" value="([a-z0-9\-]*)?"/i;
                    executionRegex = /input type="hidden" name="execution" value="([a-z0-9\-]*)?"/i;
    
                    flowId = flowRegex.exec(html)[1];
                    executionId = executionRegex.exec(html)[1];
                    
                    console.log("Submitting user credentials to CAS");
                    $.ajax({
                        url: casUrl,
                        data: {
                            service: serviceUrl,
                            username: credentials.attributes.username,
                            password: credentials.attributes.password,
                            lt: flowId,
                            execution: executionId,
                            _eventId: 'submit',
                            submit: 'LOGIN'
                        },
                        success : function(data, textStatus, jqXHR) {
                            if (!credentials || credentials.attributes.username === data.user) {
                                onSuccess(data);
                            } else {
                                console.log("Error parsing layout JSON response" + textStatus + ", " + errorThrown);
                                onError(jqXHR, "Auth failure");
                            }
                        },
                        error : function (jqXHR, textStatus, errorThrown) { 
                            console.log("Error submitting CAS credentials: " + textStatus + ", " + errorThrown);
                            onError(jqXHR, textStatus, errorThrown); 
                        },
                        dataType : "json",
                        type : "POST"
                    });

                }
                
            },
            error : function (jqXHR, textStatus, errorThrown) { 
                console.log("Error accessing CAS login page: " + textStatus + ", " + errorThrown);
                onError(jqXHR, textStatus, errorThrown); 
            },
            dataType : "html",
            type : "GET"
        });

    };

    umobile.auth.switchuser = function(credentials, onSuccess, onError) {
        
        var logoutUrl = getLocalLogoutServletUrl();

        console.log("Logging out via URL " + logoutUrl);
        $.ajax({
            url : logoutUrl,
            success : function(html, textStatus, jqXHR) {
                window["umobile"]["auth"][config.loginFn](credentials, onSuccess, onError);
            },
            error : function (jqXHR, textStatus, errorThrown) { 
                console.log("Error logging out: " + textStatus + ", " + errorThrown);
                onError(jqXHR, textStatus, errorThrown); 
            },
            dataType : "html",
            type : "GET"
        });
    };

})(jQuery);