import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import NotFoundPage from "../Error/NotFoundPage";

function GuestFeauture(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route
                    path='/page1'
                    component={Page1}
                />
                <Route
                    path='/'
                    exact
                    component={Page2}
                />
            </Switch>
        </>
    );
}

export default GuestFeauture;