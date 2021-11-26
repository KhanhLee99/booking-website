import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import testApi from "../../../api/testApi";
import { login, loginFacebook, loginGoogle } from "../guestSlice";
import Page2 from "./page2";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from "axios";

Login.propTypes = {}

const getFirebaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken();
    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
            console.log('reject roi');
        }, 10000);
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            async (user) => {
                // setIsSignedIn(!!user);
                if (!user) {
                    reject(null);
                }
                const token = await user.getIdToken();
                resolve(token);

                // unregisterAuthObserver();
                clearTimeout(waitTimer);
            });
    })
}



function Login(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues = {
        email: '',
        password: '',
    };

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/guest/page1',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (authResult) => {
                console.log(authResult);
                // console.log(authResult.additionalUserInfo.profile);
                const signInMethod = authResult.credential.signInMethod;
                authResult.user.getIdToken().then(function (accessToken) {
                    console.log(accessToken);
                    handleSocialLogin(accessToken, signInMethod);
                })

                return false;

            },
        },
    };



    const handleSubmit = async (values) => {
        console.log('value', values);
        try {

            const params = {
                email: values.email,
                password: values.password
            }
            const actionResult = await dispatch(login(params));
            const currentUser = unwrapResult(actionResult);
            localStorage.setItem('access_token', currentUser.data.token);
            localStorage.setItem('user', JSON.stringify(currentUser.data));
            history.push('/guest/page1');
            // localStorage.setItem('role', data.data.data.role);
            // console.log('Logged in user: ', currentUser.data);
        } catch (err) {
            console.log(err)
        }
    }

    const handleSocialLogin = async (token, signInMethod) => {
        try {
            const params = {
                social_token: token
            }
            const actionResult = await dispatch( (signInMethod === 'google.com') ? loginGoogle(params) : loginFacebook(params))  ;
            const currentUser = unwrapResult(actionResult);
            console.log(currentUser.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Page2
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {/* {firebase.auth() &&
                <div>
                    <h1>My App</h1>
                    <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                    <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
                </div>
            } */}

        </>
    );
}
export default Login;

