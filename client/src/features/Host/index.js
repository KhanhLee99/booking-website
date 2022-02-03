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
import Hosting from './pages/Hosting';
import ReservationDetail from './pages/ReservationDetail/ReservationDetail';
import Reviews from './pages/Reviews/Reviews';
import Booking from '../Listings/components/Booking';
import HostMessage from './pages/HostMessage/HostMessage';

HostFeature.propTypes = {

};

function HostFeature(props) {
    const match = useRouteMatch();
    return (
        <>
            <Switch>

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

                <Route
                    path={`${match.url}/listings`}
                    exact
                    component={Hosting}
                />

                <Route
                    path={`${match.url}/reservation/:id`}
                    exact
                    component={ReservationDetail}
                />

                <Route
                    path={`${match.url}/reviews`}
                    exact
                    component={Reviews}
                />

                <Route
                    path={`${match.url}/checkout/:id`}
                    exact
                    component={Booking}
                />
                <Route
                    path={`${match.url}/inbox`}
                    exact
                    component={HostMessage}
                />

            </Switch>
        </>
    );
}

export default HostFeature;