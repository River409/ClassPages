import { db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");

const saveButton = document.getElementById("saveButton");

const htmlEditor = document.getElementById("htmlEditor");

const cssEditor = document.getElementById("cssEditor");

saveButton.addEventListener("click", async () => {

    await setDoc(

        doc(db, "sites", domain),

        {

            html: htmlEditor.value,

            css: cssEditor.value,

            updatedAt: new Date().toISOString()

        }

    );

    alert("Website saved!");

});
