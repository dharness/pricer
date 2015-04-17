function AccountsManager() {
    this.user = {};
    ref = new Firebase("https://dealminer.firebaseio.com/");

    // ref.authWithOAuthPopup("facebook", function(error, authData) {
    //     if (error) {
    //         console.log("Login Failed!", error);
    //     } else {
    //         console.log("Authenticated successfully with payload:", authData);
    //     }
    // });
}

AccountsManager.prototype.loginBasic = function(username, password) {

};

AM = new AccountsManager();