import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css'
import './styles.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login, loginFacebook, loginGoogle } from '../../app/reducer/userSlice';
import PulseLoading from '../Loading/PulseLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router';

LoginPopup.propTypes = {

};

function LoginPopup(props) {
    // const user = useSelector(state => state.userSlice.current);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/guest/page1',
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                // console.log(authResult);
                const signInMethod = authResult.credential.signInMethod;
                authResult.user.getIdToken().then(function (accessToken) {
                    console.log(accessToken);
                    handleSocialLogin(accessToken, signInMethod);
                })
                return false;
            },
        },
    };

    const handleSocialLogin = async (token, signInMethod) => {
        try {
            const params = {
                social_token: token
            }
            const actionResult = await dispatch((signInMethod === 'google.com') ? loginGoogle(params) : loginFacebook(params));
            const currentUser = unwrapResult(actionResult);
            console.log(currentUser.data);
            setTriggerPopup(false);
            history.push('/posts');
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleLogin = async (values, resetForm) => {
        try {
            const params = {
                email: values.email,
                password: values.password
            }
            setLoading(true);
            await dispatch(login(params));
            setLoading(false);
            setTriggerPopup(false);
            resetForm();
            // history.push('/posts');
        } catch (err) {
            console.log(err.message)
            setLoading(false);
        }
    }

    const handleClosePopup = (resetForm) => {
        setTriggerPopup(false)
        resetForm();
    }

    const { trigger, setTriggerPopup } = props;

    return (
        trigger ? (
            <div className="k-pop-up">
                <div id="sign-in-dialog" className="zoom-anim-dialog">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string().email('Invalid email address').required('Required'),
                                password: Yup.string()
                                    // .max(1, 'Must be 1 characters or less')
                                    .required('Required'),
                            })}
                        onSubmit={(values, { resetForm }) => {
                            handleLogin(values, resetForm);
                        }}
                    >
                        {formik => (
                            <>
                                <div className="small-dialog-header">
                                    <h3>Sign In</h3>
                                    <button onClick={handleClosePopup.bind(null, formik.resetForm)} title="%title%" type="button" className="mfp-close"></button>
                                </div>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="sign-in-wrapper">
                                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                        <div className="divider"><span>Or</span></div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                {...formik.getFieldProps('email')}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div>{formik.errors.email}</div>
                                            ) : null}
                                            <i className="icon_mail_alt" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                {...formik.getFieldProps('password')}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div>{formik.errors.email}</div>
                                            ) : null}
                                            <i className="icon_lock_alt" />
                                        </div>
                                        <div className="clearfix add_bottom_15">
                                            <div className="checkboxes float-left">
                                                <label className="container_check">Remember me
                                                    <input type="checkbox" />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="float-right mt-1"><a id="forgot" href="javascript:void(0);">Forgot Password?</a></div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn_1 full-width" disabled={loading ? true : false}>{loading ? <PulseLoading /> : "Log In"}</button>
                                        </div>
                                        <div className="text-center">
                                            Don’t have an account?<a href="register.html">Sign up</a>
                                        </div>
                                        {/* <div id="forgot_pw">
                                            <div className="form-group">
                                                <label>Please confirm login email below</label>
                                                <input type="email" className="form-control" name="email_forgot" id="email_forgot" />
                                                <i className="icon_mail_alt" />
                                            </div>
                                            <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
                                            <div className="text-center"><input type="submit" defaultValue="Reset Password" className="btn_1" /></div>
                                        </div> */}
                                    </div>
                                </form>
                            </>
                        )}
                    </Formik>

                </div>
            </div >
        ) : null

    );
}

export default LoginPopup;