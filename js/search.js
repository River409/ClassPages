
import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const searchInput = document.getElementById("domainSearch");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");


searchButton.addEventListener("click", async () => {

    const domain = searchInput.value.trim().toLowerCase();

    if (!domain) {
        searchResult.innerHTML = "❌ Please enter a domain.";
        return;
    }


    if (!domain.includes(".")) {
        searchResult.innerHTML = "❌ Invalid domain format.";
        return;
    }


    const parts = domain.split(".");

    const name = parts[0];
    const extension = parts[1];


    if (!name || !extension) {
        searchResult.innerHTML = "❌ Invalid domain.";
        return;
    }


    // Check if the extension exists

    const extensionRef = doc(
        db,
        "extensions",
        extension
    );


    const extensionSnap = await getDoc(extensionRef);


    if (!extensionSnap.exists()) {

        searchResult.innerHTML =
        `❌ The .${extension} registry does not exist.`;

        return;

    }


    const extensionData = extensionSnap.data();


    // Check if the full domain is already registered

    const domainRef = doc(
        db,
        "domains",
        domain
    );


    const domainSnap = await getDoc(domainRef);


    if (domainSnap.exists()) {

        const domainData = domainSnap.data();

        searchResult.innerHTML = `
            ❌ <b>${domain}</b> is already registered.<br>
            Owner: ${domainData.owner || "Unknown"}
        `;

    } else {

        searchResult.innerHTML = `
            ✅ <b>${domain}</b> is available!<br>
            Registry: .${extension}<br>
            Policy: ${extensionData.policy}
        `;

    }

});
