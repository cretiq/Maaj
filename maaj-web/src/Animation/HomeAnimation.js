import anime from 'animejs';

const getEl = (element, getAllElements) => {
    return getAllElements ? document.querySelectorAll(element) : document.querySelector(element);
};

export const setHomeAnimation = () => {

    const calendarBalls = getEl('.blobs', true);
    const pointTablePlayerPoints = getEl('.bubbles', true);

    // PLAYERS, POINTS AND CALENDAR

    calendarBalls.forEach(blob => {
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
    });

    pointTablePlayerPoints.forEach(point => {
        console.log(point);
        point.addEventListener('mouseenter', () => {
            anime({
                targets: point,
                scale: [1.2],
                duration: 200,
            })
        });
        point.addEventListener('mouseleave', () => {
            anime({
                targets: point,
                scale: [1.0],
                duration: 200,
            })
        })
    })
};

export const setInitialHomeAnimation = () => {

    const mainTextHello = getEl('#main-text-original', false);
    const mainTextLight = getEl('#main-text-light', false);
    const mainTextTopBorder = getEl('.top-border', false);
    const MAAJ = getEl('.maaj-square');
    const chinese = getEl('.chinese-simplified > span', false);
    console.log(chinese);

    const textArr = chinese.splitText(3);
    console.log(textArr)

    const tl = anime.timeline({});
    tl.add({
        targets: mainTextTopBorder,
        translateY: ['-100px', '210px'],
        delay: 100,
        duration: 800,
        easing: 'cubicBezier(0,.9,0,.99)',
    });
    tl.add({
        targets: mainTextTopBorder,
        scaleX: 140,
        duration: 1500,
        easing: 'cubicBezier(0,.9,.18,1)',
    });
    tl.add({
        targets: mainTextHello,
        opacity: [0, 1],
        duration: 1500,
        easing: 'linear'
    }, '');
    tl.add({
        targets: mainTextLight,
        opacity: 1,
        delay: 2000,
        duration: 1000,
        easing: 'linear'
    }, '');
};
