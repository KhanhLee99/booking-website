import { DatePicker } from 'antd';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyNotify, getTotalNoticationsUnread, nextPage, seenNotifications } from '../../app/reducer/notifySlice';
import { deleteDeviceToken } from '../../app/reducer/userSlice';
import LoginModal from '../LoginModal/LoginModal';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import AvatarPlaceholder from '../Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import './styles.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { header_user_menu_ul_li_a } from '../../features/Host/components/HeaderHost';


export const main_header = {
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 0,
    height: '80px',
    background: '#2e3f6e',
    zIndex: 999,
    padding: '0 40px',
}

export const logo_holder = {
    float: 'left',
    height: '30px',
    position: 'relative',
    top: '20px',
}

export const header_search_btn = {
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

export const cart_btn = {
    float: 'right',
    position: 'relative',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '34px',
    top: '28px',
    fontSize: '18px',
}

export const cart_counter = {
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

export const show_reg_form = {
    float: 'right',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '40px',
    position: 'relative',
    top: '32px',
    fontWeight: '500',
    fontSize: '12px',
}

export const header_search_input = {
    width: '32%',
    float: 'left',
    padding: '0 4px',
    position: 'relative',
}

export const header_search_input_label = {
    position: 'absolute',
    left: '20px',
    top: '14px',
    zIndex: 10,
    fontSize: '14px',
}

export const header_search_input_input = {
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

export const header_search_selectinpt = {
    float: 'left',
    width: '36%',
    padding: '0 4px',
}

export const header_user_menu = {
    float: 'right',
    position: 'relative',
    top: '20px',
    marginLeft: '50px',
    marginRight: '40px',
}

export const header_user_name = {
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

export const header_user_name_span = {
    position: 'absolute',
    width: '38px',
    height: '38px',
    borderRadius: '100%',
    overflow: 'hidden',
    top: 0,
    left: '-50px',
    fontWeight: 400,
}

export const header_user_name_span_img = {
    width: '100%',
    height: '100%',
}

export const header_user_menu_ul = {
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

export const header_user_menu_ul_li = {
    float: 'left',
    width: '100%',
    padding: '0px 0',
}

// const header_user_menu_ul_li_a = {
//     color: '#50596e',
//     float: 'left',
//     width: '100%',
//     fontWeight: 500,
//     textAlign: 'left',
//     padding: '10px 15px',
// }

const { RangePicker } = DatePicker;

function Header(props) {

    const refProfile = useRef(null);
    const refSearch = useRef(null);
    const refNotify = useRef(null);

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const notifications = useSelector((state) => state.notifySlice.myNotify || []);
    const totalNotiUnread = useSelector((state) => state.notifySlice.totalUnread || 0);
    const totalPage = useSelector((state) => state.notifySlice.totalPage || 0);
    const currentPage = useSelector((state) => state.notifySlice.currentPage || 1);


    const isLoggedIn = !!loggedInUser.id;

    const [showPopupProfile, setShowPopupProfile] = useState(false);
    const [showPopupSearch, setShowPopupSearch] = useState(false);
    const [showPopupNotify, setShowPopupNotify] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeviceToken()).then(() => {
            refreshPage();
        })
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const handleClickBell = () => {
        setShowPopupNotify(!showPopupNotify);
        if (totalNotiUnread > 0) {
            dispatch(seenNotifications());
        }
    }

    const loadMoreData = () => {
        dispatch(nextPage());
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTotalNoticationsUnread());
            dispatch(getMyNotify({
                page: currentPage,
                limit: 5
            }));
        }
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            setTimeout(() => {
                dispatch(getMyNotify({
                    page: currentPage,
                    limit: 5
                }));
            }, 1000);
        }
    }, [currentPage])

    return (

        <header className="k-main-header" style={main_header}>
            <Link to="/" className="k-logo-holder" style={logo_holder}><img src="https://i.ytimg.com/vi/FPtITmtjWhQ/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3TdlYzQKkXD7XtPbNwCGLGycr2Q" alt="" style={{ width: 'auto', height: '100%' }} /></Link>

            <OutsideAlerter closePopup={() => setShowPopupSearch(false)} ref={refSearch}>
                <div
                    className="k-header-search_btn show-search-button"
                    style={header_search_btn}
                    onClick={() => setShowPopupSearch(!showPopupSearch)}
                >
                    <i className="fal fa-search" style={{ color: '#4DB7FE', marginRight: '30px' }} /> <span style={{ position: 'relative' }}>Search</span>
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

                            <button className="header-search-button green-bg" onClick="window.location.href='listing.html'"><i className="far fa-search" /> Search </button>
                        </div>
                    </div>
                </div>

            </OutsideAlerter>

            {
                isLoggedIn ? <>
                    <OutsideAlerter
                        closePopup={() => setShowPopupNotify(false)}
                        ref={refNotify}
                    >
                        <div
                            className="k-cart-btn"
                            style={cart_btn}
                            onClick={() => handleClickBell()}
                        >
                            <i className="fas fa-bell" style={{ width: '12px' }} />
                            {totalNotiUnread > 0 && <span className="k-cart-counter" style={cart_counter} >{totalNotiUnread}</span>}
                        </div>

                        <div className={showPopupNotify ? "header-modal vis-wishlist" : "header-modal"}>
                            <InfiniteScroll
                                dataLength={notifications.length}
                                next={loadMoreData}
                                hasMore={currentPage < totalPage ? true : false}
                                loader={
                                    <>
                                        <SkeletonNotificationItem />
                                        <SkeletonNotificationItem />
                                    </>
                                }
                                // maxHeight={440}
                                style={{ background: '#fff' }}
                            >
                                <div className="header-modal-container scrollbar-inner fl-wrap">
                                    <div className='notification-title'>
                                        <h3>Notifications</h3>
                                    </div>

                                    <div className="notification-list-box fl-wrap">
                                        {
                                            notifications.length > 0 ?
                                                notifications.map((notify, index) => (
                                                    <NotificationItem
                                                        key={index}
                                                        notify={notify}
                                                    />
                                                ))
                                                : null
                                        }
                                    </div>
                                </div>
                            </InfiniteScroll>
                        </div>
                    </OutsideAlerter>

                    <div className="header-user-menu" style={header_user_menu}>
                        <OutsideAlerter
                            closePopup={() => { setShowPopupProfile(false) }}
                            ref={refProfile}
                        >
                            <div className={showPopupProfile ? 'rotateX header-user-name' : 'header-user-name'} style={header_user_name} onClick={() => { setShowPopupProfile(!showPopupProfile) }}>
                                <span style={header_user_name_span}>
                                    <AvatarPlaceholder
                                        avatar_url={loggedInUser.avatar_url}
                                        style={header_user_name_span_img}
                                    />
                                </span>
                                {loggedInUser.name}
                            </div>
                            <ul className={showPopupProfile ? 'popup-user-nav hu-menu-vis' : 'popup-user-nav'}>
                                <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><Link to="/me/profile" style={header_user_menu_ul_li_a}> Edit profile</Link></li>
                                <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><Link to="/me/bookings" style={header_user_menu_ul_li_a}>  Bookings</Link></li>
                                <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><Link to="/me/favorite" style={header_user_menu_ul_li_a}> Danh sách yêu thích </Link></li>
                                <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><Link to="/me/inbox" style={header_user_menu_ul_li_a}> Tin nhắn</Link></li>
                                {loggedInUser.role_id === 2 ?
                                    <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><Link to="/host/listings" style={header_user_menu_ul_li_a}>Quản lý phòng cho thuê</Link></li>
                                    : null}
                                <li style={header_user_menu_ul_li} onClick={() => { setShowPopupProfile(!showPopupProfile) }}><a href="#" style={header_user_menu_ul_li_a} onClick={(e) => handleLogout(e)}> Log Out</a></li>
                            </ul>
                        </OutsideAlerter>
                    </div>
                </> :
                    <LoginModal>
                        <div className="k-show-reg-form modal-open avatar-img" data-srcav="images/avatar/3.jpg" style={show_reg_form}><i className="fal fa-user" style={{ color: '#4DB7F', marginRight: '14px' }} />Sign In</div>
                    </LoginModal>
            }

        </header >
    )
}
export default Header;

export function NotificationItem(props) {
    const { notify } = props;

    return (
        <div className="notification-list fl-wrap" style={{ background: notify.is_read ? '' : '#E9F3FE' }}>
            <div className="notification-message">
                <div className="notification-message-text">
                    <i className="far fa-heart purp-bg"></i>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: notify.message }} />
                        <p className="notificattion-message-time">28 may 2020</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function SkeletonNotificationItem(props) {
    return (
        <div className="notification-list fl-wrap">
            <div className="notification-message">
                <div className="notification-message-text" style={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton width={"40px"} height={"40px"} style={{ float: "left", borderRadius: '50%' }} />
                    <div>
                        <Skeleton height={"20px"} style={{ float: "left", borderRadius: '8px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}



    // <div  className = "k-header-search-input header-search_selectinpt" style = { header_search_input, header_search_selectinpt } >
    //     <select data-placeholder="Category" className="chosen-select no-radius">
    //         <option>All Categories</option>
    //         <option>All Categories</option>
    //         <option>Shops</option>
    //         <option>Hotels</option>
    //         <option>Restaurants</option>
    //         <option>Fitness</option>
    //         <option>Events</option>
    //     </select>
    //                     </div >