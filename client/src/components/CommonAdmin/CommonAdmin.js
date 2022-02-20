import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CommonAdmin.scss';
import ReactNotificationComponent, { NotificationStattus } from '../Notification/ReactNotification';
import { Link } from 'react-router-dom';
import { HeaderAddListing } from '../../features/Host/components/HeaderHost';
import useWindowDimensions from '../../@use/useWindowDimensions';
import HeaderAdmin from '../../features/Admin/components/HeaderAdmin';
import { useDispatch } from 'react-redux';
import { deleteDeviceToken } from '../../app/reducer/userSlice';
import { AdminTab } from '../../app/constant';

CommonAdmin.propTypes = {

};
CommonAdmin.defaultProps = {
    currentTab: AdminTab.DASHBOARD
}

function CommonAdmin({ children }) {
    const [showNoti, setShowNoti] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tab, setTab] = useState(AdminTab.DASHBOARD);

    const { currentTab } = children.props;

    const dispatch = useDispatch();

    const showNotification = (title, body) => {
        console.log(title, body);
        setTitle(title);
        setBody(body);
        setShowNoti(true);
    }

    const activeTab = () => {

    }

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeviceToken()).then(() => {
            window.location.reload();
        })
    }

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { showNotification });
        }
        return child;
    });

    const { height } = useWindowDimensions();
    const heightSection = height - 100;

    useEffect(() => {
        setTab(currentTab);
        console.log(currentTab);
    }, [currentTab]);

    return (
        <>
            {showNoti && <ReactNotificationComponent
                title={title}
                body={body}
                status={NotificationStattus.SUCCESS}
            />}

            <div id=''>
                <HeaderAdmin />
                <section className="gray-bg main-dashboard-sec" id="sec1">
                    <div className="container" style={{ minHeight: heightSection }}>
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
                                            <li><Link to="/admin/dashboard" className={tab == AdminTab.DASHBOARD ? 'active' : ''}><i className="fal fa-chart-line" />Dashboard</Link>
                                            </li>
                                            <li><Link to="/admin/payout" className={tab == AdminTab.PAYOUT ? 'active' : ''}><i className="fal fa-money-check" />Payout
                                                {/* <span>7</span> */}
                                            </Link></li>
                                            {/* <li><a href="dashboard-myprofile.html"><i className="fal fa-user-edit" /> Edit profile</a></li> */}
                                            {/* <li><a href="dashboard-messages.html"><i className="fal fa-envelope" /> Messages <span>3</span></a></li> */}
                                            {/* <li><a href="dashboard-password.html"><i className="fal fa-key" />Change Password</a></li> */}
                                        </ul>
                                    </div>
                                    <div className="user-profile-menu">
                                        <h3>Listings</h3>
                                        <ul className="no-list-style">
                                            <li><Link to="/admin/listing/pending" className={tab == AdminTab.LISTINGS ? 'active' : ''}><i className="fal fa-th-list" />Listings </Link></li>
                                            <li><Link to="/admin/booking" className={tab == AdminTab.BOOKINGS ? 'active' : ''}> <i className="fal fa-calendar-check" />Bookings <span>2</span></Link></li>
                                            {/* <li><Link to="#"><i className="fal fa-comments-alt" />Reviews </Link></li> */}
                                        </ul>
                                    </div>
                                    <div className="user-profile-menu">
                                        <h3>Users</h3>
                                        <ul className="no-list-style">
                                            <li><Link to="/admin/users" className={tab == AdminTab.USERS ? 'active' : ''}><i className="fal fa-th-list" />Users </Link></li>
                                            <li><Link to="/admin/hosts" className={tab == AdminTab.HOSTS ? 'active' : ''}> <i className="fal fa-calendar-check" />Hosts <span>2</span></Link></li>
                                        </ul>
                                    </div>
                                    <button className="logout_btn color2-bg" onClick={handleLogout}>Log Out <i className="fas fa-sign-out" /></button>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>

                        <div className="col-xl-9 col-md-12">
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