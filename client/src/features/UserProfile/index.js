import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import EditProfile from './pages/EditProfile/EditProfile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Favorite from './pages/Favorite/Favorite';
import MyBooking from './pages/MyBooking/MyBooking';
import UserMessage from './pages/UserMessage/UserMessage';

UserProfileFeature.propTypes = {

};

function UserProfileFeature(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route
                    path={`${match.url}/profile`}
                    exact
                    component={EditProfile}
                />

                <Route
                    path={`${match.url}/change-password`}
                    exact
                    component={ChangePassword}
                />

                <Route
                    path={`${match.url}/favorite`}
                    exact
                    component={Favorite}
                />

                <Route
                    path={`${match.url}/bookings`}
                    exact
                    component={MyBooking}
                />

                <Route
                    path={`${match.url}/inbox`}
                    exact
                    component={UserMessage}
                />

            </Switch>
        </>
    );
}

export default UserProfileFeature;