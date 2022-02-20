import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import AdminListingPending from './pages/AdminListingPending/AdminListingPending';
import AdminListingActive from './pages/AdminListingActive/AdminListingActive';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminFeed from './pages/AdminFeed/AdminFeed';
import AdminPayment from './pages/AdminPayment/AdminPayment';
import AdminBooking from './pages/AdminBooking/AdminBooking';
import AdminUser from './pages/AdminUser/AdminUser';
import AdminHost from './pages/AdminHost/AdminHost';

AdminFeature.propTypes = {

};

function AdminFeature(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route
                    path={`${match.url}/listing/pending`}
                    exact
                    component={AdminListingPending}
                />

                <Route
                    path={`${match.url}/listing/active`}
                    exact
                    component={AdminListingActive}
                />

                <Route
                    path={`${match.url}/dashboard`}
                    exact
                    component={Dashboard}
                />

                <Route
                    path={`${match.url}/payout`}
                    exact
                    component={AdminPayment}
                />

                <Route
                    path={`${match.url}/booking`}
                    exact
                    component={AdminBooking}
                />

                <Route
                    path={`${match.url}/users`}
                    exact
                    component={AdminUser}
                />

                <Route
                    path={`${match.url}/hosts`}
                    exact
                    component={AdminHost}
                />

            </Switch>
        </>
    );
}

export default AdminFeature;