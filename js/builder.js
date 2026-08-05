import { db, auth } from "./firebase.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



let extraContent = "";

let currentUser = null;



const params =
new URLSearchParams(
window.location.search
);


const currentDomain =
params.get("domain");





onAuthStateChanged(auth,(user)=>{

currentUser = user;

});





document
.getElementById("htmlButton")
.onclick = () => {


window.location.href =
`editor.html?domain=${encodeURIComponent(currentDomain)}`;


};






document
.getElementById("easyButton")
.onclick = () => {


document
.getElementById("builderBox")
.style.display="block";


};







document
.getElementById("addText")
.onclick = () => {


extraContent += `

<p>

New text section

</p>

`;


};







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







document
.getElementById("addImage")
.onclick = () => {



const url =
document
.getElementById("imageInput")
.value;



if(!url){

alert("Paste an image link first");

return;

}




extraContent += `


<div style="text-align:center;margin:20px;">


<img src="${url}"

style="

max-width:90%;

border-radius:10px;

box-shadow:0 3px 8px #777;

">


</div>


`;



};









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

margin:0;

font-family:${font};

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








document
.getElementById("previewButton")
.onclick = () => {


document
.getElementById("preview")
.innerHTML =
generateHTML();


};








document
.getElementById("saveButton")
.onclick = async () => {



if(!currentUser){

alert("Login first");

return;

}



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
generateHTML(),


updated:
new Date()

}

);



alert("Website saved!");



};
