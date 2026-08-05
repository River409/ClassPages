import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");

const website = document.getElementById("website");
const userStyle = document.getElementById("userStyle");


if (!domain) {

    website.innerHTML = "❌ No domain selected.";

}
else {

    loadWebsite();

}


async function loadWebsite() {

    try {

        const siteRef = doc(db, "sites", domain);

        const snapshot = await getDoc(siteRef);


        if (!snapshot.exists()) {

            website.innerHTML =
                `
                ❌ Website not found.<br><br>
                ${domain} has not been created yet.
                `;

            return;

        }


        const data = snapshot.data();


        userStyle.innerHTML =
            data.css || "";


        website.innerHTML =
            data.html || "<p>This website is empty.</p>";


    }

    catch(error) {

        console.error(error);

        website.innerHTML =
            "❌ Error loading website.";

    }

}
