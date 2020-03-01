import anime from 'animejs';

const getEl = (element, getAllElements) => {
    return getAllElements ? document.querySelectorAll(element) : document.querySelector(element);
};

export const setHomeAnimation = () => {


    document.body.style.background = "#383838";

    const blobs = getEl('.blobs', true);
    const mainTextHello = getEl('#main-text-original');
    const mainTextLight = getEl('#main-text-light');

    const tl = anime.timeline({});
    tl.add({
        targets: mainTextHello,
        translateY: ['30px', '-70px'],
        opacity: 1,
        duration: 1200,
        easing: 'cubicBezier(0,.97,.05,.99)'
    });
    tl.add({
        targets: mainTextLight,
        opacity: 1,
        translateX: ['-120px', '0px'],
        duration: 1000,
        easing: 'cubicBezier(0,.97,.05,.99)'
    }, '-=1000');

    blobs.forEach(blob => {
        blob.addEventListener('mouseenter', () => {
            anime({
                targets: blob,
                scale: [1.2],
                duration: 200,
            })
        });
        blob.addEventListener('mouseleave', () => {
            anime({
                targets: blob,
                scale: [1.0],
                duration: 200,
            })
        })
    })
};

