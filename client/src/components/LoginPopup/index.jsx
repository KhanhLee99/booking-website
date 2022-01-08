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
    borderBottom: '3px solid transparent',
    width: '50%',
    borderColor: '#4DB7FE'
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
}

const custom_form_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0px',
}

const btn_i = {
    // position: 'absolute',
    // right: '20px',
    // top: '50%',
    // height: '20px',
    // width: '20px',
    // borderRadius: '100%',
    // lineHeight: '20px',
    // marginTop: '-10px',
    // transition: 'all 200ms linear',
}

const filter_tags = {
    float: 'left',
    color: '#7d93b2',
    fontSize: '12px',
    fontWeight: 600,
}

const filter_tags_input = {
    float: 'left',
    position: 'relative',
    border: '1px solid #ccc',
    cursor: 'pointer',
    padding: 0,
    width: '20px',
    height: '20px',
    position: 'relative',
    borderRadius: '2px',
    color: '#fff',
    background: '#fff',
    marginBottom: '20px',
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
    // const deviceToken = useSelector(state => state.userSlice.deviceToken);
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
        // trigger ? (
        //     <div className="k-pop-up">
        //         <div id="sign-in-dialog" className="zoom-anim-dialog">
        //             <Formik
        //                 initialValues={{
        //                     email: '',
        //                     password: '',
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
        //                     <>
        //                         <div className="small-dialog-header">
        //                             <h3>Sign In</h3>
        //                             <button onClick={handleClosePopup.bind(null, formik.resetForm)} title="%title%" type="button" className="mfp-close"></button>
        //                         </div>

        //                         <form onSubmit={formik.handleSubmit}>
        //                             <div className="sign-in-wrapper">
        //                                 <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        //                                 <div className="divider"><span>Or</span></div>
        //                                 <div className="form-group">
        //                                     <label htmlFor="email">Email</label>
        //                                     <input
        //                                         id="email"
        //                                         type="email"
        //                                         className="form-control"
        //                                         {...formik.getFieldProps('email')}
        //                                     />
        //                                     {formik.touched.email && formik.errors.email ? (
        //                                         <div>{formik.errors.email}</div>
        //                                     ) : null}
        //                                     <i className="icon_mail_alt" />
        //                                 </div>
        //                                 <div className="form-group">
        //                                     <label htmlFor="password">Password</label>
        //                                     <input
        //                                         id="password"
        //                                         type="password"
        //                                         className="form-control"
        //                                         {...formik.getFieldProps('password')}
        //                                     />
        //                                     {formik.touched.email && formik.errors.email ? (
        //                                         <div>{formik.errors.email}</div>
        //                                     ) : null}
        //                                     <i className="icon_lock_alt" />
        //                                 </div>
        //                                 <div className="clearfix add_bottom_15">
        //                                     <div className="checkboxes float-left">
        //                                         <label className="container_check">Remember me
        //                                             <input type="checkbox" />
        //                                             <span className="checkmark" />
        //                                         </label>
        //                                     </div>
        //                                     <div className="float-right mt-1"><a id="forgot" href="javascript:void(0);">Forgot Password?</a></div>
        //                                 </div>
        //                                 <div className="text-center">
        //                                     <button type="submit" className="btn_1 full-width" disabled={loading ? true : false}>{loading ? <PulseLoading /> : "Log In"}</button>
        //                                 </div>
        //                                 <div className="text-center">
        //                                     Don’t have an account?<a href="register.html">Sign up</a>
        //                                 </div>
        //                                 {/* <div id="forgot_pw">
        //                                     <div className="form-group">
        //                                         <label>Please confirm login email below</label>
        //                                         <input type="email" className="form-control" name="email_forgot" id="email_forgot" />
        //                                         <i className="icon_mail_alt" />
        //                                     </div>
        //                                     <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
        //                                     <div className="text-center"><input type="submit" defaultValue="Reset Password" className="btn_1" /></div>
        //                                 </div> */}
        //                             </div>
        //                         </form>
        //                     </>
        //                 )}
        //             </Formik>

        //         </div>
        //     </div >
        // ) : null

        <div className="k-main-register-holder tabs-act" style={main_register_holder}>
            <div className="k-main-register fl-wrap  modal_main" style={main_register}>
                <div className="k-main-register_title" style={main_register_title}>Welcome to <span style={{ textTransform: 'uppercase', fontWeight: 800 }}><strong style={{ color: '#4DB7FE' }}>Town</strong>Hub<strong style={{ color: '#4DB7FE' }}>.</strong></span>
                </div>
                <div className="k-close-reg" style={close_reg}><i className="fal fa-times" /></div>
                <ul className="tabs-menu fl-wrap" style={{ padding: '0 30px', listStyle: 'none' }}>
                    <li className="current" style={tabs_menu_li}><a href="#tab-1" style={tabs_menu_li_a}><i className="fal fa-sign-in-alt" style={{ color: '#4DB7FE' }} /> Login</a></li>
                    <li style={tabs_menu_li}><a href="#tab-2" style={tabs_menu_li_a}><i className="fal fa-user-plus" style={{ color: '#4DB7FE' }} /> Register</a></li>
                </ul>
                {/*tabs */}
                <div className="k-tabs-container" style={tabs_container}>
                    <div className="k-tab" style={{ width: '100%', float: 'left' }}>
                        {/*tab */}
                        <div id="tab-1" className="k-tab-content k-first-tab">
                            <div className="k-custom-form" style={custom_form}>
                                <form method="post" name="registerform">
                                    <label style={custom_form_label}>Username or Email Address <span>*</span> </label>
                                    <input name="email" type="text" onclick="this.select()" style={custom_form_input} />
                                    <label style={custom_form_label}>Password <span>*</span> </label>
                                    <input name="password" type="password" onclick="this.select()" style={custom_form_input} />
                                    <button type="submit" className="btn float-btn color2-bg" style={custom_form_button}> Log In <i className="fas fa-caret-right" style={btn_i} /></button>
                                    <div className="clearfix" />
                                    <div className="k-filter-tags" style={filter_tags}>
                                        <input id="check-a3" type="checkbox" name="check" style={filter_tags_input} />
                                        <label htmlFor="check-a3" style={label_rmbm}>Remember me</label>
                                    </div>
                                </form>
                                <div className="lost_password" style={{ marginTop: '24px', float: 'right' }}>
                                    <a href="#" style={{ float: 'left', fontSize: '12px', fontWeight: 600, }}>Lost Your Password?</a>
                                </div>
                            </div>
                        </div>
                        {/*tab end */}
                        {/*tab */}
                        <div className="tab">
                            <div id="tab-2" className="k-tab-content" style={{ display: 'none' }}>
                                <div className="k-custom-form" style={custom_form}>
                                    <form method="post" name="registerform" className="main-register-form" id="main-register-form2">
                                        <label style={custom_form_label}>Full Name <span>*</span> </label>
                                        <input name="name" type="text" onclick="this.select()" style={custom_form_input} />
                                        <label style={custom_form_label}>Email Address <span>*</span></label>
                                        <input name="email" type="text" onclick="this.select()" style={custom_form_input} />
                                        <label style={custom_form_label}>Password <span>*</span></label>
                                        <input name="password" type="password" onclick="this.select()" style={custom_form_input} />

                                        <div className="clearfix" />
                                        <button type="submit" className="btn float-btn color2-bg"> Register <i className="fas fa-caret-right" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/*tab end */}
                    </div>
                    {/*tabs end */}
                    <div className="k-log-separator fl-wrap" style={{ textAlign: 'center' }}><span style={log_separator_span}>or</span></div>
                    <div className="soc-log fl-wrap">
                        <p>For faster login or register use your social account.</p>
                        <a href="#" className="facebook-log"> Facebook</a>
                    </div>
                    <div className="wave-bg">
                        <div className="wave -one" />
                        <div className="wave -two" />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default LoginPopup;