import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import NotFoundPage from "../Error/NotFoundPage";
import Login from "./pages";

function GuestFeauture(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            {/* <Route exact path={match.url} component={Page1} />
            <Route path={`${match.url}/page2`} component={Login} /> */}
            <Route path={`${match.url}/page1`} component={Page1} />

            <Route component={NotFoundPage} />
        </Switch>
    );
}

export default GuestFeauture;