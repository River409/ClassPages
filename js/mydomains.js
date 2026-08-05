import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const container = document.getElementById("myDomains");

onAuthStateChanged(auth, async (user) => {

    if (!container) return;

    if (!user) {

        container.innerHTML = "Please log in.";

        return;

    }

    container.innerHTML = "Loading...";

    const snapshot = await getDocs(collection(db, "domains"));

    let html = "";

    snapshot.forEach(docSnap => {

        const data = docSnap.data();

        if (data.ownerUid === user.uid) {

            html += `
                <div style="margin-bottom:10px;">

                    🌐 <b>${data.domain}</b>

                    <br>

                    <button
                        class="button editSiteButton"
                        data-domain="${data.domain}">

                        Edit Website

                    </button>

                </div>
            `;

        }

    });

    if (html === "") {

        html = "You don't own any domains yet.";

    }

    container.innerHTML = html;

    document
        .querySelectorAll(".editSiteButton")
        .forEach(button => {

            button.onclick = () => {

                const domain = button.dataset.domain;

                window.location.href =
                    `editor.html?domain=${encodeURIComponent(domain)}`;

            };

        });

});
