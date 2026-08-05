import {
    register,
    login
} from "./auth.js";


const email =
document.getElementById("emailInput");

const password =
document.getElementById("passwordInput");


document.getElementById("signupButton")
.onclick = async () => {

    const user = await register(
        email.value,
        password.value
    );

    if(user){
        alert("Account created!");
    }

};


document.getElementById("loginButton")
.onclick = async () => {

    const user = await login(
        email.value,
        password.value
    );

    if(user){
        alert("Logged in!");
    }

};
