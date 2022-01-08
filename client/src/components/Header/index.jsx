import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/reducer/userSlice';
import './styles.css';

const main_header = {
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 0,
    height: '80px',
    background: '#2e3f6e',
    zIndex: 9999999,
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

function Header(props) {

    const dispatch = useDispatch();

    const handleShowPopup = (e) => {
        e.preventDefault();
        setTriggerPopup(true)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        const action = logout();
        dispatch(action);
    }

    const { loggedInUser, isLoggedIn, setTriggerPopup } = props;


    return (
        // <header className="header menu_fixed sticky">
        //     {/* <div id="preloader">
        //         <div data-loader="circle-side" />
        //     </div> */}
        //     <div id="logo">
        //         <a href="index.html">
        //             <img src="img/logo.png" width={150} height={36} data-retina="true" alt="" className="logo_normal" />
        //             <img src="img/logo_sticky.png" width={150} height={36} data-retina="true" alt="" className="logo_sticky" />
        //         </a>
        //     </div>
        //     <ul id="top_menu">
        //         <li><a href="wishlist.html" className="wishlist_bt_top" title="Your wishlist">Your wishlist</a></li>
        //     </ul>
        //     {/* /top_menu */}
        //     <a href="#menu" className="btn_mobile">
        //         <div className="hamburger hamburger--spin" id="hamburger">
        //             <div className="hamburger-box">
        //                 <div className="hamburger-inner" />
        //             </div>
        //         </div>
        //     </a>
        //     <nav id="menu" className="main-menu">
        //         <ul>
        //             <li><span><a href="#0">Host</a></span></li>
        //             {!isLoggedIn ? (
        //                 <>
        //                     <li><span><a href="#0">Đăng ký</a></span></li>
        //                     <li><span><a onClick={(handleShowPopup)} href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">Đăng nhập</a></span></li>
        //                 </>
        //             ) : (
        //                 <>
        //                     <li><span><a href="#0">{loggedInUser.name}</a></span></li>
        //                     <li><span><a href="#0" onClick={handleLogout}>Log out</a></span></li>
        //                 </>
        //             )}
        //         </ul>
        //     </nav>
        // </header>

        <header className="k-main-header" style={main_header}>
            {/* logo*/}
            <a href="index.html" className="k-logo-holder" style={logo_holder}><img src="https://i.ytimg.com/vi/FPtITmtjWhQ/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB3TdlYzQKkXD7XtPbNwCGLGycr2Q" alt="" style={{ width: 'auto', height: '100%' }} /></a>
            {/* header-search_btn*/}
            <div className="k-header-search_btn show-search-button" style={header_search_btn}><i className="fal fa-search" style={{ color: '#4DB7FE', marginRight: '30px' }} /> <span style={{ position: 'relative' }}>Search</span></div>
            {/* header opt */}
            <div className="k-cart-btn show-header-modal" data-microtip-position="bottom" role="tooltip" aria-label="Your Wishlist" style={cart_btn}><i className="fal fa-heart" style={{ width: '12px' }} /><span className="k-cart-counter" style={cart_counter} >4</span>
            </div>
            <div className="k-show-reg-form modal-open avatar-img" data-srcav="images/avatar/3.jpg" style={show_reg_form}><i className="fal fa-user" style={{ color: '#4DB7F', marginRight: '14px' }} />Sign In</div>
            {/* nav-button-wrap*/}
            <div className="k-nav-button-wrap" style={nav_button_wrap}>
                <div className="nav-button">
                    <span /><span /><span />
                </div>
            </div>

            <div className="k-header-search_container header-search vis-search" style={header_search_container}>
                <div className="container small-container" style={{ maxWidth: '1024px', width: '92%', margin: '0 auto', position: 'relative', zIndex: 5 }}>
                    <div className="header-search-input-wrap fl-wrap" style={{ padding: '0 199px 0 0' }}>
                        {/* header-search-input */}
                        <div className="k-header-search-input" style={header_search_input}>
                            <label style={header_search_input_label}><i className="fal fa-keyboard" style={{ color: '#4DB7FE' }} /></label>
                            <input type="text" placeholder="What are you looking for ?" defaultValue style={header_search_input_input} />
                        </div>
                        {/* header-search-input end */}
                        {/* header-search-input */}
                        <div className="k-header-search-input location autocomplete-container" style={header_search_input}>
                            <label style={header_search_input_label}><i className="fal fa-map-marker" style={{ color: '#4DB7FE' }} /></label>
                            <input type="text" placeholder="Location..." className="autocomplete-input" id="autocompleteid2" defaultValue style={header_search_input_input} />
                            <a href="#"><i className="fal fa-dot-circle" /></a>
                        </div>
                        {/* header-search-input end */}
                        {/* header-search-input */}
                        <div className="k-header-search-input header-search_selectinpt" style={header_search_input, header_search_selectinpt}>
                            <select data-placeholder="Category" className="chosen-select no-radius">
                                <option>All Categories</option>
                                <option>All Categories</option>
                                <option>Shops</option>
                                <option>Hotels</option>
                                <option>Restaurants</option>
                                <option>Fitness</option>
                                <option>Events</option>
                            </select>
                        </div>
                        {/* header-search-input end */}
                        <button className="header-search-button green-bg" onclick="window.location.href='listing.html'"><i className="far fa-search" /> Search </button>
                    </div>
                    <div className="header-search_close color-bg"><i className="fal fa-long-arrow-up" /></div>
                </div>
            </div>

            {/* wishlist-wrap*/}
            {/* <div className="header-modal novis_wishlist">
                <div className="header-modal-container scrollbar-inner fl-wrap" data-simplebar>
                    <div className="widget-posts  fl-wrap">
                        <ul className="no-list-style">
                            <li>
                                <div className="widget-posts-img"><a href="listing-single.html"><img src="images/gallery/thumbnail/1.png" alt="" /></a>
                                </div>
                                <div className="widget-posts-descr">
                                    <h4><a href="listing-single.html">Iconic Cafe</a></h4>
                                    <div className="geodir-category-location fl-wrap"><a href="#"><i className="fas fa-map-marker-alt" /> 40 Journal Square Plaza, NJ, USA</a>
                                    </div>
                                    <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a> <a href="listing.html">Cafe</a></div>
                                    <div className="widget-posts-descr-score">4.1</div>
                                    <div className="clear-wishlist"><i className="fal fa-times-circle" /></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-modal-top fl-wrap">
                    <h4>Your Wishlist : <span><strong /> Locations</span></h4>
                    <div className="close-header-modal"><i className="far fa-times" /></div>
                </div>
            </div> */}
        </header>

    )
}
export default Header;