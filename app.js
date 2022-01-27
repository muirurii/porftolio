    //AOS LIBRARY
    AOS.init({
        offset: 200,
        duration: 800,
        easing: "ease-in-out",
        mirror: true
    });

    //Hero text animation
    const allTexts = document.querySelectorAll('.texts p');

    const rotateTexts = () => {
        const active = document.querySelector('.active');
        active.classList.remove('active');
        active.nextElementSibling ? active.nextElementSibling.classList.add('active') : allTexts[0].classList.add('active');
    }
    setInterval(() => rotateTexts(), 3000);

    //Send Mail


    const from_name = document.getElementById('name');
    const reply_to = document.getElementById('email');
    const message = document.getElementById('message');


    // const validateFunction = () => {
    //     !from_name.value.length ? from_name.parentElement.classList.add('error') : from_name.parentElement.classList.remove('error');
    //     !message.value.length ? message.parentElement.classList.add('error') : message.parentElement.classList.remove('error');
    //     !emailRegex(reply_to.value) ? reply_to.parentElement.classList.add('error') : reply_to.parentElement.classList.remove('error');
    // }
    const validateTexts = (element) => {
        if (!element.value.length) {
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

        var templateParams = {
            from_name: from_name.value,
            message: message.value,
            reply_to: reply_to.value,
            to_name: "Peter"
        };


        // emailjs.send("service_5r0rlgk", "template_c7rtf6r", templateParams)
        //     .then(function(response) {
        //         console.log('SUCCESS!', response.status, response.text);
        //     }, function(error) {
        //         console.log('FAILED...', error);
        //     });
    })