const visitInput = document.getElementById("visitDomain");
const visitButton = document.getElementById("visitButton");
const siteFrame = document.getElementById("siteFrame");

if (visitButton) {

    visitButton.addEventListener("click", () => {

        const domain = visitInput.value.trim().toLowerCase();

        if (!domain) {

            alert("Enter a domain.");

            return;

        }

        siteFrame.src =
            `site.html?domain=${encodeURIComponent(domain)}`;

    });

}
