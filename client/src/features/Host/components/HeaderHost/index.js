import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

HeaderHost.propTypes = {

};

function HeaderHost(props) {
    return (
        <header id="header-container" className="no-shadow">
            {/* Header */}
            <div id="header">
                <div className="container">
                    {/* Left Side Content */}
                    <div className="left-side">
                        {/* Logo */}
                        <div id="logo">
                            <a href="index.html"><img src="images/logo.png" alt="" /></a>
                        </div>
                        {/* Mobile Navigation */}
                        <div className="mmenu-trigger">
                            <button className="hamburger hamburger--collapse" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </div>
                        {/* Main Navigation */}
                        <nav id="navigation" className="style-1">
                            <ul id="responsive">
                                <li><a className="current" href="#">Hôm nay</a></li>
                                <li><a href="#">Hộp thư đến</a></li>
                                <li><a href="#">Thông tin phân tích</a></li>
                                <li><a href="#">Menu</a>
                                    <ul>
                                        <li><a href="dashboard.html">Nhà/phòng cho thuê</a></li>
                                        <li><a href="dashboard-messages.html">Đặt phòng</a></li>
                                        <li><a href="dashboard-bookings.html">Tạo mục cho thuê mới</a></li>
                                        <li><a href="dashboard-wallet.html">Lịch sử giao dịch</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <div className="clearfix" />
                        {/* Main Navigation / End */}
                    </div>
                    {/* Left Side Content / End */}
                    {/* Right Side Content / End */}
                    <div className="right-side">
                        {/* Header Widget */}
                        <div className="header-widget">
                            {/* User Menu */}
                            <div className="user-menu">
                                <div className="user-name"><span><img src="images/dashboard-avatar.jpg" alt="" /></span>Hi, Tom!</div>
                                <ul>
                                    <li><a href="dashboard.html"><i className="sl sl-icon-settings" /> Dashboard</a></li>
                                    <li><a href="dashboard-messages.html"><i className="sl sl-icon-envelope-open" /> Messages</a></li>
                                    <li><a href="dashboard-bookings.html"><i className="fa fa-calendar-check-o" /> Bookings</a></li>
                                    <li><a href="index.html"><i className="sl sl-icon-power" /> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* Header Widget / End */}
                    </div>
                </div>
            </div>
            {/* Header / End */}
        </header>

    );
}

export default HeaderHost;