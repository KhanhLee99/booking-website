import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '../../features/Guest/guestSlice';

import './styles.css';

function Header(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     const actionResult = await dispatch(getMe);
        //     const currentUser = unwrapResult(actionResult);
        //     console.log(currentUser);
        // }
        // fetchData();
    }, []);

    return (
        <header className="header menu_fixed">
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
                <li><a href="cart-1.html" className="cart-menu-btn" title="Cart"><strong>4</strong></a></li>
                <li><a href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">Sign In</a></li>
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
                    <li><span><a href="#0">Home</a></span></li>
                    <li><span><a href="#0">Tours</a></span></li>
                    <li><span><a href="#0">Hotels</a></span></li>
                    <li><span><a href="#0">Eat &amp; Drink</a></span></li>
                    <li><span><a href="adventure.html">Adventure</a></span></li>
                    <li><span><a href="#0">Pages</a></span></li>
                    <li><span><a href="#0">Extra</a></span></li>
                    <li><span><a href="#0">Buy template</a></span></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;