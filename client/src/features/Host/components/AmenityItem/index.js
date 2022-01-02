import React from 'react';
import PropTypes from 'prop-types';

AmenityItem.propTypes = {

};

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
        <>
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

            <label htmlFor={id}>{name}</label>
        </>
    );
}

export default AmenityItem;