const htmlButton =
document.getElementById("htmlButton");

const easyButton =
document.getElementById("easyButton");


const preview =
document.getElementById("preview");


let extraContent = "";




// =====================
// HTML EDITOR BUTTON
// =====================

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




// =====================
// EASY BUILDER BUTTON
// =====================

easyButton.onclick = () => {

    document.getElementById("builderBox")
    .style.display = "block";

};




// =====================
// ADD TEXT
// =====================

document
.getElementById("addText")
.onclick = () => {


    extraContent += `

    <p>
    New text section
    </p>

    `;


};




// =====================
// ADD BUTTON
// =====================

document
.getElementById("addButton")
.onclick = () => {


    extraContent += `

    <button style="
        background:#92E81E;
        color:black;
        padding:12px 25px;
        border:none;
        border-radius:10px;
        font-weight:bold;
        cursor:pointer;
    ">

    Click Me

    </button>

    <br><br>

    `;


};




// =====================
// LIVE PREVIEW
// =====================

document
.getElementById("previewButton")
.onclick = () => {



const title =
document.getElementById("titleInput").value;



const description =
document.getElementById("descriptionInput").value;



const theme =
document.getElementById("themeInput").value;



const font =
document.getElementById("fontSelect")
? document.getElementById("fontSelect").value
: "Arial";



const size =
document.getElementById("sizeInput")
? document.getElementById("sizeInput").value
: "32";



const align =
document.getElementById("alignSelect")
? document.getElementById("alignSelect").value
: "center";



const style =
document.getElementById("styleSelect")
? document.getElementById("styleSelect").value
: "normal";




preview.innerHTML = `


<div style="

background:${theme};

padding:40px;

color:white;

font-family:${font};

text-align:${align};

font-size:${size}px;

font-weight:${style === "bold" ? "bold":"normal"};

font-style:${style === "italic" ? "italic":"normal"};

border-radius:10px;

box-shadow:0 3px 10px #555;

">


<h1>

${title || "My Website"}

</h1>


<p>

${description || "Welcome to my website"}

</p>


</div>



<div style="

background:white;

padding:30px;

font-family:${font};

text-align:${align};

">


${extraContent}


</div>


`;



};
