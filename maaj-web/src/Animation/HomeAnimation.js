import anime from 'animejs';
import React from "react";
import Splitting from "splitting";

const getEl = (element, getAllElements) => {
    return getAllElements ? document.querySelectorAll(element) : document.querySelector(element);
};

export const setHomeAnimation = () => {

    const monthDots = getEl('.day', true);
    const pointTablePlayerPoints = getEl('.bubbles', true);
    const pointTableBubbles = getEl('.bubbles', true);

    // PLAYERS, POINTS AND CALENDAR

    monthDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            anime({
                targets: dot,
                scale: 1.5,
                duration: 700
            })
        });
        dot.addEventListener('mouseleave', () => {
            anime({
                targets: dot,
                scale: 1,
                duration: 701
            })
        })
    });

    pointTablePlayerPoints.forEach(point => {
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
    anime({
        targets: pointTableBubbles,
        scale: [0, 1], easing: 'easeOutBack', duration: 500,
        delay: anime.stagger(100)
    });
};

export const setInitialHomeAnimation = () => {

    const weekday = getEl('.weekday', true);
    const calCon = getEl('.calendar__container', false);
    const monthDots = getEl('.day', true);

    Splitting({target: '.headline', by: 'chars'});
    Splitting({target: '.lady-text', by: 'chars'});

    let rainBowInverted = [10, 30, 50, 65, 50, -15];

    const headLineTimeLine = anime.timeline({});                       // MAAAAJ INITILIZATION --------------
    headLineTimeLine.add({
        targets: '.headline .char',
        rotate: {
            value: (el, y) => `${-(y - 3) * 10}deg`,
            duration: 100,
        },
        translateY: {
            value: (el, i) => ['-100px', rainBowInverted[i]],
            duration: 500,
            easing: 'easeOutExpo',
        },
        duration: 1000,
        opacity: [0, 1],
        delay: anime.stagger(600)
    });
    headLineTimeLine.add({
        targets: '.headline .char',
        rotate: '0deg',
        translateY: '0px',
        duration: 1000,
        letterSpacing: '-70px',
        easing: 'cubicBezier(0,1,0,1)',
    });
    headLineTimeLine.add({
        targets: '.headline .char',
        letterSpacing: '5px',
        duration: 1000,
        easing: 'cubicBezier(0,1,0,1)',
    }, '-=200');


    headLineTimeLine.finished.then(() => {                           // CALENDAR ---------------------
        calCon.style.visibility = 'visible';
        const calendarAnim = anime.timeline({});
        calendarAnim.add({
            targets: monthDots,
            scale: [
                {value: [0, 1], easing: 'easeOutBack', duration: 500}
            ],
            delay: anime.stagger(200, {grid: [7, 5], from: "center"})
        });
        calendarAnim.add({
            targets: weekday,
            scale: [
                {value: [0, 1], easing: 'easeOutBack', duration: 500}
            ],
            delay: anime.stagger(50),
        }, '-=500');

        anime({
            targets: '.lady-text .char',
            translateY: ['-100px', '100px'],
            duration: 1000,
            easing: 'cubicBezier(0,1,0,1)',
            delay: anime.stagger(200)
        });
        anime({
            targets: '.lady-text',
            opacity: [{ value: 1, duration: 2000, delay: 200 }],
            easing: 'cubicBezier(0,1,0,1)',
            delay: anime.stagger(200),
        });

        calendarAnim.finished.then(() => {                            // MAAAAJ TRANSLATION X Y ----------------------
            let headLineLetters = getEl('.headline .char', true);
            const threeFirst = Object.values(headLineLetters).slice(0, 3);
            const threeLast = Object.values(headLineLetters).slice(3, 6);

            const headLineTimeLineJumping = anime.timeline({loop: true});
            headLineTimeLineJumping.add({
                targets: threeFirst,
                keyframes: [
                    {translateY: -70, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateX: 330, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateY: 70, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateX: 0, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateY: 0, duration: 1000, easing: 'cubicBezier(0,1,0,1)'},
                ],
            });
            headLineTimeLineJumping.add({
                targets: threeLast,
                keyframes: [
                    {translateY: 70, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateX: -330, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateY: -70, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateX: 0, duration: 600, easing: 'cubicBezier(0,1,0,1)'},
                    {translateY: 0, duration: 1000, easing: 'cubicBezier(0,1,0,1)'},
                ],
            }, '0');
            headLineTimeLineJumping.add({
                targets: headLineLetters,
                scale: [
                    {value: 1.3, duration: 400, delay: anime.stagger(100), easing: 'easeOutExpo'},
                ]
            })
            headLineTimeLineJumping.add({
                targets: headLineLetters,
                scale: [
                    {value: 1.0, duration: 400, delay: anime.stagger(100), easing: 'easeOutExpo'},
                ]
            }, '-=250').finished.then(() => {
            });
        })
    });
};
