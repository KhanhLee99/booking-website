import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotFoundPage from './features/Error/NotFoundPage';
import MainErrorPage from './features/Error/MainErrorPage';
import GuestFeauture from './features/Guest';
import { PrivateRoute, PrivateRouteAddListing, PrivateRouteAdmin, PrivateRouteHost } from './components/PrivateRoute';
import Login from './features/Guest/pages';
import firebase from 'firebase';
import { getMe } from './app/reducer/guestSlice';
import { useDispatch } from 'react-redux';
import { messaging, onMessageListener } from './init-fcm';
import ReactNotificationComponent from './components/Notification/ReactNotification';
import Messages from './features/Message';
import TestFormik from './components/Test/TestFormik';
import TestYup from './components/Test/TestYup';
import TestFormik2 from './components/Test/TestFormik2';
import PostPaginate from './components/Test/PostPaginate';
import Header from './components/Header';
import Home from './features/Home/pages';
import ListingItem from './features/Listings/components/ListingItem';
import ListingsLocation from './features/Listings/pages';
import ListingDetail from './features/Listings/pages/ListingDetail';
import TestDateRange from './components/Test/TestDateRange';
import ScrollDemo from './components/Test/TestScroll';
import Map from './components/Test/TestMap';
import HeaderHost from './features/Host/components/HeaderHost';
import Main from './features/Admin/pages/Main';
import Header2 from './components/Header/Header2/Header2';
import FilterListing from './features/Listings/components/FilterListing';
import Paginate from './features/Listings/components/Paginate';
import MapListing from './features/Listings/components/Map';
import TestSlice from './components/Test/TestSlice';
import TestModal from './components/Test/TestModal';
import { Button } from 'reactstrap';
import Booking from './features/Listings/components/Booking';
import Hosting from './features/Host/pages/Hosting';
import MessageHost from './features/Host/pages/Message';


import TestPaypal from './components/Test/TestPaypal';
import Dashboard from './features/Admin/components/Dashboard';
import AdminListingPending from './features/Admin/pages/AdminListingPending/AdminListingPending';
import AdminListingActive from './features/Admin/pages/AdminListingActive/AdminListingActive';
import CommonAdmin from './components/CommonAdmin/CommonAdmin';
import AdminLogin from './features/Admin/pages/AdminLogin/AdminLogin';
import AdminFeature from './features/Admin';
import HostFeature from './features/Host';
import HostLogin from './features/Host/pages/HostLogin/HostLogin';
import TestBigCalendar from './components/Test/calendar/TestBigCalendar';
import DnDCalendarr from './components/Test/calendar/DnDCalendar';
import { saveDeviceToken } from './app/reducer/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import LoginPopup from './components/LoginPopup';
import AddListingFeature from './features/Host/AddListingFeature';
import CommonAddListing from './components/CommonAddListing/CommonAddListing';
// import { getToken } from "./firebase";
// Lazy load - Code splitting
// const GuestFeauture = React.lazy(() => import('./features/Guest'));


function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => { });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(() => {
    const getFcmToken = async () => {
      let token = '';
      try {
        token = await messaging.getToken();
      } catch (err) {
        console.log(err);
      }
      dispatch(saveDeviceToken(token));
      console.log('token: ', token);
    }
    getFcmToken();
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));


  return (
    // <LoginPopup />
    <>
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/host/login" component={HostLogin} />
            <Route path="/host/listings" component={Hosting} />

            {/* <PrivateRouteHost path="/host" component={HostFeature} /> */}
            <PrivateRouteAddListing path="/host" component={AddListingFeature} layout={CommonAddListing} />
            <PrivateRouteAdmin path="/admin" component={AdminFeature} layout={CommonAdmin} />

            <Route path="/listing/:id" component={ListingDetail} />
            <Route path="/checkout/:id/:checkin/:checkout/:guests" component={Booking} />
            <Route path="/hosting" component={MessageHost} />
            {/* <Route path="/hosting/inbox" component={MessageHost} /> */}
            <Route path="/location/:id" exact component={ListingsLocation} />

            {/* <Route path="/login" component={Login} /> */}
            {/* <Redirect exact from='/' to='/login' /> */}
            {/* <PrivateRoute path='/guest' component={GuestFeauture} />
          <Route path="/error" component={MainErrorPage} />
          <Route component={NotFoundPage} /> */}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>

  )
}

App.propTypes = {};

export default App;