import React from 'react';
import PropTypes from 'prop-types';
// import './styles.scss';
import Popup from 'reactjs-popup';
import LoginPopup from '../../LoginPopup';
import TestUiLogin from '../../Test/TestUiLogin';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

Header2.propTypes = {

};

function Header2(props) {

    const handleShowPopup = (e) => {
        e.preventDefault();
        // setTriggerPopup(true)
    }

    const { loggedInUser, isLoggedIn, setTriggerPopup } = props;

    return (
        <header id="header-container" className="no-shadow">
            {/* Header */}
            <div id="header">
                <div className="container">
                    {/* Left Side Content */}
                    <div className="left-side">
                        {/* Logo */}
                        <div id="logo">
                            <a href="index.html"><img src="/images/logo.png" alt="" /></a>
                        </div>
                        {/* Mobile Navigation */}
                        <div className="mmenu-trigger">
                            <button className="hamburger hamburger--collapse" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </div>

                        <div className="clearfix" />
                        {/* Main Navigation / End */}
                    </div>
                    {/* Left Side Content / End */}
                    {/* Right Side Content / End */}
                    <div className="right-side">
                        {/* Header Widget */}
                        {/* <div className="header-widget">
                            <div className="user-menu">
                                <div className="user-name"><span><img src="images/dashboard-avatar.jpg" alt="" /></span>Hi, Tom!</div>
                                <ul>
                                    <li><a href="dashboard.html"><i className="sl sl-icon-settings" /> Dashboard</a></li>
                                    <li><a href="dashboard-messages.html"><i className="sl sl-icon-envelope-open" /> Messages</a></li>
                                    <li><a href="dashboard-bookings.html"><i className="fa fa-calendar-check-o" /> Bookings</a></li>
                                    <li><a href="index.html"><i className="sl sl-icon-power" /> Logout</a></li>
                                </ul>
                            </div>
                            <a href="dashboard-add-listing.html" className="button border with-icon">Add Listing <i className="sl sl-icon-plus" /></a>
                        </div> */}
                        <div className="header-widget">
                            <Popup trigger={
                                <a href="#" onClick={(handleShowPopup)} className="sign-in popup-with-zoom-anim"><i className="sl sl-icon-login"></i> Sign In</a>
                            }
                                position="center"
                                modal
                                nested
                                closeOnDocumentClick
                                className='popup-content'
                            >
                                <TestUiLogin />
                            </Popup>

                            <Link to="/host/login" className="button border with-icon">Become a host<i className="sl sl-icon-plus"></i></Link>
                        </div>
                    </div>

                </div>
            </div>
        </header>


    );
}

export default Header2;