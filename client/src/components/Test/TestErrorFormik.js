// import { Button } from '@material-ui/core';
// import { unwrapResult } from '@reduxjs/toolkit';
// import userApi from 'api/userApi';
// // import PropTypes from 'prop-types';
// import Footer from 'components/Footer';
// import LoadingUI from 'components/Loading';
// import Images from 'constants/images';
// import InputField from 'custom-fields/InputField';
// import { login, logout, updateUser } from 'features/Auth/userSlice';
// // import { login, logout, updateUser } from 'features/Auth/userSlice';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { FastField, Form, Formik } from 'formik';
// import { useSnackbar } from 'notistack';
// import React, { useEffect, useState } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import * as Yup from 'yup';
// import './SignIn.scss';
// // import * as FaIcons from 'react-icons/fa';

// SignInPage.propTypes = {

// };

// function SignInPage(props) {
//     const dispatch = useDispatch();
//     const [isLoading, setIsLoading] = useState(true);
//     const { enqueueSnackbar } = useSnackbar();
//     const [isError, setIsError] = useState(false);
//     const isRecruiterPath = localStorage.getItem('isRecruiterPath');
//     // const [isOpen, setIsOpen] = useState(false);
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     const [isSigningIn, setIsSigningIn] = useState(false);
//     const [currentRole, setCurrentRole] = useState(null);
//     const listRole = [
//         { id: 3, avatar: Images.avatar, name: 'student-avatar' },
//         { id: 2, avatar: Images.defaultCompany, name: 'employer-avatar' },
//     ]

//     const initialValues = {
//         email: '',
//         password: ''
//     }

//     const validationSchema = Yup.object().shape({
//         email: Yup
//             .string()
//             .email('Email is invalid')
//             .required('Email is required'),
//         password: Yup
//             .string()
//             .required('Password is required')
//     });

//     useEffect(() => {
//         let timer = setTimeout(() => {
//             setIsLoading(false);
//         }, 1000);
//         return () => {
//             clearTimeout(timer);
//         };
//     }, []);

//     useEffect(() => {
//         const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
//             setIsSignedIn(!!user);
//             if (!user) {
//                 return;
//             }
//             setIsSigningIn(true);
//             try {
//                 // const user = values.user;
//                 // if (!user) {
//                 //   return;
//                 // }
//                 const token = await user.getIdToken();
//                 const params = {
//                     role_id: currentRole ?? 3,
//                     social_token: token
//                 };
//                 console.log({ params });
//                 const data = await userApi.loginWithGoogle(params);
//                 if (data.data.status === 1) {
//                     localStorage.setItem('access_token', data.data.data.token);
//                     localStorage.setItem('user', JSON.stringify(data.data.data));
//                     localStorage.setItem('role_id', JSON.stringify(data.data.data.role_id));
//                     isRecruiterPath && localStorage.removeItem('isRecruiterPath');
//                     dispatch(updateUser(data.data.data));
//                 } else {
//                     firebase.auth().signOut();
//                     setIsSignedIn(false);
//                     enqueueSnackbar(data.data.message, { variant: "error" });
//                 }
//                 setIsSigningIn(false);
//                 return;
//             } catch (error) {
//                 firebase.auth().signOut();
//                 setIsSigningIn(false);
//                 setIsSignedIn(false);
//                 console.log("Cannot login with Google account. " + error.message);
//                 enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
//                 return;
//             }
//         });

//         return () => unregisterAuthObserver();
//     }, [currentRole, dispatch, isRecruiterPath, enqueueSnackbar]);

//     const onSignIn = async (values) => {
//         if (values.email === "admin@gmail.com") {
//             setIsError(true);
//         } else {
//             try {
//                 const params = {
//                     email: values.email,
//                     password: values.password
//                 };

//                 const actionResult = await dispatch(login(params));
//                 unwrapResult(actionResult);
//                 isRecruiterPath && localStorage.removeItem('isRecruiterPath');
//             } catch (error) {
//                 setIsError(true);
//                 enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
//             }
//         }
//     };

//     const handleChooseRole = (id) => {
//         console.log(id)
//         setCurrentRole(id);
//     }

//     const onLogoutGoogle = async () => {
//         await firebase.auth().signOut();
//         dispatch(logout());
//     }

//     const uiConfig = {
//         // Popup signin flow rather than redirect flow.
//         signInFlow: 'popup',
//         // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//         // signInSuccessUrl: '/',
//         // We will display Google and Facebook as auth providers.
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//             // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//         ],
//         callbacks: {
//             // Avoid redirects after sign-in.
//             signInSuccessWithAuthResult: () => false,
//         },
//     };

//     const currentUI = isLoading
//         ? <LoadingUI />
//         : (
//             <>
//                 <div className="login">
//                     <div className="login__image">
//                         <img src={Images.teamwork} alt="admin" />
//                     </div>
//                     <div className="login__form">
//                         <div className="login__form__ellipse">
//                             <img src={Images.ellipse} alt="ellipse" />
//                         </div>
//                         <div className="login__form__title">
//                             <span>Sign in</span>
//                             <img src={Images.smDot} alt="smDot" />
//                         </div>
//                         <Formik
//                             initialValues={initialValues}
//                             validationSchema={validationSchema}
//                             onSubmit={onSignIn}
//                         >
//                             {formikProps => {
//                                 const { isSubmitting } = formikProps;

