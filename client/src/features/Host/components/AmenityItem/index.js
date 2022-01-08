import React from 'react';
import PropTypes from 'prop-types';

AmenityItem.propTypes = {

};

const labelCheckbox = {
    fontWeight: 600,
    color: '#888da0',
    fontSize: '13px',
}

function AmenityItem(props) {

    const isChecked = (id, listAmenityChecked) => {
        const index = listAmenityChecked.findIndex(item => item === id);
        if (index != -1) {
            return true;
        }
        return false;
    }

    const { id, name, handleCheckboxChange, listAmenityChecked } = props;

    return (
        <li>
            {isChecked(id, listAmenityChecked) ? (<input
                id={id}
                type="checkbox"
                name="check"
                onChange={handleCheckboxChange}
                checked
            />) : (
                <input
                    id={id}
                    type="checkbox"
                    name="check"
                    onChange={handleCheckboxChange}

                />
            )}

            <label htmlFor={id} style={labelCheckbox}>{name}</label>
        </li>
    );
}

export default AmenityItem;