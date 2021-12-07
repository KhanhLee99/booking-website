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
import { PrivateRoute } from './components/PrivateRoute';
import Login from './features/Guest/pages';
import firebase from 'firebase';
import { getMe } from './features/Guest/guestSlice';
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
    //   const fetchData = async () => {
    //     await dispatch(getMe());
    //   }
    //   fetchData();
    const getFcmToken = async () => {
      let token = '';
      try {
        token = await messaging.getToken();
      } catch (err) {
        console.log(err);
      }
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
    // <>
    //   {show ? (
    //     <ReactNotificationComponent
    //       title={notification.title}
    //       body={notification.body}
    //     />
    //   ) : (
    //     <></>
    //   )}
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={PostPaginate} />
          <Route path="/listing-detail" exact component={ListingDetail} />
          <Route path="/:id" component={ListingsLocation} />
          <Route path="/login" component={Login} />
          {/* <Redirect exact from='/' to='/login' /> */}
          <PrivateRoute path='/guest' component={GuestFeauture} />
          <Route path="/error" component={MainErrorPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

App.propTypes = {};

export default App;