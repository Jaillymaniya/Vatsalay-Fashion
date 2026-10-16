
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("vfContactForm");
    const formStatus = document.getElementById("vfFormStatus");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        // Replace this with the business WhatsApp number.
        // Use country code + number, digits only.
        const whatsappNumber = "918490976451";

        if (!/^91\d{10}$/.test(whatsappNumber)) {
            formStatus.textContent =
                "Please configure the business WhatsApp number in contact.js.";
            return;
        }

        const formData = new FormData(contactForm);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const phone = formData.get("phone").trim();
        const subject = formData.get("subject");
        const message = formData.get("message").trim();

        const whatsappMessage = [
            "Hello Vatsalay Fashion!",
            "",
            "I would like to make an inquiry.",
            "",
            "Name: " + name,
            "Email: " + email,
            "Phone: " + (phone || "Not provided"),
            "Inquiry Type: " + subject,
            "",
            "Message:",
            message
        ].join("\n");

        const whatsappURL =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        formStatus.textContent =
            "WhatsApp opened. Review your message and press Send there.";
    });
});
