import React, {Component} from 'react';
import AuthContext from '../AuthContext';

export default class Login extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.nicknameEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    componentDidMount() {
        this.setAnimation();
    }

    submitHandler = event => {
        event.preventDefault();
        const nickname = this.nicknameEl.current.value;
        const password = this.passwordEl.current.value;

        if (nickname.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                  login(nickname: "${nickname}", password: "${password}") {
                    playerId
                    token
                    tokenExpiration
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
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    );
                    localStorage.setItem('jwtToken', resData.data.login.token)
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="grid__items grid__items__login">
                <div className="grid__item"/>
            </div>
        );
    }
}