//                                 return (
//                                     <Form>
//                                         <FastField
//                                             name="email"
//                                             component={InputField}

//                                             placeholder="Email"
//                                         />

//                                         <div className="change-password-form">
//                                             <FastField
//                                                 name="password"
//                                                 component={InputField}

//                                                 placeholder="Password*"
//                                                 // type={!isOpen ? "password" : ""}
//                                                 type={"password"}
//                                                 moreClassName="width-100"
//                                                 inputClassName="password-eye-padding"
//                                             />
//                                             {/* {
//                         isOpen
//                           ? <FaIcons.FaRegEye
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="change-password-form__icon password-eye-open"
//                           /> : <FaIcons.FaRegEyeSlash
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="change-password-form__icon"
//                           />

//                       } */}
//                                         </div>

//                                         <div className="form-group remember-forget">
//                                             <div className="remember-forget__left">
//                                                 <input type="checkbox" />
//                                                 <p>Remember</p>
//                                             </div>
//                                             <Link to="/auth/forget-password" className="remember-forget__link">
//                                                 Forget Password
//                                             </Link>
//                                         </div>
//                                         <div className="form-group signin-button">
//                                             <button
//                                                 type="submit"
//                                                 disabled={isSubmitting}
//                                                 style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
//                                                 className="btn btn-success btn-sm"
//                                             >
//                                                 {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
//                                                 Sign in
//                                             </button>
//                                             {isError &&
//                                                 <span className="text-danger form-span">You have entered an invalid username or password</span>}
//                                         </div>
//                                         <div className="form-group under-line">
//                                             <div className="under-line__line" />
//                                             <p>or With</p>
//                                             <div className="under-line__line" />
//                                         </div>

//                                         <div className="choose-role-to-login">
//                                             {/* <button
//                         type="button"
//                         disabled={isSpinner}
//                         style={isSpinner ? { cursor: "default" } : { cursor: "pointer" }}
//                         className="btn btn-sm google"
//                         onClick={onGoogleLogin}
//                       >
//                         {isSpinner && <span className="spinner-border spinner-border-sm mr-2" />}
//                         <FcIcons.FcGoogle className="google__icon" />
//                         Sign in with Google
//                       </button> */}
//                                             {!isSignedIn && <div className="choose-role-to-login__select-role">
//                                                 <span>Sign in with Google as</span>
//                                                 {/* <span>Please select a role if you want to sign in with google.</span> */}
//                                                 <div className="choose-role-to-login__select-role__group-image">
//                                                     {
//                                                         listRole.map((role, index) => {
//                                                             const activeClass = currentRole === role.id ? "choosed-role" : "";
//                                                             return <div
//                                                                 key={index}
//                                                                 className={`choose-role-to-login__select-role__group-image__item ${activeClass}`}
//                                                                 onClick={() => handleChooseRole(role.id)}
//                                                             >
//                                                                 <img
//                                                                     src={role.avatar}
//                                                                     alt={role.name}
//                                                                 />
//                                                             </div>
//                                                         })
//                                                     }
//                                                     {/* <img src={Images.avatar} alt="student-avatar" />
//                           <img src={Images.defaultCompany} alt="employer-avatar" /> */}
//                                                 </div>
//                                             </div>}
//                                             <div className="choose-role-to-login__group-button">
//                                                 {
//                                                     !isSignedIn
//                                                         ? <StyledFirebaseAuth
//                                                             uiConfig={uiConfig}
//                                                             firebaseAuth={firebase.auth()}
//                                                         />
//                                                         : <Button
//                                                             type="button"
//                                                             variant="contained"
//                                                             color="default"
//                                                             disabled={(isSignedIn && isSigningIn)}
//                                                             onClick={onLogoutGoogle}
//                                                         >
//                                                             {
//                                                                 (isSignedIn && isSigningIn)
//                                                                     ? <>
//                                                                         <span className="spinner-border spinner-border-sm mr-2" />
//                                                                         Logged in with Google
//                                                                     </>
//                                                                     : "Logout Google"
//                                                             }
//                                                         </Button>
//                                                 }
//                                                 {/* {
//                           (currentRole === null && !isSignedIn && isGoogleButtonClicked) &&
//                           <span>Please select a role if you want to sign in with google.</span>
//                         } */}
//                                             </div>
//                                         </div>
//                                         <div className="form-group signUp">
//                                             <span>Don't have an account?</span>
//                                             <Link to="/auth/sign-up" className="signUp__link">Sign up</Link>
//                                         </div>

//                                     </Form>
//                                 );
//                             }}
//                         </Formik>
//                     </div>
//                 </div>
//                 <Footer />
//             </>
//         );

//     return <>{currentUI}</>
// }

// export default SignInPage;