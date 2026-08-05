import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


export async function register(email, password) {

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Account created:", userCredential.user);

        return userCredential.user;

    } catch (error) {

        console.error("Registration error:", error.message);

        alert(error.message);

        return null;

    }

}


export async function login(email, password) {

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Logged in:", userCredential.user);

        return userCredential.user;

    } catch (error) {

        console.error("Login error:", error.message);

        alert(error.message);

        return null;

    }

}


export async function logout() {

    try {

        await signOut(auth);

        console.log("Logged out");

    } catch(error) {

        console.error(error);

    }

}
