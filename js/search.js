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


let extensions = {};


async function loadExtensions() {

    const response = await fetch("data/extensions.json");

    extensions = await response.json();

}


if (searchButton) {


    searchButton.addEventListener("click", async () => {


        const domain = searchInput.value.trim().toLowerCase();


        if (!domain.includes(".")) {

            searchResult.innerHTML =
                "❌ Invalid domain.";

            return;

        }


        const parts = domain.split(".");


        if (parts.length !== 2) {

            searchResult.innerHTML =
                "❌ Invalid domain format.";

            return;

        }


        const extension = parts[1];


        try {


            const extensionRef =
                doc(db, "extensions", extension);


            const extensionSnap =
                await getDoc(extensionRef);



            if (!extensionSnap.exists()) {

                searchResult.innerHTML =
                    `❌ The .${extension} registry does not exist.`;

                return;

            }



            const extensionData =
                extensionSnap.data();



            const domainRef =
                doc(db, "domains", domain);


            const domainSnap =
                await getDoc(domainRef);



            if (domainSnap.exists()) {


                const data =
                    domainSnap.data();


                searchResult.innerHTML =
                `
                ❌ <b>${domain}</b> is already registered.
                <br>
                Owner: ${data.ownerEmail || "Unknown"}
                `;


                if(registerButton)
                    registerButton.style.display = "none";


            } else {


                searchResult.innerHTML =
                `
                ✅ <b>${domain}</b> is available!
                <br>
                Registry: .${extension}
                <br>
                Policy: ${extensionData.policy}
                `;


                setCurrentDomain(domain);


                if(registerButton)
                    registerButton.style.display = "inline-block";


            }


        } catch(error) {


            console.error(error);

            searchResult.innerHTML =
                "❌ Firebase error.";

        }


    });


}


loadExtensions();
