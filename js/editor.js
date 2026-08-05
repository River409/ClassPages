const params = new URLSearchParams(window.location.search);

const domain = params.get("domain");

const title = document.getElementById("domainTitle");

if (!domain) {

    title.innerHTML = "No domain selected.";

} else {

    title.innerHTML = "Editing " + domain;

}

console.log(domain);
