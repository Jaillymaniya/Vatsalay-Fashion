document.addEventListener("DOMContentLoaded", function () {

    const footerContainer = document.getElementById("site-footer");

    if (!footerContainer) return;

    const footerPath = window.location.pathname.includes("/pages/")
        ? "../components/footer.html"
        : "components/footer.html";

    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer file could not be loaded.");
            }

            return response.text();
        })
        .then(data => {

            footerContainer.innerHTML = data;

            // Scroll to top button
            const scrollTopBtn = document.getElementById("scrollTopBtn");

            if (scrollTopBtn) {

                scrollTopBtn.addEventListener("click", function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                });

            }

        })
        .catch(error => {
            console.error("Footer loading error:", error);
        });

});