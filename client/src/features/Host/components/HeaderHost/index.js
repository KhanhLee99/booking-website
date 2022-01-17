import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import LoginModal from '../../../../components/LoginModal/LoginModal';
import { deleteDeviceToken } from '../../../../app/reducer/userSlice';

HeaderHost.propTypes = {

};

const nav_holder = {
    float: 'left',
    // position: 'relative',
    // right: 0,
    top: '18px',
    marginLeft: '40px',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
}

const nav_holder_nav = {
    // position: 'relative',
    // float: 'right',
    // textAlign: 'center'
}

const nav_holder_nav_li = {
    float: 'left',
    position: 'relative',
    marginLeft: '6px',
    height: '50px',
}

const nav_holder_nav_li_a = {
    float: 'left',
    padding: '10px',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 600,
    textTransform: 'none',
    lineHeight: '25px',
    letterSpacing: '0px',
    color: '#fff',
    transition: 'all 100ms linear',
}

const nav_holder_nav_li_ul = {
    margin: '30px 0 0 0',
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
    minWidth: '150px',
    top: '50px',
    left: 0,
    zIndex: 1,
    padding: '10px 0',
    background: '#fff',
    borderRadius: '6px',
    border: '1px solid #eee',
    transition: 'all 0.2s ease-in-out',
    listStyle: 'none',
}

const nav_holder_nav_li_a_i = {
    paddingLeft: '6px',
    transition: 'all 200ms linear',
}

const nav_holder_nav_li_ul_li = {
    width: '100%',
    float: 'left',
    height: 'auto',
    position: 'relative',
    marginLeft: '6px',
}

const nav_holder_nav_li_ul_a = {
    color: '#566985',
    float: 'left',
    width: '100%',
    fontWeight: 500,
    textAlign: 'left',
    padding: '5px 15px',
    fontSize: '13px',
    fontStyle: 'normal',
    textTransform: 'none',
    lineHeight: '25px',
    letterSpacing: '0px',
    transition: 'all 100ms linear',

}

function HeaderHost(props) {

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const [showPopupProfile, setShowPopupProfile] = useState(false);
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeviceToken()).then(() => {
            refreshPage();
        })
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <header className="k-main-header relative" style={main_header}>
            <Link to="/" className="k-logo-holder" style={logo_holder}><img src="https://i.ytimg.com/vi/FPtITmtjWhQ/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3TdlYzQKkXD7XtPbNwCGLGycr2Q" alt="" style={{ width: 'auto', height: '100%' }} /></Link>
            {/* header opt */}
            {
                isLoggedIn ? <>
                    <div className="k-cart-btn show-header-modal" data-microtip-position="bottom" role="tooltip" aria-label="Your Wishlist" style={cart_btn}>
                        <i className="fas fa-bell" style={{ width: '12px' }} /><span className="k-cart-counter" style={cart_counter} >4</span>
                    </div>

                    <div className="header-user-menu hu-menu-visdec" style={header_user_menu}>
                        <div
                            className="header-user-name"
                            style={header_user_name}
                            onClick={() => setShowPopupProfile(!showPopupProfile)}
                        >
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

            {/*  navigation */}
            <div className="nav-holder main-menu" style={nav_holder}>
                <nav style={nav_holder_nav}>
                    <ul className="no-list-style">
                        <li style={nav_holder_nav_li}><a href="#" style={nav_holder_nav_li_a}>Hôm nay </a></li>
                        <li style={nav_holder_nav_li}><a href="#" className="act-link" style={nav_holder_nav_li_a}>Hộp thư đến</a></li>
                        <li style={nav_holder_nav_li}><a href="blog.html" style={nav_holder_nav_li_a}>Thông tin phân tích</a></li>
                        <li style={nav_holder_nav_li}
                            onClick={toggleHover}
                        >
                            <a href="#" style={nav_holder_nav_li_a}>Menu<i className="fa fa-caret-down" style={nav_holder_nav_li_a_i} /></a>
                            <ul className={hovered ? 'nav_holder_nav_li_ul hu-menu-vis' : 'nav_holder_nav_li_ul'}>
                                <li style={nav_holder_nav_li_ul_li}><Link to="/host/listings" style={nav_holder_nav_li_ul_a}>Nhà/phòng cho thuê</Link></li>
                                <li style={nav_holder_nav_li_ul_li}><Link to="/host/booking" style={nav_holder_nav_li_ul_a}>Đặt phòng</Link></li>
                                <li style={nav_holder_nav_li_ul_li}><Link to="/host/reviews" style={nav_holder_nav_li_ul_a}>Reviews</Link></li>
                                <li style={nav_holder_nav_li_ul_li}><a href="dashboard-bookings.html" style={nav_holder_nav_li_ul_a}>Tạo mục cho thuê mới</a></li>
                                <li style={nav_holder_nav_li_ul_li}><a href="dashboard-wallet.html" style={nav_holder_nav_li_ul_a}>Lịch sử giao dịch</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    );
}

export default HeaderHost;

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
    marginLeft: '70px',
    width: '180px',
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

const header_search_container = {
    position: 'absolute',
    bottom: '-120px',
    left: 0,
    width: '100%',
    padding: '30px 0',
    background: '#3d528b',
    zIndex: -1,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 300ms linear',
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
    top: '18px',
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