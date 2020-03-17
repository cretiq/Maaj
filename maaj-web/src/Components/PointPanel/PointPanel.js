import React, {Component} from 'react';
import '../../Style/PointPanel.scss'

export default class PointPanel extends Component {

    state = {
        players: [],
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({players: this.props.players})
    }

    render() {
        const pointTableBubbles = (n, name, player) => {

            let pointDates = [];
            console.log(player);
            player.forEach(player => {
                pointDates.push(new Date(player.points.date).getDate());
            });

            let divArr = new Array(n).fill(null);
            divArr.forEach((i, n) => {
                divArr[n] = n;
            });

            return (
                divArr.map((n) => {
                    return (
                        <div className={name} key={n} onClick={this.props.deletePoint(this, pointDates[n].nickname)}>
                            <span className="point-dates">{pointDates[n]}</span>
                        </div>
                    )
                })
            );
        };

        const players = this.state.players.map((player, i) => {
            return (
                <div key={i} className="point-table__player">
                    <span className="point-table__player player-nickname">{player.nickname}</span>
                    <span
                        className="point-table__player player-point-count">
                        {pointTableBubbles(player.points.length, 'bubbles', player)}
                    </span>
                    {/*{*/}
                    {/*    (player.points.length > 0 && this.state.menuShowDates) &&*/}
                    {/*    <span className="point-table__player player-points">On Date: {getDate(player.points)}</span>*/}
                    {/*}*/}
                </div>
            )
        });

        return (
            <div className="point-table__container">
                <div className="point-table">
                    {players}
                </div>
            </div>
        )

    }
}
