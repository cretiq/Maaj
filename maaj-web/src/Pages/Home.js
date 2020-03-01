import React, {Component} from 'react';
import '../Style/Home.scss'
import {setHomeAnimation} from "../Animation/HomeAnimation";
import {cal, weekdays} from "../Helpers/Helper";
import PointModal from "../Components/Modal/PointModal";
import Backdrop from "../Components/Backdrop/Backdrop";

export default class Home extends Component {

    state = {
        menuOpen: false,
        selectedDay: null,
        players: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchPlayers();
        setHomeAnimation();
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
            console.log(resData.data.players);
            this.setState({players: resData.data.players});
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
                'Authorization': 'Bearer ' + this.context.token
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
                console.log(resData.data)
            }
        })
            .catch(err => {
                console.log(err);
            });
    };

    render() {

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
                                <div key={i} className={day ? 'day' : 'day day--empty'} onClick={this.openPointMenu.bind(this, day)}>
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
                    {
                        this.state.menuOpen &&
                        <React.Fragment>
                            <Backdrop/>
                            <PointModal
                                players={this.state.players}
                                day={this.state.selectedDay}
                                addPoint={this.addPoint}
                                closeModal={this.openPointMenu}>
                                <p>My Modal</p>
                            </PointModal>
                        </React.Fragment>
                    }
                    <div className="home-main-text__container">
                        <span className="home-main-text" id="main-text-original">
                            Maaaaj?,&nbsp;<br/>
                        </span>
                        <span className="home-main-text home-main-text--light" id="main-text-light">maj . . .</span>
                    </div>

                    <div className="calendar__container">

                        <div className="calendar">
                            {getWeekDays}
                            {getMonthLayout}
                            <div className="weekday"/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}