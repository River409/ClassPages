const htmlButton =
document.getElementById("htmlButton");


const easyButton =
document.getElementById("easyButton");



const preview =
document.getElementById("preview");



let extraContent = "";




// HTML EDITOR BUTTON

htmlButton.onclick = () => {


const params =
new URLSearchParams(
window.location.search
);


const domain =
params.get("domain");



window.location.href =
`editor.html?domain=${encodeURIComponent(domain)}`;


};





easyButton.onclick = () => {

document.getElementById("builderBox")
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

<button class="button">

Click Me

</button>

<br><br>

`;


};







document
.getElementById("previewButton")
.onclick = () => {



const title =
document.getElementById("titleInput").value;



const description =
document.getElementById("descriptionInput").value;



const theme =
document.getElementById("themeInput").value;




preview.innerHTML = `


<div style="
background:${theme};
padding:30px;
color:white;
font-family:Arial;
">


<h1>
${title}
</h1>


<p>
${description}
</p>


</div>



<div style="
background:white;
padding:20px;
">


${extraContent}


</div>


`;



};
