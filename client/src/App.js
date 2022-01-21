import firebase from 'firebase';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import { getMe } from './app/reducer/guestSlice';
import { saveDeviceToken } from './app/reducer/userSlice';
import CommonAddListing from './components/CommonAddListing/CommonAddListing';
import CommonAdmin from './components/CommonAdmin/CommonAdmin';
import CommonUserProfile from './components/CommonUserProfile/CommonUserProfile';
import Loading from './components/Loading/Loading';
import ReactNotificationComponent from './components/Notification/ReactNotification';
import { PrivateRouteAddListing, PrivateRouteAdmin, PrivateRouteHost, PrivateRouteMe } from './components/PrivateRoute';
import AdminFeature from './features/Admin';
import AdminLogin from './features/Admin/pages/AdminLogin/AdminLogin';
import Home from './features/Home/pages';
import HostFeature from './features/Host';
import AddListingFeature from './features/Host/AddListingFeature';
import HostLogin from './features/Host/pages/HostLogin/HostLogin';
import MessageHost from './features/Host/pages/Message';
import Booking from './features/Listings/components/Booking';
import ListingsLocation from './features/Listings/pages';
import ListingDetail from './features/Listings/pages/ListingDetail';
import UserProfileFeature from './features/UserProfile';
import { messaging, onMessageListener } from './init-fcm';


// import { getToken } from "./firebase";
// Lazy load - Code splitting
// const GuestFeauture = React.lazy(() => import('./features/Guest'));


function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    dispatch(getMe()).then(() => setLoading(false));
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
    // <ListingItemSkeleton />
    <>
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      {loading ? <Loading /> :
        <Suspense fallback={<div>Loading ...</div>}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/host/login" component={HostLogin} />
              <Route path="/hosting" component={MessageHost} />

              <PrivateRouteHost path="/host" component={HostFeature} />
              <PrivateRouteAddListing path="/become-host" component={AddListingFeature} layout={CommonAddListing} />
              <PrivateRouteAdmin path="/admin" component={AdminFeature} layout={CommonAdmin} />
              <PrivateRouteMe path="/me" component={UserProfileFeature} layout={CommonUserProfile} />

              <Route path="/listing/:id" component={ListingDetail} />
              <Route path="/location/:id" exact component={ListingsLocation} />

              {/* <Route path="/login" component={Login} /> */}
              {/* <Redirect exact from='/' to='/login' /> */}
              {/* <PrivateRoute path='/guest' component={GuestFeauture} />
        <Route path="/error" component={MainErrorPage} />
        <Route component={NotFoundPage} /> */}
            </Switch>
          </BrowserRouter>
        </Suspense>
      }

    </>

  )
}

App.propTypes = {};

export default App;