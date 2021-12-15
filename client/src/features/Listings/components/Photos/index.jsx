import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Slider from "react-slick";

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

    const [images, setImages] = useState(['/images/single-listing-05b.jpg', '/images/single-listing-05a.jpg', '/images/single-listing-05c.jpg', '/images/single-listing-05d.jpg', '/images/single-listing-05b.jpg', '/images/single-listing-05a.jpg', '/images/single-listing-05c.jpg', '/images/single-listing-05d.jpg']);

    return (
        <div>
            <Slider {...settings}>
                {images.map(image => (
                    <img src={image} className='height-img' />

                ))}
            </Slider>
        </div>

    );
}

export default Photos;