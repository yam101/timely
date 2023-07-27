// Configuration of microsoft login 
const config = {
    auth: {
      clientId: "dfedcf10-8fa0-4c99-b0a8-79fde6bf217f", // change this according to your own microsoft azure account
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "http://localhost:3000/", 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie:false
    }
  };
  
  const myMsal = new msal.PublicClientApplication(config);
  let username="";
  let accountName="";

  // Signin function
  function signIn() {
    const loginScope = {
        scope: ["User.Read"],
      };
      myMsal.loginRedirect(loginScope);
  }

  // Signout function
  function signOut(){
    const logoutReq = {
        account:myMsal.getAccountByUsername(username)
    }
    myMsal.logoutRedirect(logoutReq)
  }
  
  // Handle promise
  myMsal.handleRedirectPromise().then((response)=>{
    if (response!=null) {
      username=response.account.username;
      accountName=response.account.name;
    
      // Send server request to login
      $.ajax({
        type:'POST',
        url: "login.php",
        data: {
            name: accountName
        },
        success: function() {
            // Redirect to homepage on successful login
            window.location.href="homepage.php";
        }
      });
    }
  }).catch(error => (console.log(error)));