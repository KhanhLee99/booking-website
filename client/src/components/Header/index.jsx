import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/reducer/userSlice';
import { getMe } from '../../features/Guest/guestSlice';

import './styles.css';

function Header(props) {
    // const loggedInUser = useSelector((state) => state.userSlice.current);
    // const isLoggedIn = !!loggedInUser.id;

    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     const actionResult = await dispatch(getMe);
        //     const currentUser = unwrapResult(actionResult);
        //     console.log(currentUser);
        // }
        // fetchData();
    }, []);

    const { loggedInUser, isLoggedIn, setTriggerPopup } = props;

    const handleShowPopup = () => {
        setTriggerPopup(true)
    }

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    }

    return (
        <header className="header menu_fixed sticky">
            <div id="preloader">
                <div data-loader="circle-side" />
            </div>{/* /Preload */}
            <div id="logo">
                <a href="index.html">
                    <img src="img/logo.png" width={150} height={36} data-retina="true" alt="" className="logo_normal" />
                    <img src="img/logo_sticky.png" width={150} height={36} data-retina="true" alt="" className="logo_sticky" />
                </a>
            </div>
            <ul id="top_menu">
                {/* <li><a href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">Sign In</a></li> */}
                <li><a href="wishlist.html" className="wishlist_bt_top" title="Your wishlist">Your wishlist</a></li>
            </ul>
            {/* /top_menu */}
            <a href="#menu" className="btn_mobile">
                <div className="hamburger hamburger--spin" id="hamburger">
                    <div className="hamburger-box">
                        <div className="hamburger-inner" />
                    </div>
                </div>
            </a>
            <nav id="menu" className="main-menu">
                <ul>
                    <li><span><a href="#0">Host</a></span></li>
                    {!isLoggedIn ? (
                        <>
                            <li><span><a href="#0">Đăng ký</a></span></li>
                            <li><span><a onClick={handleShowPopup} href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">Đăng nhập</a></span></li>
                        </>
                    ) : (
                        <>
                            <li><span><a href="#0">{loggedInUser.name}</a></span></li>
                            <li><span><a href="#0" onClick={handleLogout}>Log out</a></span></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
export default Header;