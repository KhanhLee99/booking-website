import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css'
import './styles.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginFacebook, loginGoogle } from '../../app/reducer/userSlice';
import PulseLoading from '../Loading/PulseLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router';
import userApi from '../../api/userApi';
import { MdKeyboardBackspace } from "react-icons/md";

LoginPopup.propTypes = {

};

const main_register_holder = {
    // maxWidth: '420px',
    margin: '50px auto 0px',
    position: 'relative',
    zIndex: 5,
    width: '100%'
}

const main_register = {
    float: 'left',
    width: '100%',
    position: 'relative',
    padding: '80px 0 20px',
    marginBottom: '50px',
    background: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0px 0px 0px 7px rgb(255 255 255 / 10%)',
}

const main_register_title = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '54px',
    lineHeight: '54px',
    paddingLeft: '30px',
    color: '#fff',
    textAlign: 'left',
    background: '#4e65a3',
    fontSize: '14px',
    fontWeight: 600,
    width: '100%',
    zIndex: 2,
}

const close_reg = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '54px',
    height: '54px',
    lineHeight: '54px',
    cursor: 'pointer',
    zIndex: 3,
    color: '#fff',
    borderLeft: '1px solid rgba(255, 255, 255, 0.11)',
    fontSize: '18px',
    textAlign: 'center'
}

const tabs_menu_li = {
    float: 'left',
    textAlign: 'left',
    position: 'relative',
    zIndex: 2,
    width: '50%',
    borderColor: '#4DB7FE',
    cursor: 'pointer',
}

const tabs_menu_li_a = {
    color: '#7d93b2',
    fontSize: '13px',
    display: 'block',
    fontWeight: 600,
    padding: '14px 0',
}

const tabs_container = {
    float: 'left',
    width: '100%',
    marginTop: '10px',
    padding: '0 30px',
}

const tab_content = {
    padding: '20px 0 5px',
    width: '100%',
    // display: 'none',
    float: 'left'
}

const first_tab = {
    display: 'block'
}

const custom_form = {
    float: 'left',
    width: '100%',
    position: 'relative'
}

const custom_form_label = {
    float: 'left',
    position: 'relative',
    width: '100%',
    textAlign: 'left',
    fontWeight: 500,
    color: '#666',
    color: '#878c9f',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '12px'
}

const custom_form_input = {
    float: 'left',
    border: '1px solid #e5e7f2',
    background: '#f9f9f9',
    width: '100%',
    padding: '15px 20px 15px 20px',
    borderRadius: '4px',
    color: '#7d93b2',
    fontSize: '12px',
    outline: 'none',
    overflow: 'hidden',
    zIndex: 1,
    boxShadow: 'none',
}

const custom_form_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0px',
    width: '50%',
    padding: '13px 0',
    color: '#fff',
}

const filter_tags = {
    float: 'left',
    color: '#7d93b2',
    fontSize: '12px',
    fontWeight: 600,
    marginTop: '24px',
}

const label_rmbm = {
    fontSize: '11px',
    color: '#7d93b2',
    paddingBottom: '12px',
    float: 'left',
    padding: '0 10px',
    position: 'relative',
    top: '4px',
    fontWeight: 600,
    width: 'auto',
    textAlign: 'left'
}

const log_separator_span = {
    position: 'relative',
    width: '36px',
    height: '36px',
    lineHeight: '36px',
    border: '1px solid #eee',
    borderRadius: '100%',
    display: 'inline-block',
    background: '#f5f6fa',
    fontSize: '10px',
    textTransform: 'uppercase',
    zIndex: 2,
    color: "#7d93b2",
    textAlign: 'center'
}

function LoginPopup(props) {
    const deviceToken = useSelector(state => state.userSlice.deviceToken);
    const [loading, setLoading] = useState(false);
    const [tabLogin, setTabLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
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
            const currentUser = unwrapResult(actionResult).then(() => {
                refreshPage();
            });
            console.log(currentUser.data);
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
            await dispatch(login(params)).then(res => {
                const access_token = unwrapResult(res).data.token;
                userApi.updateDeviceToken({ device_token: deviceToken }, access_token).then(() => {
                    setLoading(false);
                    refreshPage();
                }).catch(err => {
                    setLoading(false);
                });
            });
            resetForm();
        } catch (err) {
            console.log(err.message)
            setLoading(false);
        }
    }

    const handleRegister = async (values, resetForm) => {
        try {
            const params = {
                name: values.name,
                email: values.email,
                password: values.password
            };
            setLoading(true);
            await userApi.register(params).then(res => {
                console.log(res);
                setLoading(false);
                resetForm();
            })
        } catch (err) {
            console.log(err.message);
            setLoading(false)
        }
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const { close } = props;


    return (

        <div className="k-main-register-holder tabs-act" style={main_register_holder}>
            <div className="k-main-register fl-wrap" style={main_register}>
                <div className="k-main-register_title" style={main_register_title}>Welcome to <span style={{ textTransform: 'uppercase', fontWeight: 800 }}><strong style={{ color: '#4DB7FE' }}>Town</strong>Hub<strong style={{ color: '#4DB7FE' }}>.</strong></span></div>
                <div className='close-tag' style={close_reg} onClick={close}><i className="fal fa-times" /></div>
                <ul className={isForgot ? "tabs-menu fl-wrap display-none" : "tabs-menu fl-wrap"} style={{ padding: '0 30px', listStyle: 'none' }}>
                    <li className={tabLogin ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault(); setTabLogin(true) }}><a href="#tab-1" style={tabs_menu_li_a}><i className="fal fa-sign-in-alt" style={{ color: '#4DB7FE' }} /> Login</a></li>
                    <li className={tabLogin ? '' : 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault(); setTabLogin(false) }}><a href="#tab-2" style={tabs_menu_li_a}><i className="fal fa-user-plus" style={{ color: '#4DB7FE' }} /> Register</a></li>
                </ul>
                {/*tabs */}
                <div className="k-tabs-container" style={tabs_container}>
                    <div className={isForgot ? "k-tab display-none" : "k-tab"} style={{ width: '100%', float: 'left' }}>
                        {/* TAB LOGIN */}
                        <TabLogin
                            tabLogin={tabLogin}
                            handleLogin={handleLogin}
                            loading={loading}
                            showForgotBox={() => setIsForgot(true)}
                        />

                        {/* TAB REGISTER */}
                        <TabRegister
                            tabLogin={tabLogin}
                            handleRegister={handleRegister}
                            loading={loading}
                        />

                        {/* LOGIN SOCIAL */}
                        <SocialLogin uiConfig={uiConfig} />

                    </div>

                    {/* FORGOT PASSWORD */}
                    <ForgotForm
                        hideForgotBox={() => setIsForgot(false)}
                        isForgot={isForgot}
                    />

                </div>
            </div>
        </div >
    );
}

