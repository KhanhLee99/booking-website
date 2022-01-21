import React from 'react';
import PropTypes from 'prop-types';

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

    const { handleAddReview } = props;
    return (
        <>
            <textarea
                placeholder='Your Review:'
                style={{ resize: 'none' }}
            />

            <button onClick={() => handleAddReview()} className="btn color2-bg float-btn" style={custom_form_button}>Submit Reviewd <i className="fal fa-paper-plane" style={btn_i} /></button>

            <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)', marginBottom: '45px' }} />
        </>
    );
}

export default AddReview;