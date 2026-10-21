"use strict";

console.log("Brightline Studio JavaScript is connected!");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

function setMenuOpen(open) {
    menuButton.setAttribute("aria-expanded", String(open));

    menuButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
    );

    navigation.classList.toggle("is-open", open);
}

menuButton.addEventListener("click", () => {
    setMenuOpen(
        menuButton.getAttribute("aria-expanded") !== "true"
    );
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
});
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) =>
        item.classList.add("is-visible")
    );
}

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

// Replace this with your WhatsApp number.
// Kenya example: 2547143276657 (no +, spaces, or dashes)
const whatsappNumber = "254143276657";

if (form && status) {
    const validators = {
        name(value) {
            return value.trim().length >= 2
                ? ""
                : "Please enter at least 2 characters.";
        },

        email(value) {
            const input = form.elements.email;

            if (!value.trim()) {
                return "Please enter your email address.";
            }

            return input.validity.typeMismatch
                ? "Enter a valid email address."
                : "";
        },

        message(value) {
            return value.trim().length >= 10
                ? ""
                : "Please add at least 10 characters about your project.";
        },

        consent() {
            return form.elements.consent.checked
                ? ""
                : "Please agree before sending your enquiry.";
        }
    };

    function showError(fieldName, message) {
        const field = form.elements[fieldName];
        const error = document.querySelector(`#${fieldName}-error`);

        if (field && error) {
            field.setAttribute(
                "aria-invalid",
                message ? "true" : "false"
            );
            error.textContent = message;
        }

        return !message;
    }

    function validateField(fieldName) {
        const field = form.elements[fieldName];
        const validator = validators[fieldName];

        if (!field || !validator) {
            return false;
        }

        const message =
            fieldName === "consent"
                ? validator()
                : validator(field.value);

        return showError(fieldName, message);
    }

    ["name", "email", "message"].forEach((fieldName) => {
        const field = form.elements[fieldName];

        field.addEventListener("blur", () => {
            validateField(fieldName);
        });

        field.addEventListener("input", () => {
            if (field.hasAttribute("aria-invalid")) {
                validateField(fieldName);
            }
            status.textContent = "";
        });
    });

    form.elements.consent.addEventListener("change", () => {
        validateField("consent");
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        status.textContent = "";

        const requiredFields = [
            "name",
            "email",
            "message",
            "consent"
        ];

        const valid = requiredFields
            .map(validateField)
            .every(Boolean);

        if (!valid) {
            status.textContent =
                "Please check the highlighted fields and try again.";

            form.querySelector('[aria-invalid="true"]')?.focus();
            return;
        }

    
if (!whatsappNumber) {
    status.textContent =
        "Please add your real WhatsApp number in the JavaScript file.";
    return;
}

        }

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();

        const enquiry =
            "Brightline Studio Website Enquiry\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Enquiry: " + message;

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber.replace(/\D/g, "") +
            "?text=" +
            encodeURIComponent(enquiry);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        status.textContent =
            "WhatsApp opened. Please press Send in WhatsApp to deliver your enquiry.";
    });
}
(() => {
    "use strict";

    // 1. Mobile navigation
    // 2. Scroll reveal animations
    // 3. Contact form validation
    // 4. Automatic copyright year

})();
