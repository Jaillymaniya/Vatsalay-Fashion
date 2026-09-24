
document.addEventListener("DOMContentLoaded", async function () {

    const headerContainer = document.getElementById("site-header");

    if (!headerContainer) {
        console.error("Header container #site-header not found.");
        return;
    }

    const isInsidePagesFolder =
        window.location.pathname.includes("/pages/");

    const basePath = isInsidePagesFolder ? "../" : "";

    try {

        const response = await fetch(
            `${basePath}components/header.html`
        );

        if (!response.ok) {
            throw new Error(
                `Header file could not be loaded. Status: ${response.status}`
            );
        }

        let headerHTML = await response.text();

        /* =========================================
           FIX HEADER PATHS
           ========================================= */

        headerHTML = headerHTML.replaceAll(
            'href="index.html"',
            `href="${basePath}index.html"`
        );

        headerHTML = headerHTML.replaceAll(
            'href="pages/',
            `href="${basePath}pages/`
        );

        headerHTML = headerHTML.replaceAll(
            'src="assets/',
            `src="${basePath}assets/`
        );

        headerContainer.innerHTML = headerHTML;


        /* =========================================
           MOBILE MENU
           ========================================= */

        const toggleBtn =
            document.getElementById("mobileMenuToggle");

        const mainNav =
            document.getElementById("mainNav");

        if (!toggleBtn || !mainNav) {
            console.error(
                "Mobile menu button or navigation not found."
            );
            return;
        }


        const icon = toggleBtn.querySelector("i");


        /* =========================================
           OPEN / CLOSE MENU
           ========================================= */

        toggleBtn.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            if (isOpen) {

                /* MENU OPEN → SHOW X */
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                toggleBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } else {

                /* MENU CLOSED → SHOW THREE LINES */
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                toggleBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });


        /* =========================================
           CLOSE MENU AFTER CLICKING NAV LINK
           ========================================= */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                /* Change X back to hamburger */
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                toggleBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    } catch (error) {

        console.error("Header loading error:", error);

        headerContainer.innerHTML = `
            <div style="
                padding:20px;
                text-align:center;
                background:#2C221E;
                color:white;
            ">
                Header could not be loaded.
            </div>
        `;
    }

});