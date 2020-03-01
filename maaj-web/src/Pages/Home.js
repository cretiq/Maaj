import React, {Component} from 'react';
import '../Style/Home.scss'
import {setHomeAnimation, setInitialHomeAnimation} from "../Animation/HomeAnimation";
import {cal, getDivs, weekdays} from "../Helpers/Helper";
import PointModal from "../Components/Modal/PointModal";
import Backdrop from "../Components/Backdrop/Backdrop";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export default class Home extends Component {

    state = {
        menuOpen: false,
        menuShowDates: false,
        selectedDay: null,
        players: [],
        points: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchPlayers();
        setInitialHomeAnimation();
    }

    openPointMenu = (day, event) => {
        event.preventDefault();
        this.setState({
            menuOpen: !this.state.menuOpen,
            selectedDay: day
        })
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
            this.setState({players: resData.data.players});
            setHomeAnimation()
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
                        className="point-table__player player-point-count">{getDivs(player.points.length, 'bubbles')}</span>
                    {(player.points.length > 0 && this.state.menuShowDates) &&
                    <span className="point-table__player player-points">On Date: {getDate(player.points)}</span>
                    }
                </div>
            )
        });

        const getWeekDays = weekdays.map((weekday, i) => {
            return (
                <div className="weekday" key={i}>{weekday}</div>
            )
        });

        const getMonthLayout = cal().map((week, i) => {
                if (i > 0) {
                    return (
                        week.map((day, i) => {
                            return (
                                <div key={i} className={day ? 'day' : 'day day--empty'}
                                     onClick={this.openPointMenu.bind(this, day)}>
                                    <span> {day} </span>
                                </div>
                            )
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
                        <div className="hello">Hello there</div>
                    </div>
                    <div className="chinese-simplified"><span>女<br/>王</span></div>
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
                            MAAAAJ?<br/>
                        </span>
                        <span className="home-main-text home-main-text--light" id="main-text-light">maj...</span>
                    </div>

                    <div className="calendar__container">
                        <div className="calendar">
                            {getWeekDays}
                            {getMonthLayout}
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
}
