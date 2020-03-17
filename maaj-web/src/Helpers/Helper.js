import React from "react";

let calendar = require('calendar-month-array');
let sprintf = require('sprintf');

export const cal = () => {
    return calendar(new Date(new Date().getFullYear(), new Date().getMonth()), {
        weekStartDay: 0,
        formatHeader: date => date.toString().slice(0, 2),
        formatDate: date => sprintf('%2d', date.getDate()),
        formatSiblingMonthDate: () => ''
    });
};

export const getDateFromDates = date => {
    console.log(new Date(date).getDate());
    return new Date(date).getDate();
};

export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const getDay = date => {
    let d = new Date(date);
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekday[d.getDay()];
};

export const getTimeOfDay = date => {
    let da = new Date(date);
    let HH = da.getHours();
    let MM = da.getMinutes();
    return `${HH}:${MM}`;
};

export const getDaysInM = () => {
    const month = new Date().getMonth() + 1;
    return new Date(2020, month, 0).getDate();
};

export const getDivs = (n, name, id) => {
    let divArr = new Array(n).fill(null);
    divArr.forEach((i, n) => {
        divArr[n] = n;
    });
    if (name && id) {
        return (
            divArr.map((n) => {
                return <div className={name} id={id} key={n}/>
            })
        );
    } else if (name) {
        return (
            divArr.map((n) => {
                return <div className={name} key={n}/>
            })
        );
    } else {
        return (
            divArr.map((n) => {
                return <div className="miniDiv" key={n}/>
            })
        );
    }
};

