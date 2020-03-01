import React from 'react';
import './App.css';
import AuthContext from './AuthContext'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

class App extends React.Component {

    token = null;
    theme = null;
    state = {
        token: null,
        playerId: null,
        expiration: null,
        firstVisit: null,
    };

    constructor() {
        super();
        this.token = localStorage.getItem('jwtToken');
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    login = (token, userId, tokenExpiration) => {
        this.token = token;

        this.setState({
            token: token,
            userId: userId,
            expiration: tokenExpiration,
            firstVisit: true,
        });
    };

    logout = () => {
        this.setState({token: null, userId: null, expiration: null});
        this.token = null;
        localStorage.clear();
    };

    componentDidMount() {
        this.theme = localStorage.getItem('theme');
        if (this.theme) {
            document.documentElement.setAttribute('data-theme', this.theme);
        } else {
            this.toggleTheme();
        }
    }

    toggleTheme() {
        const theme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setState({theme});
        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        window.setTimeout(function () {
            document.documentElement.classList.remove('theme-transition')
        }, 1000)
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider
                        value={{
                            userId: this.state.playerId,
                            token: this.state.token,
                            login: this.login,
                            logout: this.logout
                        }}>
                        <Switch>
                            <Route path="/auth" component={Login}/>
                            <Route path="/home" component={Home}/>
                        </Switch>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
