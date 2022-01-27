import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CommonAdmin.scss';
import ReactNotificationComponent from '../Notification/ReactNotification';
import { Link } from 'react-router-dom';
import { HeaderAddListing } from '../../features/Host/components/HeaderHost';

CommonAdmin.propTypes = {

};

function CommonAdmin({ children }) {
    const [showNoti, setShowNoti] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    const showNotification = (title, body) => {
        console.log(title, body);
        setTitle(title);
        setBody(body);
        setShowNoti(true);
    }

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { showNotification });
        }
        return child;
    });

    return (
        <>
            {showNoti && <ReactNotificationComponent
                title={title}
                body={body}
            />}

            <div id=''>
                <HeaderAddListing />
                <section className="gray-bg main-dashboard-sec" id="sec1">
                    <div className="container" style={{ minHeight: window.innerHeight }}>
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
                                            <li><Link to="/admin/dashboard"><i className="fal fa-chart-line" />Dashboard</Link>
                                            </li>
                                            <li><Link to="#"><i className="fal fa-rss" />Your Feed
                                                <span>7</span></Link></li>
                                            {/* <li><a href="dashboard-myprofile.html"><i className="fal fa-user-edit" /> Edit profile</a></li> */}
                                            {/* <li><a href="dashboard-messages.html"><i className="fal fa-envelope" /> Messages <span>3</span></a></li> */}
                                            {/* <li><a href="dashboard-password.html"><i className="fal fa-key" />Change Password</a></li> */}
                                        </ul>
                                    </div>
                                    <div className="user-profile-menu">
                                        <h3>Listings</h3>
                                        <ul className="no-list-style">
                                            <li><Link to="/admin/listing/pending" className="user-profile-act"><i className="fal fa-th-list" />Listigs </Link></li>
                                            {/* <li><Link to="#"> <i className="fal fa-calendar-check" />Bookings <span>2</span></Link></li> */}
                                            <li><Link to="#"><i className="fal fa-comments-alt" />Reviews </Link></li>
                                            {/* <li><a href="dashboard-add-listing.html"><i className="fal fa-file-plus" />Add New</a></li> */}
                                        </ul>
                                    </div>
                                    <button className="logout_btn color2-bg">Log Out <i className="fas fa-sign-out" /></button>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>

                        <div className="col-md-9">
                            {childrenWithProps}
                        </div>
                    </div>
                </section>
                <div className="limit-box fl-wrap" />
            </div>
        </>

    );
}

export default CommonAdmin;