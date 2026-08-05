import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// Register

export async function register(email, password) {

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        return userCredential.user;

    } catch(error) {

        console.error(error);
        return null;

    }

}


// Login

export async function login(email, password) {

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        return userCredential.user;

    } catch(error) {

        console.error(error);
        return null;

    }

}


// Logout

export async function logout() {

    await signOut(auth);

}
