import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const container = document.getElementById("myDomains");


console.log("mydomains.js loaded");



onAuthStateChanged(auth, async (user) => {


    console.log("Auth state changed:", user);



    if (!container) {

        console.log("myDomains container not found");

        return;

    }



    if (!user) {

        container.innerHTML = "Please log in.";

        return;

    }



    container.innerHTML = "Loading...";



    try {


        const snapshot = await getDocs(
            collection(db, "domains")
        );


        let html = "";



        snapshot.forEach(docSnap => {


            const data = docSnap.data();



            console.log(data);



            if (data.ownerUid === user.uid) {


                html += `

                <div style="margin-bottom:10px">

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


            html =
            "You don't own any domains yet.";


        }



        container.innerHTML = html;





        document
        .querySelectorAll(".editSiteButton")
        .forEach(button => {



            button.onclick = () => {



                const domain =
                button.dataset.domain;



                console.log(
                    "Opening builder for:",
                    domain
                );



                window.location.href =
                `builder.html?domain=${encodeURIComponent(domain)}`;



            };



        });



    } catch(error) {


        console.error(
            "Error loading domains:",
            error
        );


        container.innerHTML =
        "Error loading domains.";


    }



});
