<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>

    <link rel="icon" href="images/timely-logo.png"/>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/login.css">

    <!-- Boxicons CSS -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- JavaScript -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://alcdn.msauth.net/browser/2.32.2/js/msal-browser.min.js"></script>
    <script src="js/login.js" ></script>
    
  </head>

  <body>
    <div class="circle-1"></div>
    <div class="circle-2"></div>

    <section class="container">
      <a href="index.html" class="back">go back</a>
      <div class="form login">
        <div class="form-content">
          <header>Login</header>
          <form action="login.php" method="post" onsubmit="return login();">
            <p class="error-msg hidden">Incorrect username or password</p>
            
            <div class="field input-field">
              <input type="text" name="username" value ="" placeholder="Username" class="input" required >
            </div>

            <div class="field input-field">
              <input type="password" name="password" value="" placeholder="Password" class="password" required >
              <i class='bx bx-hide eye-icon'></i>
            </div>

            <div class="field button-field">
              <button id="submitBtn" type="submit" name="submit">Login</button>
            </div>
          </form>

        </div>
        <div class="line"></div>

        <div class="media-options">
          <button class="microsoft-btn" onclick="signIn()">
            <img src="images/microsoft.png" alt="" class="microsoft-img">
            <span>Login with Microsoft</span>
          </button>
        </div>
      </div>
    </section>

    <!-- JavaScript -->
    <script src="js/password.js"></script>
    <script src="js/microsoft.js"></script>

  </body>
</html>
