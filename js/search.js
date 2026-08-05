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

    if (!domain.includes(".")) {
        searchResult.innerHTML = "❌ Invalid domain.";
        return;
    }


    const parts = domain.split(".");

    const extension = parts[1];


    // Check if extension exists

    const extensionRef = doc(
        db,
        "extensions",
        extension
    );

    const extensionSnap = await getDoc(extensionRef);


    if (!extensionSnap.exists()) {

        searchResult.innerHTML =
        `❌ .${extension} is not a valid registry.`;

        return;

    }


    // Check if domain is registered

    const domainRef = doc(
        db,
        "domains",
        domain
    );


    const domainSnap = await getDoc(domainRef);


    if (domainSnap.exists()) {

        searchResult.innerHTML =
        `❌ ${domain} is already registered.`;

    } else {

        searchResult.innerHTML =
        `✅ ${domain} is available!`;

    }

});
