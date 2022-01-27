const logForm = document.querySelector(".login-form");
const logIn =  document.querySelector(".login");
const signUpForm = document.querySelector(".signup-form");
const signUp =  document.querySelector(".signup");
const btnClose = document.querySelector(".closebtn");

if (btnClose) {
    logForm.querySelector('.btn').disabled = true;
    signUpForm.querySelector('.btn').disabled = true;

    btnClose.addEventListener("click", () => {
        document.querySelector(".error-msg").style.display = 'none';
        logForm.querySelector('.btn').disabled = false;
        signUpForm.querySelector('.btn').disabled = false;
    });
}

logForm.style.display = 'none';
logIn.style.background = "none";
logIn.addEventListener("click", () => {
    signUpForm.style.display = 'none';
    logForm.style.display = 'block';
    signUp.style.background = "none";
    logIn.style.background = "#fff";
});

signUp.addEventListener("click", () => {
    signUpForm.style.display = 'block';
    logForm.style.display = 'none';
    logIn.style.background = "none";
    signUp.style.background = "#fff";
});


