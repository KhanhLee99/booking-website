import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CommonAdmin.scss';
import ReactNotificationComponent from '../Notification/ReactNotification';

CommonAdmin.propTypes = {

};

function CommonAdmin(props) {
    const [showNoti, setShowNoti] = useState(false);

    const show = () => {
        setShowNoti(true);
    }

    return (
        <>
            {showNoti ? (
                <ReactNotificationComponent
                />
            ) : (
                <></>
            )}

            <div>

                <section className="gray-bg main-dashboard-sec" id="sec1">
                    <div className="container">
                        {/*  dashboard-menu*/}
                        <div className="col-md-3">
                            <div className="mob-nav-content-btn color2-bg init-dsmen fl-wrap"><i className="fal fa-bars" />
                                Dashboard menu</div>
                            <div className="clearfix" />
                            <div className="fixed-bar fl-wrap" id="dash_menu">
                                <div className="user-profile-menu-wrap fl-wrap block_box">
                                    <div className="user-profile-menu">
                                        <h3>Main</h3>
                                        <ul className="no-list-style">
                                            <li><a href="dashboard.html"><i className="fal fa-chart-line" />Dashboard</a>
                                            </li>
                                            <li><a href="dashboard-feed.html"><i className="fal fa-rss" />Your Feed
                                                <span>7</span></a></li>
                                            <li><a href="dashboard-myprofile.html"><i className="fal fa-user-edit" /> Edit
                                                profile</a></li>
                                            <li><a href="dashboard-messages.html"><i className="fal fa-envelope" />
                                                Messages <span>3</span></a></li>
                                            <li><a href="dashboard-password.html"><i className="fal fa-key" />Change
                                                Password</a></li>
                                        </ul>
                                    </div>
                                    <div className="user-profile-menu">
                                        <h3>Listings</h3>
                                        <ul className="no-list-style">
                                            <li><a href="dashboard-listing-table.html" className="user-profile-act"><i className="fal fa-th-list" /> My listigs </a></li>
                                            <li><a href="dashboard-bookings.html"> <i className="fal fa-calendar-check" />
                                                Bookings <span>2</span></a></li>
                                            <li><a href="dashboard-review.html"><i className="fal fa-comments-alt" />
                                                Reviews </a></li>
                                            <li><a href="dashboard-add-listing.html"><i className="fal fa-file-plus" />
                                                Add New</a></li>
                                        </ul>
                                    </div>
                                    <button className="logout_btn color2-bg">Log Out <i className="fas fa-sign-out" /></button>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>


                        <div className="col-md-9">
                            {props.children}
                        </div>
                    </div>
                </section>
                <div className="limit-box fl-wrap" />
            </div>
        </>

    );
}

export default CommonAdmin;