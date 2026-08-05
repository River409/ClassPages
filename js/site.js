const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");

document.getElementById("website").innerHTML =
    "<h1>" + domain + "</h1><p>Site loading...</p>";
