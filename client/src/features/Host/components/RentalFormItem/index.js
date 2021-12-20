import React from 'react';
import PropTypes from 'prop-types';

RentalFormItem.propTypes = {

};

function RentalFormItem(props) {
    const { name, id, selectRentalForm, rentalFormSelect } = props;
    return (
        <div className='k-list-property-type' onClick={() => selectRentalForm(id)}>
            <div className={rentalFormSelect === id ? 'k-property-type-item active' : 'k-property-type-item'}>
                <p>{name}</p>
            </div>
        </div>
    );
}

export default RentalFormItem;