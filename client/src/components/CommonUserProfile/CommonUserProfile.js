import React from 'react';
import PropTypes from 'prop-types';
import './CommonUserProfile.scss'
import { Link } from 'react-router-dom';
import Header from '../Header';

CommonUserProfile.propTypes = {

};

function CommonUserProfile(props) {
    return (
        <div style={{ background: '#f6f6f6' }}>
            <Header />

            <section className="gray-bg main-dashboard-sec" id="sec1" style={{ marginTop: '80px' }}>
                <div className="container" style={{ minHeight: window.innerHeight }}>
                    {/*  dashboard-menu*/}
                    <div className="col-md-3">
                        <div className="mob-nav-content-btn color2-bg init-dsmen fl-wrap"><i className="fal fa-bars" />
                            Dashboard menu</div>
                        <div className="clearfix" />
                        <div className="fixed-bar fl-wrap" id="dash_menu">
                            <div className="user-profile-menu-wrap fl-wrap block_box pd-0">
                                <div className="user-profile-menu no-border">
                                    <ul className="no-list-style">
                                        <li className='pl-0'><Link to="/me/profile"><i className="fal fa-user-edit" />Thông tin cá nhân</Link></li>
                                        <li className='pl-0'><Link to="/me/change-password"><i className="fal fa-key" />Thay đổi mật khẩu</Link></li>
                                        <li className='pl-0'><a href="dashboard-myprofile.html"><i className="fal fa-money-check" />Thanh toán</a></li>
                                        <li className='pl-0'><Link to="/me/favorite"><i className="fal fa-heart" />Danh sách yêu thích</Link></li>
                                        <li className='pl-0'><Link to="/me/bookings"><i className="fal fa-calendar-check" />Bookings</Link></li>
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