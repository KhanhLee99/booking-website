import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import BasicInfomation from './pages/BasicInfomation';
import Rooms from './pages/Rooms';
import Location from './pages/Location';
import Amenity from './pages/Amenity';
import AddPhotos from './pages/AddPhotos';
import AddName from './pages/AddName';
import AddPrice from './pages/AddPrice';
import DnDCalendarr from '../../components/Test/calendar/DnDCalendar';
import Reservation from './pages/Reservation/Reservation';

HostFeature.propTypes = {

};

function HostFeature(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                {/* <Route
                    path={`${match.url}/basic-infomation`}
                    exact
                    component={BasicInfomation}
                />

                <Route
                    path={`${match.url}/:id/basic-infomation`}
                    exact
                    component={BasicInfomation}
                />

                <Route
                    path={`${match.url}/:id/location`}
                    exact
                    component={Location}
                />

                <Route
                    path={`${match.url}/:id/floor-plan`}
                    exact
                    component={Rooms}
                />

                <Route
                    path={`${match.url}/:id/amenities`}
                    exact
                    component={Amenity}
                />

                <Route
                    path={`${match.url}/:id/photos`}
                    exact
                    component={AddPhotos}
                />

                <Route
                    path={`${match.url}/:id/title`}
                    exact
                    component={AddName}
                />

                <Route
                    path={`${match.url}/:id/price`}
                    exact
                    component={AddPrice}
                /> */}

                <Route
                    path={`${match.url}/calendar/listing/:id`}
                    exact
                    component={DnDCalendarr}
                />

                <Route
                    path={`${match.url}/booking`}
                    exact
                    component={Reservation}
                />



            </Switch>
        </>
    );
}

export default HostFeature;