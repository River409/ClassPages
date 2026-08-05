console.log("LOGIN.JS LOADED");


import {
    register,
    login
} from "./auth.js";


const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");


console.log({
    emailInput,
    passwordInput,
    loginButton,
    signupButton
});


signupButton.addEventListener("click", async () => {

    console.log("SIGN UP CLICKED");


    const email = emailInput.value;
    const password = passwordInput.value;


    const user = await register(
        email,
        password
    );


    if(user){

        alert(
            "Account created successfully!"
        );

    }

});


loginButton.addEventListener("click", async () => {

    console.log("LOGIN CLICKED");


    const email = emailInput.value;
    const password = passwordInput.value;


    const user = await login(
        email,
        password
    );


    if(user){

        alert(
            "Logged in successfully!"
        );

    }

});
