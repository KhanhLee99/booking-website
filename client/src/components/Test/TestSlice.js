import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Lightbox from 'react-image-lightbox';
import './styles.scss';

TestSlice.propTypes = {

};

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
};

function TestSlice(props) {

    const [images, setImages] = useState(['images/single-listing-05b.jpg', 'images/single-listing-05a.jpg', 'images/single-listing-05c.jpg', 'images/single-listing-05d.jpg', 'images/single-listing-05b.jpg', 'images/single-listing-05a.jpg', 'images/single-listing-05c.jpg', 'images/single-listing-05d.jpg']);
    const [current, setCurrent] = useState('images/single-listing-05a.jpg');

    // const getSliderSettings = () => {
    //     return {
    //         dots: true,
    //         infinite: true,
    //         speed: 500,
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //     }
    // }

    const handleClickImage = (e, image) => {
        e && e.preventDefault();
        setCurrent(image);
    }

    const handleCloseModal = (e) => {
        e && e.preventDefault();
        setCurrent('');
    }

    return (
        <div>
            <Slider {...settings}>
                {images.map(image => (
                    <img src={image} className='custom-image' onClick={e => handleClickImage(e, image)} />

                ))}
            </Slider>

            {/* {current &&
                <Lightbox
                    mainSrc={current}
                    onCloseRequest={handleCloseModal}
                />
            } */}
        </div>
    );
}

export default TestSlice;