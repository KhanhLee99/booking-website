import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import testApi from "../../../api/testApi";
import { login } from "../guestSlice";
import Page2 from "./page2";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Login.propTypes = {}

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/guest/page1',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

function Login(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues = {
        email: '',
        password: '',
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
            // const response = await testApi.login(params);
            // console.log(response.data);
        } catch (err) {
            console.log(err)
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