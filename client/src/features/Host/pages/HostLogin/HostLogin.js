import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { hostLogin, login } from '../../../../app/reducer/userSlice';
import { useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css'
import { unwrapResult } from '@reduxjs/toolkit';
import { Spinner } from 'react-bootstrap';
import { loginFacebook, loginGoogle } from '../../../../app/reducer/guestSlice';
import userApi from '../../../../api/userApi';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import './HostLogin.scss';
import useWindowDimensions from '../../../../@use/useWindowDimensions';

// HostLogin.propTypes = {

// };

// function HostLogin(props) {
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();
//     const history = useHistory();


//     const handleLogin = async (values, resetForm) => {
//         try {
//             const params = {
//                 email: values.email,
//                 password: values.password
//             }
//             setLoading(true);
//             await dispatch(hostLogin(params)).then(() => {
//                 history.push('/host/listings');
//             });
//             setLoading(false);
//             // setTriggerPopup(false);
//             resetForm();
//         } catch (err) {
//             console.log(err.message)
//             setLoading(false);
//         }
//     }

//     return (
//         <div style={{ width: "50%" }}>
//             <h2>HOST LOGIN</h2>
//             <Formik
//                 initialValues={{ email: '', password: '' }}
//                 onSubmit={(values, { setSubmitting }) => {
//                     handleLogin(values);
//                 }}
//                 validationSchema={
//                     Yup.object({
//                         email: Yup.string().email('Invalid email address').required('Required'),
//                         password: Yup.string()
//                             // .max(1, 'Must be 1 characters or less')
//                             .required('Required'),
//                     })}
//                 onSubmit={(values, { resetForm }) => {
//                     handleLogin(values, resetForm);
//                 }}
//             >
//                 {formik => (
//                     <form onSubmit={formik.handleSubmit}>
//                         <input
//                             type='text'
//                             placeholder='email'
//                             {...formik.getFieldProps('email')}
//                         />
//                         {formik.touched.email && formik.errors.email ? (
//                             <div>{formik.errors.email}</div>
//                         ) : null}
//                         <input
//                             type='password'
//                             placeholder='password'
//                             {...formik.getFieldProps('password')}
//                         />
//                         {formik.touched.email && formik.errors.email ? (
//                             <div>{formik.errors.email}</div>
//                         ) : null}
//                         <button type='submit'>Login</button>
//                     </form>
//                 )}
//             </Formik>
//         </div>
//     );
// }

// export default HostLogin;



HostLogin.propTypes = {

};

const main_register_holder = {
    margin: '0px auto',
    // position: 'relative',
    width: '410px',
}

const main_register = {
    float: 'left',
    width: '100%',
    position: 'relative',
    padding: '30px 0px 30px',
    marginTop: '50px',
    background: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)'
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



const tabs_container = {
    float: 'left',
    width: '100%',
    marginTop: '10px',
    padding: '0 30px',
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
    height: 50,
    // marginBottom: 12,
}

const custom_form_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0px',
    width: '48%',
    padding: '13px 0',
    color: '#fff',
    // marginLeft: '50%',
    // transform: 'translateX(-50%)',
}

const filter_tags = {
    float: 'left',
    color: '#7d93b2',
    fontSize: '12px',
    fontWeight: 600,
    marginTop: '18px',
}

