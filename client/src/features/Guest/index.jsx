import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import NotFoundPage from "../Error/NotFoundPage";

function GuestFeauture(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={Page1} />

            <Route path={`${match.url}/page2`} component={Page2} />
            <Route path={`${match.url}/page3`} component={Page3} />

            <Route component={NotFoundPage} />
        </Switch>
    );
}

export default GuestFeauture;