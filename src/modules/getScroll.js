const getScroll =() => {

    const menuLinks = document.querySelectorAll('menu > ul > li > a'),
    mainBtn = document.querySelector('[href="#service-block"]');        

    const scroll = (elem) => {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            
            const blockID = elem.getAttribute('href');

            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    menuLinks.forEach((item) => {
    scroll(item);
    });

    scroll(mainBtn);

};

export default getScroll;