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

searchButton.addEventListener("click", async () => {

    const domain = searchInput.value.trim().toLowerCase();

    registerButton.style.display = "none";

    if (!domain) {
        searchResult.innerHTML = "❌ Please enter a domain.";
        return;
    }

    if (!domain.includes(".")) {
        searchResult.innerHTML = "❌ Invalid domain format.";
        return;
    }

    const parts = domain.split(".");

    if (parts.length !== 2) {
        searchResult.innerHTML = "❌ Invalid domain format.";
        return;
    }

    const extension = parts[1];

    try {

        // Check if the registry exists
        const extensionRef = doc(db, "extensions", extension);
        const extensionSnap = await getDoc(extensionRef);

        if (!extensionSnap.exists()) {
            searchResult.innerHTML = `❌ The .${extension} registry does not exist.`;
            return;
        }

        const extensionData = extensionSnap.data();

        // Check if the domain is already registered
        const domainRef = doc(db, "domains", domain);
        const domainSnap = await getDoc(domainRef);

        if (domainSnap.exists()) {

            const domainData = domainSnap.data();

            searchResult.innerHTML = `
                ❌ <b>${domain}</b> is already registered.<br>
                Owner: ${domainData.ownerEmail || "Unknown"}
            `;

            registerButton.style.display = "none";

        } else {

            searchResult.innerHTML = `
                ✅ <b>${domain}</b> is available!<br>
                Registry: .${extension}<br>
                Policy: ${extensionData.policy}
            `;

            setCurrentDomain(domain);

            registerButton.style.display = "inline-block";

        }

    } catch (error) {

        console.error(error);
        searchResult.innerHTML = "❌ Error connecting to Firebase.";

    }

});
