import React from 'react';
import PropTypes from 'prop-types';
import PulseLoading from '../../../../components/Loading/PulseLoading';

FooterHost.propTypes = {

};

function FooterHost(props) {
    const handleClick = () => {
        if (isHandleClick) {
            handleNext();
        }
    }
    const { loading, handleBack, handleNext, hiddenBackButton, isHandleClick } = props;
    return (
        <div className='k-footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 k-back-div'>
                        {hiddenBackButton ? null : (
                            <a href='#' className='k-back' onClick={(e) => handleBack(e)}>Quay lại</a>
                        )}

                    </div>
                    <div className='col-6 k-next-div'>
                        <button
                            type='submit'
                            className={loading ? 'k-next disable' : 'k-next'}
                            disabled={loading ? true : false}
                            onClick={() => handleClick()}
                        >
                            {loading ? <PulseLoading /> : "Tiếp theo"}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FooterHost;