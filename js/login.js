console.log("LOGIN.JS LOADED");

import {
    register,
    login,
    logout
} from "./auth.js";

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");

const loginArea = document.getElementById("loginArea");
const memberArea = document.getElementById("memberArea");
const welcomeUser = document.getElementById("welcomeUser");
const logoutButton = document.getElementById("logoutButton");

signupButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const user = await register(email, password);

    if(user){

        alert("Account created!");

    }

});

loginButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const user = await login(email, password);

    if(user){

        alert("Logged in!");

    }

});

logoutButton.addEventListener("click", async () => {

    await logout();

});

onAuthStateChanged(auth, (user) => {

    if(user){

        loginArea.style.display = "none";

        memberArea.style.display = "block";

        welcomeUser.textContent =
            "Welcome, " + user.email;

    }else{

        loginArea.style.display = "block";

        memberArea.style.display = "none";

    }

});
