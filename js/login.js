// Executed when browser has finished loading the login page
$(function(){
    window.login = function login() {
        // Receiving username and password values
        var uname=$(".input").val();
        var pass=$(".password").val();

        if(uname!="" && pass!="") {
            // Sending ajax request for logging in
            $.ajax({
            type:'POST',
            url: "login.php",
            data:{
                login: "login",
                username: uname,
                password: pass
            },
            success: function(response) {
                // If login was successful, will hide error message and redirect to homepage
                if(response=="success") {
                    $(".error-msg").addClass("hidden");
                    window.location.href="homepage.php";
                }
                // Otherwise, display error message
                else {
                    $(".error-msg").removeClass("hidden");
                }
            }
            });
        }
    return false;
    }
});