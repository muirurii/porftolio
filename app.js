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

    setInterval(() => rotateTexts(), 3000)