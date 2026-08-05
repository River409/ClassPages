const easyMode =
document.getElementById("easyMode");


const htmlMode =
document.getElementById("htmlMode");


const easyBuilder =
document.getElementById("easyBuilder");


const preview =
document.getElementById("preview");



htmlMode.onclick = () => {

    window.location.href =
    "editor.html";

};



easyMode.onclick = () => {

    easyBuilder.style.display="block";

};





document
.getElementById("previewButton")
.onclick = () => {


const title =
document.getElementById("siteTitle").value;


const tagline =
document.getElementById("siteTagline").value;


const about =
document.getElementById("siteAbout").value;


const color =
document.getElementById("siteColor").value;



preview.innerHTML = `


<div style="
background:${color};
padding:30px;
color:white;
font-family:Arial;
">


<h1>
${title}
</h1>


<p>
${tagline}
</p>


</div>



<div style="
background:white;
padding:20px;
font-family:Arial;
">


<h2>
About
</h2>


<p>
${about}
</p>


</div>


`;


};
