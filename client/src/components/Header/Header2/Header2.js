import React from 'react';
import PropTypes from 'prop-types';
// import './styles.scss';

Header2.propTypes = {

};

function Header2(props) {

    const handleShowPopup = (e) => {
        e.preventDefault();
        setTriggerPopup(true)
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
                        <div class="header-widget">
                            <a href="#sign-in-dialog" onClick={(handleShowPopup)} class="sign-in popup-with-zoom-anim"><i class="sl sl-icon-login"></i> Sign In</a>
                            <a href="dashboard-add-listing.html" class="button border with-icon">Add Listing <i class="sl sl-icon-plus"></i></a>
                        </div>
                        {/* Header Widget / End */}
                    </div>
                    {/* Right Side Content / End */}

                </div>
            </div>
            {/* Header / End */}
        </header>


    );
}

export default Header2;