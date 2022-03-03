import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './AddReview.scss';
import Rating from 'react-rating';
import { MdStarOutline, MdStar } from 'react-icons/md';

AddReview.propTypes = {

};

const custom_form_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',

    padding: '12px 55px 12px 25px',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '12px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 200ms linear',
}

const btn_i = {
    position: 'absolute',
    right: '20px',
    top: '50%',
    height: '20px',
    width: '20px',
    borderRadius: '100%',
    lineHeight: '20px',
    marginTop: '-10px',
    transition: 'all 200ms linear',
}

function AddReview(props) {
    const [isEmpty, setIsEmpty] = useState(false);
    const [isRated, setIsRated] = useState(false);
    const [rating, setRating] = useState(0);
    const textRef = useRef();
    const { handleAddReview, name, id, close, reservation_id } = props;

    const addReview = () => {
        if (textRef.current.value && rating) {
            setIsEmpty(false);
            setIsRated(false);
            handleAddReview(id, textRef.current.value, rating, reservation_id);
            close();
        } else {
            if (rating == 0) {
                setIsRated(true);
            } else {
                setIsRated(false);
            }
            if (!textRef.current.value) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }
        }
    }


    return (
        <div className='add-review-box'>
            <h3>Hãy để lại đánh giá về trải nghiệm ở của bạn <span className='listing-name'>{name}</span></h3>
            <Rating
                initialRating={rating}
                emptySymbol={<MdStarOutline size={33} />}
                fullSymbol={<MdStar color='#F6C344' size={33} />}
                onChange={value => setRating(value)}
            />
            {isRated && <p className='text-error'> Vui lòng đánh giá sao</p>}
            <textarea
                placeholder='Your Review:'
                style={{ resize: 'none' }}
                ref={textRef}
            />

            {isEmpty && <p className='text-error'> Vui lòng nhập đánh giá </p>}

            <button onClick={() => addReview()} className="btn color2-bg float-btn" style={custom_form_button}>Submit Reviewd <i className="fal fa-paper-plane" style={btn_i} /></button>
        </div>
    );
}

export default AddReview;