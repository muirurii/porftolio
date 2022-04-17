    //Loader
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.document').style.display = "block";
        document.querySelector('.container').style.display = "none";
    });

    //Call to action

    document.querySelector('.action').addEventListener('click', () => {
        const contactDistance = document.getElementById('contacts').offsetTop;
        window.scrollTo(0, contactDistance);
        document.querySelectorAll('input')[0].focus();
    });
    //Header

    const header = document.querySelector('header');
    const mark = document.querySelector('.mark');
    const bubble = document.querySelector('.bubble');

    const headerObserver = new IntersectionObserver(entry => {
        header.className = !entry[0].isIntersecting ? 'scrolled' : '';
        bubble.className = !entry[0].isIntersecting ? 'action bubble' : 'bubble';
    });

    headerObserver.observe(mark);

    //Small menu

    const menu = document.querySelector('.small-menu');
    const hamburger = document.querySelector('.hamb');

    const closeMenu = () => {
        menu.classList.remove('show');
        hamburger.classList.remove('closed');
    }

    hamburger.addEventListener('click', (e) => {
        if (e.target.classList.contains('closed')) {
            closeMenu();
        } else {
            menu.classList.add('show');
            e.target.classList.add('closed');
        }
    });

    //close menu on link click 

    menu.querySelectorAll('a').forEach(li => {
        li.addEventListener('click', closeMenu);
    })

    //AOS LIBRARY
    AOS.init({
        offset: 200,
        duration: 800,
        delay: 50,
        easing: "ease-in-out",
        mirror: true
    });

    //Send Mail
    const form = document.querySelector('form');
    const from_name = document.getElementById('name');
    const reply_to = document.getElementById('email');
    const message = document.getElementById('message');
    const sendButton = document.querySelector('.submit');
    const notificationEl = document.querySelector('.notification');

    const validateTexts = (element) => {
        if (element.value.trim().length < 3) {
            element.parentElement.classList.add('error');
            return false;
        } else {
            element.parentElement.classList.remove('error');
            return true;
        }
    }

    const validateEmail = (element) => {
        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(element.value)) {
            element.parentElement.classList.add('error');
            return false;
        } else {
            element.parentElement.classList.remove('error');
            return true;
        }
    }

    const notify = (message, type) => {

        const recent = document.querySelector('.notification');
        recent && form.removeChild(recent);
        const notificationEl = document.createElement('p');
        notificationEl.className = `notification notify ${type}`;
        notificationEl.textContent = message;

        const firstLabel = form.querySelector('.first-label');
        form.insertBefore(notificationEl, firstLabel);


        if (type === 'sending') return sendButton.setAttribute('disabled', true);
        sendButton.removeAttribute('disabled');

        setTimeout(() => {
            form.removeChild(notificationEl);
        }, 4000);
    }

    (function() {
        emailjs.init("user_GiEJaeXXJLtqsyGtlxZyd");
    })();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const checkEmail = validateEmail(reply_to);
        const checkMessage = validateTexts(message);
        const validateName = validateTexts(from_name);

        if (!checkEmail || !checkMessage || !validateName) return;

        const templateParams = {
            from_name: from_name.value,
            message: message.value,
            reply_to: reply_to.value,
            to_name: "Peter"
        };

        const clearFields = () => {
            reply_to.value = '';
            message.value = '';
            from_name.value = '';
        }

        notify('Sending', 'sending');

        emailjs.send("service_5r0rlgk", "template_c7rtf6r", templateParams)
            .then(() => {
                notify('Message Sent', 'sent');
                clearFields();
            }, () => {
                notify('Message not sent! Try again.', 'not-sent');
            });
    });