import { db } from "./firebase.js";
import { setCurrentDomain } from "./register.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const searchInput = document.getElementById("domainSearch");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");
const registerButton = document.getElementById("registerButton");

console.log("Register button:", registerButton);

searchButton.addEventListener("click", async () => {

    registerButton.style.display = "none";

    const domain = searchInput.value.trim().toLowerCase();

    if (!domain) {
        searchResult.innerHTML = "❌ Please enter a domain.";
        return;
    }

    const parts = domain.split(".");

    if (parts.length !== 2) {
        searchResult.innerHTML = "❌ Invalid domain format.";
        return;
    }

    const extension = parts[1];

    try {

        // Does the registry exist?
        const extensionSnap = await getDoc(
            doc(db, "extensions", extension)
        );

        if (!extensionSnap.exists()) {

            searchResult.innerHTML =
                `❌ The .${extension} registry does not exist.`;

            return;

        }

        // Is the domain already registered?
        const domainSnap = await getDoc(
            doc(db, "domains", domain)
        );

        if (domainSnap.exists()) {

            const data = domainSnap.data();

            searchResult.innerHTML = `
                ❌ <b>${domain}</b> is already registered.<br>
                Owner: ${data.ownerEmail ?? "Unknown"}
            `;

            return;

        }

        // Domain is available

        setCurrentDomain(domain);

        const extensionData = extensionSnap.data();

        searchResult.innerHTML = `
            ✅ <b>${domain}</b> is available!<br>
            Registry: .${extension}<br>
            Policy: ${extensionData.policy}
        `;

        registerButton.style.display = "inline-block";

    } catch (error) {

        console.error(error);

        searchResult.innerHTML =
            "❌ Error connecting to Firebase.";

    }

});
