import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import LoginPopup from '../LoginPopup';

LoginModal.propTypes = {

};

function LoginModal({ children }) {
    return (
        <Popup
            trigger={children}
            position="center"
            modal
            nested
            closeOnDocumentClick
            className='popup-content'
            scrollable={true}
        >
            <LoginPopup />
        </Popup >
    );
}

export default LoginModal;