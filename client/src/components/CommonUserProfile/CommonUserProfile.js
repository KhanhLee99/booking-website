import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CommonUserProfile.scss'
import { Link } from 'react-router-dom';
import Header from '../Header';
import useWindowDimensions from '../../@use/useWindowDimensions';
import { UserProfileTab } from '../../app/constant';

CommonUserProfile.propTypes = {

};

CommonUserProfile.defaultProps = {
    currentTab: ''
}

function CommonUserProfile(props) {
    const { height } = useWindowDimensions();
    const heightSection = height - 100;
    const { currentTab } = props;

    return (
        <div style={{ background: '#f6f6f6' }}>
            <Header />
            <section className="gray-bg main-dashboard-sec" id="sec1">
                <div className="container" style={{ minHeight: heightSection }}>
                    {/*  dashboard-menu*/}
                    <div className="col-md-3">
                        <div className="mob-nav-content-btn color2-bg init-dsmen fl-wrap"><i className="fal fa-bars" />
                            Dashboard menu</div>
                        <div className="clearfix" />
                        <div className="fixed-bar fl-wrap" id="dash_menu">
                            <div className="user-profile-menu-wrap fl-wrap block_box pd-0">
                                <div className="user-profile-menu no-border">
                                    <ul className="no-list-style">
                                        <li className='pl-0'><Link to="/me/profile" className={currentTab == UserProfileTab.USER_PROFILE ? 'active' : ''}><i className="fal fa-user-edit" />User Profile</Link></li>
                                        <li className='pl-0'><Link to="/me/change-password" className={currentTab == UserProfileTab.CHANGE_PASSWORD ? 'active' : ''}><i className="fal fa-key" />Change Password</Link></li>
                                        {/* <li className='pl-0'><a href="dashboard-myprofile.html"><i className="fal fa-money-check" />Thanh toán</a></li> */}
                                        <li className='pl-0'><Link to="/me/favorite" className={currentTab == UserProfileTab.FAVORITE ? 'active' : ''}><i className="fal fa-heart" />Favorite</Link></li>
                                        <li className='pl-0'><Link to="/me/bookings" className={currentTab == UserProfileTab.BOOKINGS ? 'active' : ''}><i className="fal fa-calendar-check" />Bookings</Link></li>
                                        <li className='pl-0'><Link to="/me/inbox" className={currentTab == UserProfileTab.MESSAGE ? 'active' : ''}><i className="fal fa-envelope" />Message</Link></li>
                                    </ul>
                                </div>

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
    );
}

export default CommonUserProfile;