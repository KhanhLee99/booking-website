import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Popup from 'reactjs-popup';
import LoginPopup from '../../../../components/LoginPopup';
import LoginModal from '../../../../components/LoginModal/LoginModal';

TabHorizontal.propTypes = {

};

const scroll_nav_wrapper = {
    background: '#fff',
    boxShadow: '0 0 65px rgb(0 0 0 / 9%)',
    borderBottom: '1px solid #eee',
    zIndex: 998,
    position: 'relative',
    top: '0px',
}

const scroll_nav = {
    float: 'left',
    borderRight: '1px solid #eee',
}

const scroll_nav_li = {
    float: 'left',
    marginRight: '15px',
    cursor: 'pointer',
}

const scroll_nav_li_a = {
    display: 'block',
    padding: '25px 20px 25px 0',
    position: 'relative',
    fontSize: '10px',
    color: '#7d93b2',
    fontWeight: 800,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '1px',
}

const scroll_nav_li_a_i = {
    marginRight: '10px',
    fontSize: '13px',
    position: 'relative',
    top: '2px',
    fontWeight: 600,
    color: '#e5e5e5',
}
const scroll_nav_wrapper_opt = {
    float: 'right',
    position: 'relative',
    top: '12px',
}

const scroll_nav_wrapper_opt_btn = {
    float: 'left',
    marginLeft: '10px',
    padding: '8px 20px',
    border: '1px solid transparent',
    background: '#425998',
    color: '#fff',
    fontSize: '12px',
    borderRadius: '2px',
}

function TabHorizontal(props) {
    const { handleSave, isLoggedIn } = props;

    const handleFavorite = (e) => {
        e.preventDefault();
        handleSave();
    }
    return (
        <div className="scroll-nav-wrapper fl-wrap" style={scroll_nav_wrapper}>
            <div className="container">
                <nav className="scroll-nav scroll-init" style={scroll_nav}>
                    <ul className="no-list-style">
                        <li style={scroll_nav_li}><a className="act-scrlink" href="#sec1" style={scroll_nav_li_a}><i className="fal fa-images" style={scroll_nav_li_a_i} /> Gallery</a></li>
                        <li style={scroll_nav_li}><a href="#sec2" style={scroll_nav_li_a}><i className="fal fa-info" style={scroll_nav_li_a_i} />Details</a></li>
                        <li style={scroll_nav_li}><a href="#sec3" style={scroll_nav_li_a}><i className="fal fa-video" style={scroll_nav_li_a_i} />Video </a></li>
                        <li style={scroll_nav_li}><a href="#sec4" style={scroll_nav_li_a}><i className="fal fa-bed" style={scroll_nav_li_a_i} />Rooms</a></li>
                        <li style={scroll_nav_li}><a href="#sec5" style={scroll_nav_li_a}><i className="fal fa-comments-alt" style={scroll_nav_li_a_i} />Reviews</a></li>
                    </ul>
                </nav>
                <div className="scroll-nav-wrapper-opt" style={scroll_nav_wrapper_opt}>
                    {!isLoggedIn ?
                        <LoginModal>
                            <a href="#" className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}> <i className="fas fa-heart" style={{ marginRight: '6px' }} /> Save </a>
                        </LoginModal>
                        :
                        <a href="#" onClick={handleFavorite} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}> <i className="fas fa-heart" style={{ marginRight: '6px' }} /> Save </a>
                    }
                    <a href="#" className="scroll-nav-wrapper-opt-btn showshare" style={scroll_nav_wrapper_opt_btn}> <i className="fas fa-share" style={{ marginRight: '6px' }} /> Share </a>
                    <div className="share-holder hid-share">
                        <div className="share-container  isShare" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabHorizontal;