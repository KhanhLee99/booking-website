import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Slider from "react-slick";
import ImageItem from './ImageItem';

Photos.propTypes = {

};

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
};

function Photos(props) {

    const { photos } = props;

    return (
        <div style={{ marginTop: '80px' }}>
            <Slider {...settings}>
                {photos.map(image => (
                    <ImageItem image={image} />

                ))}
            </Slider>
        </div>

    );
}

export default Photos;