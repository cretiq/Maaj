import React, {Component} from 'react';
import '../../Style/PointModal.scss'
import {setModalAnimation} from "../../Animation/PointModal";

export default class PointModal extends Component {

    state = {
        players: this.props.players,
        selectedDay: this.props.day
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setModalAnimation();
    }

    render() {

        const players = this.props.players.map((player, i) => {
            return (
                <div key={i} className="player">
                    <div className="player-sign"/>
                    <span className="player-name" onClick={this.props.addPoint.bind(this, player.nickname)}> {player.nickname} </span>
                </div>
            )
        });

        return (
            <div className="point-modal">
                <span className="point-modal__header">Players</span><br/>
                <span className="point-modal__selected-day">{this.props.day}</span>
                {players}
                <button className="closeMenu" onClick={this.props.closeModal.bind(this, '')}>Cancel</button>
            </div>
        )
    }
}