const label_rmbm = {
    fontSize: '11px',
    color: '#7d93b2',
    paddingBottom: '12px',
    float: 'left',
    padding: '0 10px',
    position: 'relative',
    top: '0px',
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

const errorLogin = { color: 'red', margin: '-12px 0 0', fontSize: '12px' }

function HostLogin(props) {
    const deviceToken = useSelector(state => state.userSlice.deviceToken);
    const [loading, setLoading] = useState(false);
    const [tabLogin, setTabLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');

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
            await dispatch(hostLogin(params)).then(() => {
                resetForm();
                setLoading(false);
                history.push('/host/booking');
            });
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

    const handleSendMailResetPassword = async (values, resetForm) => {
        try {
            setLoading(true);
            await userApi.sendMailResetPassword({ mail: values.email }).then(res => {
                resetForm();
                setMessageSuccess('You will receive an email containing a link allowing you to reset your password.');
                setLoading(false);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const { close } = props;

    const { height } = useWindowDimensions();

    return (
        <div id='host-login' className='gray-bg' style={{ width: window.innerWidth, minHeight: height }}>
            <div className="k-main-register-holder tabs-act" style={main_register_holder}>
                <div className="k-main-register fl-wrap" style={main_register}>
                    <h2 className='host-login-title'>HOST LOGIN</h2>
                    {/*tabs */}
                    <div className="k-tabs-container" style={tabs_container}>
                        <div className={isForgot ? "k-tab display-none" : "k-tab"} style={{ width: '100%', float: 'left' }}>
                            {/* TAB LOGIN */}
                            <TabLogin
                                tabLogin={tabLogin}
                                handleLogin={handleLogin}
                                loading={loading}
                                showForgotBox={() => setIsForgot(true)}
                                uiConfig={uiConfig}
                            />

                        </div>

                        {/* FORGOT PASSWORD */}
                        <ForgotForm
                            hideForgotBox={() => setIsForgot(false)}
                            isForgot={isForgot}
                            handleSendMailResetPassword={handleSendMailResetPassword}
                            messageSuccess={messageSuccess}
                            loading={loading}
                        />

                    </div>
                </div>
            </div >
        </div>
    );
}

export default HostLogin;


function TabLogin(props) {
    const { tabLogin, handleLogin, loading, showForgotBox, uiConfig } = props;
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
                                <label className='custom_form_label' style={errorLogin}>{formik.errors.email}</label>
                            ) : null}

                            <label style={custom_form_label}>Password <span>*</span> </label>
                            <input
                                type="password"
                                {...formik.getFieldProps('password')}
                                style={custom_form_input}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <label className='custom_form_label' style={errorLogin}>{formik.errors.password}</label>
                            ) : null}
                            <button type="submit" className="btn float-btn color2-bg" style={custom_form_button}>{loading ? <PulseLoading /> : 'Sign in'} </button>
                            <div className="clearfix" />
                            <div className="k-filter-tags" style={filter_tags}>
                                <input id="check-a3" type="checkbox" name="check" />
                                <label htmlFor="check-a3" style={label_rmbm}>Remember me</label>
                            </div>
                            <div className="lost_password" style={{ marginTop: '18px', float: 'right' }}>
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

            {/* LOGIN SOCIAL */}
            <SocialLogin uiConfig={uiConfig} />
        </div>
    );
}

function SocialLogin(props) {
    const { uiConfig } = props;
    return (
        <>
            <div className="k-log-separator fl-wrap" style={{ textAlign: 'center', padding: '20px 0' }}><span style={log_separator_span}>or</span></div>
            <div className="soc-log fl-wrap">
                <div className='social-login'>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </div>

        </>
    )
}

function ForgotForm(props) {

    const { hideForgotBox, isForgot, handleSendMailResetPassword, messageSuccess, loading } = props;


    return (
        <div id="forgot_box" className={isForgot ? '' : 'display-none'}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required').max(255),
                    })}
                onSubmit={(values, { resetForm }) => {
                    handleSendMailResetPassword(values, resetForm);
                }}
            >
                {formik => (

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label className='fgb_label' style={custom_form_label}>Please confirm login email below</label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                style={custom_form_input}
                            />
                        </div>
                        {messageSuccess && <p>{messageSuccess}</p>}
                        <div className="">
                            <button className="btn float-btn color2-bg" style={custom_form_button} onClick={hideForgotBox}>Back</button>
                            <button type="submit" className="btn float-btn color2-bg" style={custom_reset_button}>{loading ? <Spinner animation="border" variant="secondary" size="sm" /> : 'Reset Password'}</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

const custom_reset_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0px',
    width: '48%',
    padding: '13px 0',
    color: '#fff',
    float: 'right',
}