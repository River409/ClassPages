import { db, auth } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const htmlButton =
document.getElementById("htmlButton");


const preview =
document.getElementById("preview");


let extraContent = "";

let currentUser = null;

let currentDomain = null;



// GET DOMAIN FROM URL

const params =
new URLSearchParams(
window.location.search
);


currentDomain =
params.get("domain");




// CHECK LOGIN

onAuthStateChanged(auth,(user)=>{

    currentUser = user;

});




// HTML EDITOR BUTTON

htmlButton.onclick = () => {


    window.location.href =
    `editor.html?domain=${encodeURIComponent(currentDomain)}`;


};




// EASY MODE

document
.getElementById("easyButton")
.onclick = () => {


document
.getElementById("builderBox")
.style.display="block";


};




// ADD TEXT

document
.getElementById("addText")
.onclick = () => {


extraContent += `

<p>
New text section
</p>

`;


};




// ADD BUTTON

document
.getElementById("addButton")
.onclick = () => {


extraContent += `

<br>

<button style="
background:#92E81E;
padding:12px 25px;
border:none;
border-radius:10px;
font-weight:bold;
">

Click Me

</button>


<br>

`;


};




// CREATE HTML

function generateHTML(){


const title =
document.getElementById("titleInput").value
|| "My Website";


const description =
document.getElementById("descriptionInput").value
|| "Welcome";



const color =
document.getElementById("themeInput").value;



const font =
document.getElementById("fontSelect").value;



const size =
document.getElementById("sizeInput").value;



const align =
document.getElementById("alignSelect").value;



const style =
document.getElementById("styleSelect").value;



return `

<!DOCTYPE html>

<html>

<head>

<title>${title}</title>


<style>

body{

font-family:${font};

margin:0;

}


.header{

background:${color};

color:white;

padding:40px;

text-align:${align};

font-size:${size}px;

font-weight:${style};

}


.content{

padding:30px;

}


</style>


</head>



<body>



<div class="header">

<h1>

${title}

</h1>


<p>

${description}

</p>


</div>



<div class="content">


${extraContent}


</div>



</body>


</html>

`;

}





// PREVIEW

document
.getElementById("previewButton")
.onclick = () => {


preview.innerHTML =
generateHTML();


};




// SAVE WEBSITE

document
.getElementById("saveButton")
.onclick = async () => {



if(!currentUser){

alert("Please login first");

return;

}



if(!currentDomain){

alert("No domain selected");

return;

}



const html =
generateHTML();



await setDoc(

doc(
db,
"websites",
currentDomain
),

{

ownerUid:
currentUser.uid,


domain:
currentDomain,


html:
html,


updated:
new Date()

}

);



alert(
"Website saved!"
);



};
