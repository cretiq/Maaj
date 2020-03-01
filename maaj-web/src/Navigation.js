import React from 'react';
import AuthContext from './AuthContext';

const Navigation = props => (

    <AuthContext.Consumer>
        {context => {
            return (
                <div className="menu">
                    <nav>
                        <ul className="menu__list" id="menu">
                            <div className="menu__item-text logout__button" onClick={context.logout}>LOG OUT</div>
                        </ul>
                    </nav>
                </div>
            );
        }
        }
    </AuthContext.Consumer>
);

export default Navigation;
