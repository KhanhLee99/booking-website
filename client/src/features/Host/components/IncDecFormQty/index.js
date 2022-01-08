import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

IncDecFormQty.propTypes = {

};

function IncDecFormQty(props) {

    const { title, handleDec, handleInc, qty, type } = props;
    return (
        <div className="qtyButtons">
            <div className="qtyTitle custom_form_label" style={{ color: '#878c9f' }}>{title}</div>
            <div className="qtyDec" onClick={() => handleDec(type, qty)}></div>
            <input type="text" name="qtyInput" placeholder={qty} />
            <div className="qtyInc" onClick={() => handleInc(type, qty)}></div>
        </div>
    );
}

export default IncDecFormQty;