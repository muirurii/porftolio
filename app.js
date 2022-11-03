//Call to action

document.querySelector(".action").addEventListener("click", () => {
    const contactDistance = document.getElementById("contacts").offsetTop;
    window.scrollTo(0, contactDistance);
    document.querySelectorAll("input")[0].focus();
});

//Header

const header = document.querySelector("header");
const mark = document.querySelector(".mark");
const bubble = document.querySelector(".bubble");

const headerObserver = new IntersectionObserver((entry) => {
    header.className = !entry[0].isIntersecting ? "scrolled" : "";
    bubble.className = !entry[0].isIntersecting ? "showing bubble" : "bubble";
});

headerObserver.observe(mark);

//Bubble scroll

const about = document.getElementById("about");

bubble.addEventListener("click", () => {
    const toAbout = about.offsetTop;
    window.scrollTo(0, toAbout);
});

//Small menu

const menu = document.querySelector(".small-menu");
const hamburger = document.querySelector(".hamb");

const closeMenu = () => {
    menu.classList.remove("show");
    hamburger.classList.remove("closed");
};

hamburger.addEventListener("click", (e) => {
    if (e.target.classList.contains("closed")) {
        closeMenu();
    } else {
        menu.classList.add("show");
        e.target.classList.add("closed");
    }
});

//close menu on link click

menu.querySelectorAll("a").forEach((li) => {
    li.addEventListener("click", closeMenu);
});

//Side Menu

const sections = document.querySelectorAll("main>section");
const sideNav = document.querySelector(".side-nav");

const sectionsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.intersectionRect < 400) return;
                const active = document.querySelector(".active");
                const id = entry.target.id;
                const activeNow = sideNav.querySelector(`a[href*="${id}"]`);
                active !== null && active.classList.remove("active");
                activeNow.classList.add("active");
            }
        });
    }, {
        threshold: 0.43,
    }
);

sections.forEach((card) => sectionsObserver.observe(card));

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

const validateTexts = (element) => {
    if (element.value.trim().length < 3) {
        element.parentElement.classList.add("error");
        return false;
    } else {
        element.parentElement.classList.remove("error");
        return true;
    }
};

const validateEmail = (element) => {
    const regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(element.value)) {
        element.parentElement.classList.add("error");
        return false;
    } else {
        element.parentElement.classList.remove("error");
        return true;
    }
};

(function() {
    emailjs.init("user_GiEJaeXXJLtqsyGtlxZyd");
})();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkEmail = validateEmail(reply_to);
    const checkMessage = validateTexts(message);
    const validateName = validateTexts(from_name);
    if (!checkEmail || !checkMessage || !validateName)
        return addNotification("Please fix the errors", "error");

    const templateParams = {
        from_name: from_name.value,
        message: message.value,
        reply_to: reply_to.value,
        to_name: "Peter",
    };

    const clearFields = () => {
        reply_to.value = "";
        message.value = "";
        from_name.value = "";
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

//Loader
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".document").style.display = "block";
    document.querySelector(".container").style.display = "none";
});