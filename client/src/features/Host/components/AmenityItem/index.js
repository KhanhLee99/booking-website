import React from 'react';
import PropTypes from 'prop-types';

AmenityItem.propTypes = {

};

function AmenityItem(props) {
    const { id, name, handleCheckboxChange } = props;
    return (
        <>
            <input
                id={id}
                type="checkbox"
                name="check"
                onChange={handleCheckboxChange}
            />
            <label htmlFor={id}>{name}</label>
        </>
    );
}

export default AmenityItem;