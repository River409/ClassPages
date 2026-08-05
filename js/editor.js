import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");

const title = document.getElementById("domainTitle");

const htmlEditor = document.getElementById("htmlEditor");

const cssEditor = document.getElementById("cssEditor");

const saveButton = document.getElementById("saveButton");

if(!domain){

    title.innerHTML = "No domain selected.";

    throw new Error("No domain");

}

title.innerHTML = "Editing " + domain;

async function loadSite(){

    try{

        const snap = await getDoc(
            doc(db,"sites",domain)
        );

        if(snap.exists()){

            const data = snap.data();

            htmlEditor.value = data.html || "";

            cssEditor.value = data.css || "";

        }

    }catch(error){

        console.error(error);

    }

}

saveButton.addEventListener("click", async()=>{

    try{

        await setDoc(

            doc(db,"sites",domain),

            {

                html: htmlEditor.value,

                css: cssEditor.value,

                updatedAt: new Date().toISOString()

            }

        );

        alert("Website saved!");

    }catch(error){

        console.error(error);

        alert(error.message);

    }

});

loadSite();
