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

                {/* <Route
                    path={`${match.url}/login`}
                    exact
                    component={AdminLogin}
                /> */}
            </Switch>
        </>
    );
}

export default AdminFeature;