import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDeviceToken } from '../../app/reducer/userSlice';
import LoginModal from '../LoginModal/LoginModal';
import AvatarPlaceholder from '../Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import './styles.scss';
import { DatePicker } from 'antd';



const main_header = {
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 0,
    height: '80px',
    background: '#2e3f6e',
    zIndex: 999,
    padding: '0 40px',
}

const logo_holder = {
    float: 'left',
    height: '30px',
    position: 'relative',
    top: '20px',
}

const header_search_btn = {
    float: 'left',
    marginLeft: '170px',
    width: '200px',
    padding: '14px 0',
    borderRadius: '30px',
    position: 'relative',
    color: '#fff',
    top: '18px',
    fontWeight: 500,
    fontSize: '13px',
    background: '#3d528b',
    cursor: 'pointer',
    textAlign: 'center'
}

const cart_btn = {
    float: 'right',
    position: 'relative',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '34px',
    top: '28px',
    fontSize: '18px',
}

const cart_counter = {
    position: 'absolute',
    bottom: '-1px',
    width: '14px',
    height: '14px',
    lineHeight: '14px',
    borderRadius: '100%',
    color: '#fff',
    left: '-5px',
    zIndex: 2,
    fontSize: '8px',
    fontWeight: 400,
    background: '#5ECFB1',
    textAlign: 'center'
}

const show_reg_form = {
    float: 'right',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '40px',
    position: 'relative',
    top: '32px',
    fontWeight: '500',
    fontSize: '12px',
}

const nav_button_wrap = {
    float: 'right',
    height: '36px',
    width: '36px',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '4px',
    top: '24px',
    marginRight: '16px',
    display: 'none',
    background: '#4DB7FE'
}

const header_search_input = {
    width: '32%',
    float: 'left',
    padding: '0 4px',
    position: 'relative',
}

const header_search_input_label = {
    position: 'absolute',
    left: '20px',
    top: '14px',
    zIndex: 10,
    fontSize: '14px',
}

const header_search_input_input = {
    float: 'left',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.11)',
    borderRadius: '4px',
    position: 'relative',
    height: '50px',
    padding: '0 20px 0 40px',
    zIndex: 1,
    width: '100%',
    color: '#fff',
    boxSizing: 'border-box',
    borderBottom: '2px solid rgba(255, 255, 255, 0)',
}

const header_search_selectinpt = {
    float: 'left',
    width: '36%',
    padding: '0 4px',
}

const header_user_menu = {
    float: 'right',
    position: 'relative',
    top: '20px',
    marginLeft: '50px',
    marginRight: '40px',
}

const header_user_name = {
    position: 'relative',
    float: 'left',
    cursor: 'pointer',
    color: '#fff',
    transition: '0.2s',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingTop: '10px',
    fontWeight: 600,
}

const header_user_name_span = {
    position: 'absolute',
    width: '38px',
    height: '38px',
    borderRadius: '100%',
    overflow: 'hidden',
    top: 0,
    left: '-50px',
    fontWeight: 400,
}

const header_user_name_span_img = {
    width: '100%',
    height: '100%',
}

const header_user_menu_ul = {
    margin: '10px 0 0 0',
    opacity: 0,
    listStyle: 'none',
    visibility: 'hidden',
    position: 'absolute',
    minWidth: '150px',
    top: '60px',
    left: '-50px',
    zIndex: 1,
    padding: '10px 0',
    background: '#fff',
    borderRadius: '6px',
    border: '1px solid #eee',
    transition: 'all 0.2s ease-in-out',
}

const header_user_menu_ul_li = {
    float: 'left',
    width: '100%',
    padding: '0px 0',
    borderBottom: '1px solid #f6f6f6',
}

const header_user_menu_ul_li_a = {
    color: '#50596e',
    float: 'left',
    width: '100%',
    fontWeight: 500,
    textAlign: 'left',
    padding: '6px 15px',
}

const { RangePicker } = DatePicker;

