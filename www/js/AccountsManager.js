function AccountsManager() {
    this.user = {};
    ref = new Firebase("https://dealminer.firebaseio.com/");
}

AccountsManager.prototype.loginBasic = function(email, password) {
    ref.authWithPassword({
        email: email,
        password: password
    }, function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            loadView['swipe-view']();
        }
    });

};

AccountsManager.prototype.createUser = function(email, password) {
    ref.createUser({
        email: email,
        password: password
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            AM.loginBasic(email, password);
        }
    });
};

AccountsManager.prototype.loginFacebook = function(username, password) {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            loadView['swipe-view']();
        }
    });
};

AM = new AccountsManager();