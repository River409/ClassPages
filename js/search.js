console.log("search.js started");

const searchInput = document.getElementById("domainSearch");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");

let extensions = {};

async function loadExtensions() {
    try {
        const response = await fetch("data/extensions.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        extensions = await response.json();

        console.log("Extensions loaded:", extensions);
    } catch (error) {
        console.error("Failed to load extensions.json:", error);
        searchResult.innerHTML = "❌ Failed to load extension database.";
    }
}

searchButton.addEventListener("click", () => {

    console.log("Search button clicked!");

    const domain = searchInput.value.trim().toLowerCase();

    console.log("Domain:", domain);

    if (!domain) {
        searchResult.innerHTML = "❌ Please enter a domain.";
        return;
    }

    if (!domain.includes(".")) {
        searchResult.innerHTML = "❌ Invalid domain format.";
        return;
    }

    const extension = domain.split(".")[1];

    console.log("Extension:", extension);

    if (extensions[extension]) {

        console.log("Registry found:", extensions[extension]);

        if (extensions[extension].policy === "open") {

            searchResult.innerHTML = `
                <b>✅ ${domain}</b><br>
                Registry: .${extension}<br>
                Owner: ${extensions[extension].owner}<br>
                Policy: Open
            `;

        } else {

            searchResult.innerHTML = `
                <b>🔒 ${domain}</b><br>
                Registry: .${extension}<br>
                Owner: ${extensions[extension].owner}<br>
                Policy: Closed
            `;

        }

    } else {

        console.log("Registry does not exist.");

        searchResult.innerHTML = `
            ❌ The registry <b>.${extension}</b> does not exist.
        `;

    }

});

loadExtensions();
