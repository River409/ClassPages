import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const container =
document.getElementById("communitySites");

const sitesPerPage = 8;

let currentPage = 1;

const websites = [];

const snapshot = await getDocs(
    collection(db, "domains")
);

snapshot.forEach(docSnap => {

    websites.push(docSnap.data());

});

function renderPage(){

    if(websites.length === 0){

        container.innerHTML = "No websites yet.";

        return;

    }

    const totalPages =
    Math.ceil(websites.length / sitesPerPage);

    const start =
    (currentPage - 1) * sitesPerPage;

    const end =
    start + sitesPerPage;

    let html = `

    <div class="communityGrid">

    `;

    websites
    .slice(start,end)
    .forEach(site=>{

        html += `

        <div class="communityCard">

            <div class="communityIcon">

                🌐

            </div>

            <h3>

                ${site.domain}

            </h3>

            <button
                class="button"
                onclick="window.location.href='site.html?domain=${site.domain}'">

                Visit Website

            </button>

        </div>

        `;

    });

    html += "</div>";

    html += `

    <div class="pagination">

        <button
            class="button"
            id="prevPage"
            ${currentPage===1?"disabled":""}>

            ◀ Previous

        </button>

        <span>

            Page ${currentPage} of ${totalPages}

        </span>

        <button
            class="button"
            id="nextPage"
            ${currentPage===totalPages?"disabled":""}>

            Next ▶

        </button>

    </div>

    `;

    container.innerHTML = html;

    document
    .getElementById("prevPage")
    .onclick=()=>{

        if(currentPage>1){

            currentPage--;

            renderPage();

        }

    };

    document
    .getElementById("nextPage")
    .onclick=()=>{

        if(currentPage<totalPages){

            currentPage++;

            renderPage();

        }

    };

}

renderPage();