function Header(props) {

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const [showPopupProfile, setShowPopupProfile] = useState(false);
    const [showPopupSearch, setShowPopupSearch] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeviceToken()).then(() => {
            refreshPage();
        })
    }

    const refreshPage = () => {
        window.location.reload();
    }

    // const { loggedInUser, isLoggedIn } = props;


    return (

        <header className="k-main-header" style={main_header}>
            <Link to="/" className="k-logo-holder" style={logo_holder}><img src="https://i.ytimg.com/vi/FPtITmtjWhQ/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3TdlYzQKkXD7XtPbNwCGLGycr2Q" alt="" style={{ width: 'auto', height: '100%' }} /></Link>
            {/* header-search_btn*/}
            <div
                className="k-header-search_btn show-search-button"
                style={header_search_btn}
                onClick={() => setShowPopupSearch(!showPopupSearch)}
            >
                <i className="fal fa-search" style={{ color: '#4DB7FE', marginRight: '30px' }} /> <span style={{ position: 'relative' }}>Search</span>
            </div>
            {/* header opt */}
            {
                isLoggedIn ? <>
                    <div className="k-cart-btn show-header-modal" data-microtip-position="bottom" role="tooltip" aria-label="Your Wishlist" style={cart_btn}>
                        <i className="fas fa-bell" style={{ width: '12px' }} /><span className="k-cart-counter" style={cart_counter} >4</span>
                    </div>

                    <div className="header-user-menu hu-menu-visdec" style={header_user_menu}>
                        <div className="header-user-name" style={header_user_name} onClick={() => setShowPopupProfile(!showPopupProfile)}>
                            <span style={header_user_name_span}>
                                <AvatarPlaceholder
                                    avatar_url={loggedInUser.avatar_url}
                                    style={header_user_name_span_img}
                                />
                            </span>
                            {loggedInUser.name}
                        </div>
                        <ul className={showPopupProfile ? 'hu-menu-vis' : ''}>
                            <li style={header_user_menu_ul_li}><Link to="/me/profile" style={header_user_menu_ul_li_a}> Edit profile</Link></li>
                            <li style={header_user_menu_ul_li}><Link to="/me/bookings" style={header_user_menu_ul_li_a}>  Bookings</Link></li>
                            <li style={header_user_menu_ul_li}><Link to="/me/favorite" style={header_user_menu_ul_li_a}> Danh sách yêu thích </Link></li>
                            {loggedInUser.role_id === 2 ?
                                <li style={header_user_menu_ul_li}><Link to="/host/listings" style={header_user_menu_ul_li_a}>Quản lý nhà/phòng cho thuê</Link></li>
                                : null}
                            <li style={header_user_menu_ul_li}><a href="#" style={header_user_menu_ul_li_a} onClick={(e) => handleLogout(e)}> Log Out</a></li>
                        </ul>
                    </div>
                </> :
                    <LoginModal>
                        <div className="k-show-reg-form modal-open avatar-img" data-srcav="images/avatar/3.jpg" style={show_reg_form}><i className="fal fa-user" style={{ color: '#4DB7F', marginRight: '14px' }} />Sign In</div>
                    </LoginModal>
            }

            {/* nav-button-wrap*/}
            <div className="k-nav-button-wrap" style={nav_button_wrap}>
                <div className="nav-button">
                    <span /><span /><span />
                </div>
            </div>

            <div className={showPopupSearch ? "k-header-search_container vis-head-search" : "k-header-search_container"}>
                <div className="container small-container" style={{ maxWidth: '1024px', width: '92%', margin: '0 auto', position: 'relative', zIndex: 5 }}>
                    <div className="header-search-input-wrap fl-wrap" style={{ padding: '0 199px 0 0' }}>

                        <div className="k-header-search-input location autocomplete-container" style={header_search_input}>
                            <label style={header_search_input_label}><i className="fal fa-map-marker" style={{ color: '#4DB7FE' }} /></label>
                            <input type="text" placeholder="Location..." className="autocomplete-input" id="autocompleteid2" style={header_search_input_input} />
                        </div>

                        <div className="k-header-search-input" style={header_search_input}>
                            <label style={header_search_input_label}><i className="fal fa-keyboard" style={{ color: '#4DB7FE' }} /></label>
                            <input type="text" placeholder="What are you looking for ?" style={header_search_input_input} />
                        </div>

                        <div className="k-header-search-input" style={header_search_input}>
                            <label style={header_search_input_label}><i className="fal fa-keyboard" style={{ color: '#4DB7FE' }} /></label>
                            <RangePicker
                                format="DD/MM/YYYY"
                                placeholder={['Checkin', 'Checkout']}
                                suffixIcon
                                // onChange={handleChangeDebut}
                                style={header_search_input_input}
                                inputReadOnly
                            />
                        </div>

                        {/* <div className="k-header-search-input header-search_selectinpt" style={header_search_input, header_search_selectinpt}>
                            <select data-placeholder="Category" className="chosen-select no-radius">
                                <option>All Categories</option>
                                <option>All Categories</option>
                                <option>Shops</option>
                                <option>Hotels</option>
                                <option>Restaurants</option>
                                <option>Fitness</option>
                                <option>Events</option>
                            </select>
                        </div> */}

                        <button className="header-search-button green-bg" onclick="window.location.href='listing.html'"><i className="far fa-search" /> Search </button>
                    </div>
                </div>
            </div>

            {/* wishlist-wrap*/}
            <div className="header-modal novis_wishlist">
                <div className="header-modal-container scrollbar-inner fl-wrap" data-simplebar>
                    {/* <div className="widget-posts  fl-wrap">
                        <ul className="no-list-style">
                            <li>
                                <div className="widget-posts-img"><a href="listing-single.html"><img src="https://i.ytimg.com/vi/hRvJ31HpWY4/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiLzKdiWmF-dSCIcsEwiQo3u6AIw" alt="" /></a>
                                </div>
                                <div className="widget-posts-descr">
                                    <h4><a href="listing-single.html">Iconic Cafe</a></h4>
                                    <div className="geodir-category-location fl-wrap"><a href="#"><i className="fas fa-map-marker-alt" /> 40 Journal Square Plaza, NJ, USA</a>
                                    </div>
                                    <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a> <a href="listing.html">Cafe</a></div>
                                    <div className="widget-posts-descr-score">4.1</div>
                                </div>
                            </li>
                            <li>
                                <div className="widget-posts-img"><a href="listing-single.html"><img src="https://i.ytimg.com/vi/hRvJ31HpWY4/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiLzKdiWmF-dSCIcsEwiQo3u6AIw" alt="" /></a>
                                </div>
                                <div className="widget-posts-descr">
                                    <h4><a href="listing-single.html">Iconic Cafe</a></h4>
                                    <div className="geodir-category-location fl-wrap"><a href="#"><i className="fas fa-map-marker-alt" /> 40 Journal Square Plaza, NJ, USA</a>
                                    </div>
                                    <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a> <a href="listing.html">Cafe</a></div>
                                    <div className="widget-posts-descr-score">4.1</div>
                                </div>
                            </li>
                            <li>
                                <div className="widget-posts-img"><a href="listing-single.html"><img src="https://i.ytimg.com/vi/hRvJ31HpWY4/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiLzKdiWmF-dSCIcsEwiQo3u6AIw" alt="" /></a>
                                </div>
                                <div className="widget-posts-descr">
                                    <h4><a href="listing-single.html">Iconic Cafe</a></h4>
                                    <div className="geodir-category-location fl-wrap"><a href="#"><i className="fas fa-map-marker-alt" /> 40 Journal Square Plaza, NJ, USA</a>
                                    </div>
                                    <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a> <a href="listing.html">Cafe</a></div>
                                    <div className="widget-posts-descr-score">4.1</div>
                                </div>
                            </li>
                        </ul>
                    </div> */}

                    <div className='notification-title'>
                        <h3>Notifications</h3>
                    </div>

                    <div className="notification-list-box fl-wrap">

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="notification-list fl-wrap">
                            <div className="notification-message">
                                <div className="notification-message-text">
                                    <i className="far fa-heart purp-bg"></i>
                                    <div>
                                        <p><a href="#">Mark Rose</a> add new Listing Park Central add new Listing Park Central</p>
                                        <p className="notificattion-message-time">28 may 2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



                <div className="header-modal-top fl-wrap">
                    <h4>Your Wishlist : <span><strong /> Locations</span></h4>
                    <div className="close-header-modal"><i className="far fa-times" /></div>
                </div>
            </div>
        </header >

    )
}
export default Header;