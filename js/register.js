import { db, auth } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const registerButton = document.getElementById("registerButton");

let currentDomain = "";

export function setCurrentDomain(domain) {
    currentDomain = domain;
}

registerButton.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {

        alert("Please log in first.");
        return;

    }

    try {

        await setDoc(

            doc(db, "domains", currentDomain),

            {

                domain: currentDomain,

                ownerUid: user.uid,

                ownerEmail: user.email,

                createdAt: new Date().toISOString()

            }

        );

        registerButton.style.display = "none";

        const result = document.getElementById("searchResult");

        result.innerHTML = `
            ✅ <b>${currentDomain}</b> registered successfully!
            <br><br>

            <button id="editSiteButton" class="button">
                Edit Website
            </button>
        `;

        document
            .getElementById("editSiteButton")
            .addEventListener("click", () => {

                window.location.href =
                    `editor.html?domain=${encodeURIComponent(currentDomain)}`;

            });

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});