export default LoginPopup;

function TabLogin(props) {
    const { tabLogin, handleLogin, loading, showForgotBox } = props;
    return (
        <div id="tab-1" className={tabLogin ? '' : 'current-content'}>
            <div className="k-custom-form" style={custom_form}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required').max(255),
                            password: Yup.string()
                                // .min(6, 'Must be 6 characters or more')
                                .required('Required'),
                        })}
                    onSubmit={(values, { resetForm }) => {
                        handleLogin(values, resetForm);
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <label style={custom_form_label}>Email Address <span>*</span> </label>
                            <input
                                type="text"
                                {...formik.getFieldProps('email')}
                                style={custom_form_input}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.email}</label>
                            ) : null}

                            <label style={custom_form_label}>Password <span>*</span> </label>
                            <input
                                type="password"
                                {...formik.getFieldProps('password')}
                                style={custom_form_input}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.password}</label>
                            ) : null}
                            <button type="submit" className="btn float-btn color2-bg" style={custom_form_button}>{loading ? <PulseLoading /> : 'Log In'} </button>
                            <div className="clearfix" />
                            <div className="k-filter-tags" style={filter_tags}>
                                <input id="check-a3" type="checkbox" name="check" />
                                <label htmlFor="check-a3" style={label_rmbm}>Remember me</label>
                            </div>
                            <div className="lost_password" style={{ marginTop: '24px', float: 'right' }}>
                                <a
                                    href="#"
                                    style={{ float: 'left', fontSize: '12px', fontWeight: 600, }}
                                    onClick={showForgotBox}
                                >Lost Your Password?</a>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

function TabRegister(props) {
    const { tabLogin, loading, handleRegister } = props;

    return (
        <div className="tab">
            <div id="tab-2" className={tabLogin ? 'current-content' : ''}>
                <div className="k-custom-form" style={custom_form}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={
                            Yup.object({
                                name: Yup.string().max(255).min(6),
                                email: Yup.string().email('Invalid email address').required('Required').max(255),
                                password: Yup.string()
                                    .min(6, 'Must be 6 characters or more')
                                    .required('Required'),
                                confirm_password: Yup.string()
                                    .min(6, 'Vui lòng nhập Xác nhận mật khẩu mới')
                                    .required('Password is required')
                                    .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu mới khác với Mật khẩu mới')
                            })}
                        onSubmit={(values, { resetForm }) => {
                            handleRegister(values, resetForm);
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <label style={custom_form_label}>Full Name <span>*</span> </label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps('name')}
                                    style={custom_form_input}
                                />

                                <label style={custom_form_label}>Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                    style={custom_form_input}
                                />

                                <label style={custom_form_label}>Password <span>*</span></label>
                                <input
                                    type="password"
                                    {...formik.getFieldProps('password')}
                                    style={custom_form_input}
                                />

                                <label style={custom_form_label}>Confirm Password <span>*</span></label>
                                <input
                                    type="password"
                                    {...formik.getFieldProps('confirm_password')}
                                    style={custom_form_input}
                                />

                                <div className="clearfix" />
                                <button type="submit" className="btn float-btn color2-bg" style={custom_form_button}>{loading ? <PulseLoading /> : 'Register'}  </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

function SocialLogin(props) {
    const { uiConfig } = props;
    return (
        <>
            <div className="k-log-separator fl-wrap" style={{ textAlign: 'center' }}><span style={log_separator_span}>or</span></div>
            <div className="soc-log fl-wrap">
                <p>For faster login or register use your social account.</p>
                <div className='social-login'>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </div>
            <div className="wave-bg">
                <div className="wave -one" />
                <div className="wave -two" />
            </div>
        </>
    )
}

function ForgotForm(props) {
    const { hideForgotBox, isForgot } = props;
    return (
        <div id="forgot_box" className={isForgot ? '' : 'display-none'}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required').max(255),
                    })}
                onSubmit={(values, { resetForm }) => {
                    // handleRegister(values, resetForm);
                }}
            >
                {formik => (

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label style={custom_form_label}>Please confirm login email below</label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                style={custom_form_input}
                            />
                        </div>
                        <p>You will receive an email containing a link allowing you to reset your password to a new
                            preferred one.</p>
                        <div className="text-center">
                            <button className="btn float-btn color2-bg" style={custom_form_button} onClick={hideForgotBox}>Back</button>
                            <button type="submit" className="btn float-btn color2-bg" style={custom_form_button}>Reset Password</button>
                        </div>
                    </form>
                )}
            </Formik>


        </div>

    )
}