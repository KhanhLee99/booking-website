import React, { Suspense, useEffect } from 'react'
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
import { messaging } from './init-fcm';
// import { getToken } from "./firebase";
// Lazy load - Code splitting
// const GuestFeauture = React.lazy(() => import('./features/Guest'));


function App() {
  const dispatch = useDispatch();

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

  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect exact from='/' to='/login' />
            <PrivateRoute path='/guest' component={GuestFeauture} />
            <Route path="/error" component={MainErrorPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

App.propTypes = {};

export default App;