import React from 'react';
import PropTypes from 'prop-types';

AmenityTypeItem.propTypes = {

};

function AmenityTypeItem(props) {
    const { name } = props;
    return (
        <h5 className="margin-top-30 margin-bottom-10">{name}</h5>
    );
}

export default AmenityTypeItem;