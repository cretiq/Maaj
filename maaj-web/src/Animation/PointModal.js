import anime from "animejs";

const getEl = (element, getAllElements) => {
    return getAllElements ? document.querySelectorAll(element) : document.querySelector(element);
};

export const openModalAnimation = () => {
    const modal = getEl('.point-modal', false);

    console.log(modal);
    anime({
        targets: modal,
        scale: [0, 1],
        duration: 700,
    })
};
export const closeModalAnimation = () => {
    const modal = getEl('.point-modal', false);

    console.log(modal);
    anime({
        targets: modal,
        scale: [1, 0],
        duration: 700,
    })
};
