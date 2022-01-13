import React from 'react';
import PropTypes from 'prop-types';
import imgPlaceholder from '../../../assets/placeholder/img-placeholder.png';

ThumbListingPlaceholder.propTypes = {

};

function ThumbListingPlaceholder(props) {
    const { listing_img, className, style } = props;
    return (
        <img
            src={listing_img}
            className={className}
            style={style}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = imgPlaceholder;
            }}
        />
    );
}

export default ThumbListingPlaceholder;