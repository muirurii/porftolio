//Call to action

document.querySelector(".action").addEventListener("click", () => {
    const contactDistance = document.getElementById("contacts").offsetTop;
    window.scrollTo(0, contactDistance);
    document.querySelectorAll("input")[0].focus();
});

//Small menu

const menu = document.querySelector(".small-menu");
const hamburger = document.querySelector(".hamb");
let isMenuOpen = false;

const toggleMenu = () => {
    if (!isMenuOpen) {
        menu.classList.add("show");
        hamburger.classList.add("closed");
    } else {
        menu.classList.remove("show");
        hamburger.classList.remove("closed");
    }
    isMenuOpen = !isMenuOpen;
};

hamburger.addEventListener("click", (e) => {
    toggleMenu();
});

menu.addEventListener("click", toggleMenu);

// Hide header on scroll down

const header = document.querySelector("header");
const bubble = document.querySelector(".bubble");

let prevScrollPos = window.pageYOffset;
const headerBottom = header.offsetTop + header.offsetHeight;
let scrollTimeout;

const handleOnScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const currentScrollPos = window.pageYOffset;
        const isInHomeView = currentScrollPos < 300;
        const hasScrolledUp = prevScrollPos + 20 > currentScrollPos;
        bubble.className = !isInHomeView ? "showing bubble" : "bubble";
        header.className =
            hasScrolledUp || isInHomeView || isMenuOpen ? "scrolled" : "";
        prevScrollPos = currentScrollPos;
    }, 100);
};

window.addEventListener("scroll", handleOnScroll);

//Bubble scroll

const about = document.getElementById("about");

bubble.addEventListener("click", () => {
    const toAbout = about.offsetTop;
    window.scrollTo(0, toAbout);
});

//Loader
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".document").style.display = "block";
    document.querySelector(".container").style.display = "none";
});

//Email form
const form = document.querySelector("form");
const from_name = document.getElementById("name");
const reply_to = document.getElementById("email");
const message = document.getElementById("message");
const sendButton = document.querySelector(".submit");
const notificationContainer = document.querySelector(".notification-container");

//Notifications

const toggleNotification = (element) => {
    element.classList.add("animate-hide");

    const isElementActive = Array.from(notificationContainer.childNodes).some(
        (node) => node === element
    );
    if (!isElementActive) return;
    setTimeout(() => {
        notificationContainer.removeChild(element);
    }, 350);
};

const closeNotification = (e) => {
    if (!e.target.classList.contains("close-not")) return;
    toggleNotification(e.target.parentElement);
};

notificationContainer.addEventListener("click", closeNotification);

const addNotification = (text, type) => {
    const last = Array.from(
        notificationContainer.querySelectorAll(".notification")
    )[0];

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `<p>${text}</p><button class="close-not">x</button>`;

    if (!last || last.classList.contains("animate-hide")) {
        notificationContainer.appendChild(notification);
    } else {
        notificationContainer.insertBefore(notification, last);
    }
    setTimeout(() => toggleNotification(notification), 8000);
};

//Send Mail

const setSending = (value) => {
    value
        ?
        sendButton.classList.add("sending") :
        sendButton.classList.remove("sending");
};

const validateTexts = (element, notify) => {
    if (element.value.trim().length < 3) {
        element.parentElement.classList.remove("error");
        setTimeout(() => {
            element.parentElement.classList.add("error");
        }, 50);
        notify && addNotification(`Please enter a valid ${element.id}`, "error");
        return false;
    } else {
        element.parentElement.classList.remove("error");
        return true;
    }
};

const validateEmail = (element, notify) => {
    const regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(element.value)) {
        element.parentElement.classList.remove("error");
        setTimeout(() => {
            element.parentElement.classList.add("error");
        }, 50);
        notify && addNotification("Please enter a valid email", "error");
        return false;
    } else {
        element.parentElement.classList.remove("error");
        return true;
    }
};

let keyDownTimeout;

const handleInput = (e) => {
    clearTimeout(keyDownTimeout);
    keyDownTimeout = setTimeout(() => {
        e.target.id === "email" ?
            validateEmail(e.target, false) :
            validateTexts(e.target, false);
    }, 500);
};

from_name.addEventListener("keyup", handleInput);
reply_to.addEventListener("keyup", handleInput);
message.addEventListener("keyup", handleInput);

(function() {
    emailjs.init("user_GiEJaeXXJLtqsyGtlxZyd");
})();

const clearFields = () => {
    reply_to.value = "";
    message.value = "";
    from_name.value = "";
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkEmail = validateEmail(reply_to, true);
    const checkMessage = validateTexts(message, true);
    const validateName = validateTexts(from_name, true);
    if (!checkEmail || !checkMessage || !validateName) return;

    const templateParams = {
        from_name: from_name.value,
        message: message.value,
        reply_to: reply_to.value,
        to_name: "Peter",
    };

    setSending(true);

    emailjs.send("service_5r0rlgk", "template_c7rtf6r", templateParams).then(
        () => {
            addNotification("Your message was sent successfully", "success");
            clearFields();
            setSending(false);
        },
        () => {
            addNotification("Message not sent! Try again", "error");
            setSending(false);
        }
    );
});