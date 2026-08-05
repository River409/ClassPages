import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const container = document.getElementById("communitySites");


const snapshot = await getDocs(
    collection(db, "domains")
);


let html = "";


snapshot.forEach(docSnap => {

    const data = docSnap.data();


    html += `

    <div style="margin-bottom:15px">

        🌐 <b>${data.domain}</b>

        <br><br>

        <button class="button"
        onclick="window.location.href='site.html?domain=${data.domain}'">

        Visit Website

        </button>

    </div>

    `;

});


if(html === ""){

    html = "No websites yet.";

}


container.innerHTML = html;
