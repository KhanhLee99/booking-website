import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Lightbox from 'react-image-lightbox';
import './styles.scss';

TestSlice.propTypes = {

};

// const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     // slidesToScroll: 1,
// };

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // pauseOnDotsHover: true,
    // pauseOnFocus: true,
    // pauseOnHover: true,
};

function TestSlice(props) {

    const [images, setImages] = useState(['https://img.freepik.com/free-photo/direction-sign-with-backpack-ground_23-2149119472.jpg?size=338&ext=jpg', 'https://img.freepik.com/free-photo/smiley-female-friends-having-fun-while-traveling-by-car_23-2148771894.jpg?size=338&ext=jpg', 'https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg?size=626&ext=jpg']);
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
        <Slider {...settings}
        >
            {images.map(image => (
                <div className="item fl-wrap" style={item_div}>
                    <div className="overlay op7"></div>

                    <img src={image} className="item" title="Title 1" onClick={e => handleClickImage(e, image)} />
                </div>
                // <img src={image} className='custom-image' onClick={e => handleClickImage(e, image)} />

            ))}
        </Slider>
    );
}

export default TestSlice;
{/* <div className="msps-slider">
                            <div className="item"><img src="images/category-box-01.jpg" className="item" title="Title 1" /></div>
                            <div className="item"><img src="images/category-box-02.jpg" className="item" title="Title 1" /></div>
                            <div className="item"><img src="images/category-box-03.jpg" className="item" title="Title 1" /></div>
                        </div> */}


const item_div = {
    width: '470px',
    position: 'relative',
    left: '0px',
    top: '0px',
    zIndex: 998,
    opacity: 1,
    // height: '100%',
    transition: 'opacity 1000ms linear 3s',
}