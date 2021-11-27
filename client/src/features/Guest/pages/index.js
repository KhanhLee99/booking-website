import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import testApi from "../../../api/testApi";
import { login, loginFacebook, loginGoogle } from "../guestSlice";
import Page2 from "./page2";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import axios from "axios";

Login.propTypes = {}

function Login(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const initialValues = {
        email: '',
        password: '',
    };

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/guest/page1',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                console.log(authResult);
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
            await dispatch(login(params));
            // const actionResult = await dispatch(login(params));
            // const currentUser = unwrapResult(actionResult);
            history.push('/guest/page1');
        } catch (err) {
            console.log(err)
        }
    }

    const handleSocialLogin = async (token, signInMethod) => {
        try {
            const params = {
                social_token: token
            }
            const actionResult = await dispatch((signInMethod === 'google.com') ? loginGoogle(params) : loginFacebook(params));
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
        </>
    );
}
export default Login;

