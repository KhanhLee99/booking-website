import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';

Dashboard.propTypes = {

};

function Dashboard(props) {
    return (
        <div>
            {/* <div className="gradient-bg-figure" style={{ right: '-30px', top: '10px' }} />
            <div className="gradient-bg-figure" style={{ left: '-20px', bottom: '30px' }} />
            <div className="circle-wrap" style={{ left: '120px', bottom: '120px' }} data-scrollax="properties: { translateY: '-200px' }">
                <div className="circle_bg-bal circle_bg-bal_small" />
            </div>
            <div className="circle-wrap" style={{ right: '420px', bottom: '-70px' }} data-scrollax="properties: { translateY: '150px' }">
                <div className="circle_bg-bal circle_bg-bal_big" />
            </div>
            <div className="circle-wrap" style={{ left: '420px', top: '-70px' }} data-scrollax="properties: { translateY: '100px' }">
                <div className="circle_bg-bal circle_bg-bal_big" />
            </div>
            <div className="circle-wrap" style={{ left: '40%', bottom: '-70px' }}>
                <div className="circle_bg-bal circle_bg-bal_middle" />
            </div>
            <div className="circle-wrap" style={{ right: '40%', top: '-10px' }}>
                <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" />
            </div>
            <div className="circle-wrap" style={{ right: '55%', top: '90px' }}>
                <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" />
            </div> */}
            {/*  section  */}
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
                        <div className="dashboard-title fl-wrap">
                            <h3>Your Listings</h3>
                        </div>
                        <div className="dashboard-list-box fl-wrap">
                            <div className="dashboard-list fl-wrap">
                                <div className="dashboard-message">
                                    <div className="booking-list-contr">
                                        <a href="#" className="color-bg tolt" data-microtip-position="left" data-tooltip="Edit"><i className="fal fa-edit" /></a>
                                        <a href="#" className="red-bg tolt" data-microtip-position="left" data-tooltip="Delete"><i className="fal fa-trash" /></a>
                                    </div>
                                    <div className="dashboard-message-text">
                                        <img src="https://i.ytimg.com/an_webp/SGrGqEKORJk/mqdefault_6s.webp?du=3000&sqp=CKafsY4G&rs=AOn4CLDHqlv09V7yWCkO6V5Y0eatE4yfEg" alt="" />
                                        <h4><a href="listing-single.html">Handmade Shop</a></h4>
                                        <div className="geodir-category-location clearfix"><a href="#"> 34-42 Montgomery
                                            St , NY, USA</a></div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-list fl-wrap">
                                <div className="dashboard-message">
                                    <div className="booking-list-contr">
                                        <a href="#" className="color-bg tolt" data-microtip-position="left" data-tooltip="Edit"><i className="fal fa-edit" /></a>
                                        <a href="#" className="red-bg tolt" data-microtip-position="left" data-tooltip="Delete"><i className="fal fa-trash" /></a>
                                    </div>
                                    <div className="dashboard-message-text">
                                        <img src="https://i.ytimg.com/an_webp/SGrGqEKORJk/mqdefault_6s.webp?du=3000&sqp=CKafsY4G&rs=AOn4CLDHqlv09V7yWCkO6V5Y0eatE4yfEg" alt="" />
                                        <h4><a href="listing-single.html">Handmade Shop</a></h4>
                                        <div className="geodir-category-location clearfix"><a href="#"> 34-42 Montgomery
                                            St , NY, USA</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*  section  end*/}
            <div className="limit-box fl-wrap" />
        </div>
    )
}

export default Dashboard;