// Initialize DOM variable for password hiding/showing
pwShowHide = document.querySelectorAll(".eye-icon"),

pwShowHide.forEach(eyeIcon => {
    // Add event listener for eye icon
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            // Show password
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            // Hide password
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
    })
})
