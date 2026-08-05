const searchInput = document.getElementById("domainSearch");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");

let extensions = {};

async function loadExtensions() {
    const response = await fetch("data/extensions.json");
    extensions = await response.json();
}

searchButton.addEventListener("click", () => {

    const domain = searchInput.value.trim().toLowerCase();

    if (!domain.includes(".")) {
        searchResult.innerHTML = "❌ Invalid domain.";
        return;
    }

    const extension = domain.split(".")[1];

    if (extensions[extension]) {

        if (extensions[extension].policy === "open") {

            searchResult.innerHTML =
                `✅ ${domain} is available.<br>
                 Registry: ${extension.toUpperCase()}<br>
                 Policy: Open`;

        } else {

            searchResult.innerHTML =
                `🔒 ${extension.toUpperCase()} is a private registry.`;

        }

    } else {

        searchResult.innerHTML =
            "❌ That registry does not exist.";

    }

});

loadExtensions();
