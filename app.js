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
    const headerObserver = new IntersectionObserver(entry => {
        !entry[0].isIntersecting ? header.classList.add('scrolled') : header.classList.remove('scrolled');
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

    const from_name = document.getElementById('name');
    const reply_to = document.getElementById('email');
    const message = document.getElementById('message');

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

    (function() {
        emailjs.init("user_GiEJaeXXJLtqsyGtlxZyd");
    })();

    document.querySelector('form').addEventListener('submit', (e) => {
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

        const sendButton = e.target.querySelector('button');
        sendButton.className = "sending";
        sendButton.textContent = "Sending";
        const checkIcon = sendButton.getAttribute('data-check')

        reply_to.value = '';
        message.value = '';
        from_name.value = '';

        emailjs.send("service_5r0rlgk", "template_c7rtf6r", templateParams)
            .then(() => {
                sendButton.className = "sent";
                sendButton.textContent = `Sent ${checkIcon}`;
                setTimeout(() => {
                    sendButton.className = "";
                    sendButton.textContent = "Send";
                }, 3000);
            }, () => {
                sendButton.className = "not-sent";
                sendButton.textContent = "Unable to send message";
                setTimeout(() => {
                    sendButton.className = "";
                    sendButton.textContent = "Send";
                }, 3000);
            });
    });