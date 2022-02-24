import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyNotify, getTotalNoticationsUnread, nextPage, seenNotifications } from '../../../../app/reducer/notifySlice';
import { deleteDeviceToken } from '../../../../app/reducer/userSlice';
import { cart_btn, cart_counter, header_user_menu, header_user_menu_ul, header_user_menu_ul_li, header_user_name, header_user_name_span, header_user_name_span_img, logo_holder, main_header, NotificationItem, show_reg_form, SkeletonNotificationItem } from '../../../../components/Header';
import OutsideAlerter from '../../../../components/OutsideAlerter/OutsideAlerter';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import { header_user_menu_ul_li_a } from '../../../Host/components/HeaderHost';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoginModal from '../../../../components/LoginModal/LoginModal';
import Logo from '../../../../assets/bookingdo/image/logos/fun-trip-logo.png'
import { refreshPage } from '../../../../@helper/helper';

HeaderAdmin.propTypes = {

};

function HeaderAdmin(props) {
    const refProfile = useRef(null);
    const refNotify = useRef(null);

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const notifications = useSelector((state) => state.notifySlice.myNotify || []);
    const totalNotiUnread = useSelector((state) => state.notifySlice.totalUnread || 0);
    const totalPage = useSelector((state) => state.notifySlice.totalPage || 0);
    const currentPage = useSelector((state) => state.notifySlice.currentPage || 1);


    const isLoggedIn = !!loggedInUser.id;

    const [showPopupProfile, setShowPopupProfile] = useState(false);
    const [showPopupNotify, setShowPopupNotify] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeviceToken()).then(() => {
            refreshPage();
        })
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
    }, [currentPage]);

    return (
        <header className="k-main-header" style={main_header}>
            <Link to="/" className="k-logo-holder" style={logo_holder}><img src={Logo} alt="" style={{ width: 'auto', height: '45px', width: '55px', background: '#fff', borderRadius: 8 }} /></Link>

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
                                height={440}
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

    );
}

export default HeaderAdmin;