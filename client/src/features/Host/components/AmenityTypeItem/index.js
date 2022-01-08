import React from 'react';
import PropTypes from 'prop-types';

AmenityTypeItem.propTypes = {

};

const amenity_type = {
    fontSize: '15px',
    color: '#666',
}

function AmenityTypeItem(props) {
    const { name } = props;
    return (
        <h5 className="margin-top-30 margin-bottom-10" style={amenity_type}>{name}</h5>
    );
}

export default AmenityTypeItem;