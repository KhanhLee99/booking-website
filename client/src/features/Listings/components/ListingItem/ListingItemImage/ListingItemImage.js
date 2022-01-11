import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from "react-placeholder";
import './ListingItemImage.scss';
import imgPlaceholder from '../../../../../assets/placeholder/img-placeholder.png';

ListingItemImage.propTypes = {

};

function ListingItemImage(props) {

    const { listing_img } = props;

    return (
        <img
            src={listing_img}
            className='geodir_category_img_wrap_img'
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = imgPlaceholder;
            }}
        />
    );
}

export default ListingItemImage;