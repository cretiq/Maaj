import React, {Component} from 'react';
import '../Style/Home.scss'
import {setHomeAnimation, setInitialHomeAnimation} from "../Animation/HomeAnimation";
import {cal, pointTableBubbles, weekdaysLetter} from "../Helpers/Helper";
import PointModal from "../Components/Modal/PointModal";
import Backdrop from "../Components/Backdrop/Backdrop";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import {closeModalAnimation, openModalAnimation} from "../Animation/PointModal";

export default class Home extends Component {

    state = {
        menuOpen: false,
        menuShowDates: false,
        selectedDay: null,
        players: [],
        pointsToPlayer: [],
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchPlayers();
        setInitialHomeAnimation();
        this.setToday();
    }

    openPointMenu = (day, event) => {
        event.preventDefault();
        this.setState({
            menuOpen: !this.state.menuOpen,
            selectedDay: day
        });
        this.state.menuOpen ? openModalAnimation() : closeModalAnimation()
    };

    fetchPlayers() {
        this.setState({fetchingStatusUpdates: true});

        const requestBody = {
            query: `
                query {
                    players {
                        _id
                        nickname
                        points
                    }
                }
            `
        };

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            }).then(resData => {
            let sortedPlayers = this.sortPlayerByPoint(resData.data.players);
            this.setState({players: sortedPlayers});
            setHomeAnimation();
            this.pointsToPlayer();
        })
            .catch(err => {
                console.log(err);
            });
    }

    addPoint = (player, event) => {
        event.preventDefault();
        const date = new Date(new Date().setDate(this.state.selectedDay));
        console.log(date);

        const requestBody = {
            query: `
                mutation {
                    givePoint(nickname: "${player}", date: "${date}") {
                        _id
                        nickname
                        points
                    }
                }
            `
        };

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            }).then(resData => {
            if (resData.errors) {
                this.setState({errorMessage: resData.errors[0].message})
            } else {
                this.fetchPlayers();
            }
        })
            .catch(err => {
                console.log(err);
            });
    };

    setToday = () => {
        let day = document.querySelectorAll('.day');
        let element = document.querySelectorAll('.day > span');
        element.forEach((item, i) => {
            if (new Date().getDate().toString() === item.textContent.trim(' ')) {
                day[i].classList.add('day--today');
            }
        });
    };

    pointsToPlayer = () => {
        let points = [[], []];
        this.state.players.forEach(player => {
            player.points.forEach(point => {
                points[0].push(point);
                points[1].push(player.nickname);
            })
        });
    };

    sortPlayerByPoint = players => {
        let sortedPlayers = players;


        players.forEach((player, i) => {

            this.comparePoints(player.points,)

        })

        return sortedPlayers;
    }

    comparePoints( a, b ) {
        if ( a < b ) return -1;
        if ( a > b ) return 1;
        return 0;
    }

    render() {

        const getDate = dates => {
            return (
                dates.map((date, i) => {
                        return (
                            new Date(date).getDate()
                        )
                    }
                )
            )
        };

        const players = this.state.players.map((player, i) => {
            return (
                <div key={i} className="point-table__player">
                    <span className="point-table__player player-nickname">{player.nickname}</span>
                    <span
                        className="point-table__player player-point-count">
                        {pointTableBubbles(player.points.length, 'bubbles', player.points)}
                    </span>
                    {
                        (player.points.length > 0 && this.state.menuShowDates) &&
                        <span className="point-table__player player-points">On Date: {getDate(player.points)}</span>
                    }
                </div>
            )
        });

        const getWeekDays = weekdaysLetter.map((weekday, i) => {
            return (
                <div className="weekday" key={i}>{weekday}</div>
            )
        });

        const getMonthLayout = cal().map((week, i) => {
                if (i > 0) {
                    return (
                        week.map((day, i) => {
                            return (
                                <div key={i}
                                     className={day ? 'day' : 'day day--empty'}
                                     onClick={day ? this.openPointMenu.bind(this, day) : null}>
                                    <span> {day} </span>
                                </div>
                            );
                        })
                    );
                }
            }
        );

        return (
            <React.Fragment>

                <header/>

                <div className="main-home__container">
                    <div className="maaj-square">
                        <span>MA</span><br/>
                        <span>AJ</span>
                    </div>
                    <div className="lady-text">女王</div>
                    {
                        this.state.menuOpen &&
                        <React.Fragment>
                            <Backdrop/>
                            <PointModal
                                players={this.state.players}
                                day={this.state.selectedDay}
                                addPoint={this.addPoint}
                                closeModal={this.openPointMenu}>
                            </PointModal>
                        </React.Fragment>
                    }
                    <div className="home-main-text__container">
                        <span className="home-main-text" id="main-text-original">
                            <div className="top-border"/>
                            <h2 className="headline">MAAAAJ</h2>
                        </span>
                    </div>

                    <div className="calendar__container">
                        <div className="calendar">
                            {getMonthLayout}
                            {getWeekDays}
                            <div className="weekday"/>
                        </div>
                    </div>
                </div>
                <div className="point-table__container">
                    <div className="point-table">
                        {players}
                    </div>
                </div>
            </React.Fragment>
        );
    }
};
