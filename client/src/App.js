import firebase from 'firebase';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import { getMe } from './app/reducer/guestSlice';
import { saveDeviceToken } from './app/reducer/userSlice';
import CommonUserProfile from './components/CommonUserProfile/CommonUserProfile';
import Loading from './components/Loading/Loading';
import ReactNotificationComponent, { NotificationStattus } from './components/Notification/ReactNotification';
import { PrivateRouteAddListing, PrivateRouteAdmin, PrivateRouteHost, PrivateRouteMe } from './components/PrivateRoute';
import AdminFeature from './features/Admin';
import AdminLogin from './features/Admin/pages/AdminLogin/AdminLogin';
import Home from './features/Home/pages';
import HostFeature from './features/Host';
import AddListingFeature from './features/Host/AddListingFeature';
import HostLogin from './features/Host/pages/HostLogin/HostLogin';
import MessageHost from './features/Host/pages/Message';
import ListingsLocation from './features/Listings/pages';
import ListingDetail from './features/Listings/pages/ListingDetail';
import UserProfileFeature from './features/UserProfile';
import { getToken, onMessageListener } from './init-fcm';
import { unwrapResult } from '@reduxjs/toolkit'
import userApi from './api/userApi';
import { fetchMyNotify, getTotalNoticationsUnread } from './app/reducer/notifySlice';
import DragHorizontal1 from './components/Test/DragHorizontal1';
import DragHorizonImage from './components/Test/DragHorizonImage';
import Pay from './features/UserProfile/pages/Payment/Pay';
import AdminPayment from './features/Admin/pages/AdminPayment/AdminPayment';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import NotFoundPage from './features/Error/NotFoundPage';

// import { getToken } from "./firebase";
// Lazy load - Code splitting
// const GuestFeauture = React.lazy(() => import('./features/Guest'));


function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userSlice.current);
  const totalNotiUnread = useSelector((state) => state.notifySlice.totalUnread || 0);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "", id: "" });
  const [loading, setLoading] = useState(true);
  const [deviceToken, setDeviceToken] = useState();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getFcmToken = async () => {
      let token = '';
      try {
        token = await getToken();
      } catch (err) {
        console.log(err);
      }
      setDeviceToken(token);
      dispatch(saveDeviceToken(token));
      console.log('token: ', token);
    }

    getFcmToken();

    dispatch(getMe()).then((res) => {
      // console.log(unwrapResult(res));
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });

  }, []);

  useEffect(() => {
    if (loggedInUser && deviceToken) {
      userApi.updateDeviceToken({ device_token: deviceToken }, localStorage.getItem('access_token')).then(() => {
        setLoading(false);
      }).catch(err => {
        setLoading(false);
      });
    }
  }, [deviceToken]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        id: payload.fcmMessageId
      });
      setShow(true);
      dispatch(getTotalNoticationsUnread());
      dispatch(fetchMyNotify({
        limit: 5,
        page: 1,
      }));
      // setTimeout(() => {
      //   setShow(false);
      // }, 2000);
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    // <Select options={options} styles={customStyles} />

    // <AdminPayment />

    <>
      {show ? (
        // <ReactNotificationComponent
        //   title={notification.title}
        //   body={notification.body}
        //   id={notification.id}
        //   status={NotificationStattus.SUCCESS}
        // />
        enqueueSnackbar(<span dangerouslySetInnerHTML={{ __html: notification.body }} />, { variant: "success" })
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
              <Route path="/payment/:id" component={Pay} />

              <PrivateRouteHost path="/host" component={HostFeature} />
              <PrivateRouteAddListing path="/become-host" component={AddListingFeature} />
              <PrivateRouteAdmin path="/admin" component={AdminFeature} />
              <PrivateRouteMe path="/me" component={UserProfileFeature} />

              <Route path="/listing/:id" component={ListingDetail} />
              <Route path="/location/:id" exact component={ListingsLocation} />

              {/* <Route path="/login" component={Login} /> */}
              {/* <Redirect exact from='/' to='/login' /> */}
              {/* <PrivateRoute path='/guest' component={GuestFeauture} /> */}
              {/* <Route path="/error" component={MainErrorPage} /> */}
              <Route path="/not-found" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      }
    </>
  )
}

App.propTypes = {};

export default App;