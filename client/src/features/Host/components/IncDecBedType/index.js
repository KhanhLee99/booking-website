import React from 'react';
import PropTypes from 'prop-types';

IncDecBedType.propTypes = {

};

function IncDecBedType(props) {
    const { title, handleDec, handleInc, qty, type } = props;
    return (
        <div className="qtyButtons">
            <div className="qtyTitle">{title}</div>
            <div className="qtyDec" onClick={() => handleDec(type, qty)}></div>
            <input type="text" name="qtyInput" defaultValue={qty} value={qty} />
            <div className="qtyInc" onClick={() => handleInc(type, qty)}></div>
        </div>
    );
}

export default IncDecBedType;