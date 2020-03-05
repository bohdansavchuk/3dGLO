const togglePhoto = () => {
    const comandPhoto = document.querySelectorAll('.command__photo');

    comandPhoto.forEach((item) => {
        let source;
        item.addEventListener('mouseover', (event) => {
            source = event.target.src;
            event.target.src = event.target.dataset.img;
        });
        item.addEventListener('mouseout', (event) => {
            event.target.src = source;
        });
    });
};

export default togglePhoto;