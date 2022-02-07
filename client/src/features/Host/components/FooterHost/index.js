import React from 'react';
import PropTypes from 'prop-types';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import { ProgressBar } from 'react-bootstrap';

FooterHost.propTypes = {

};

FooterHost.defaultProps = {
    title: 'Next'
}

function FooterHost(props) {
    const handleClick = () => {
        if (isHandleClick) {
            handleNext();
        }
    }

    const { loading, handleBack, handleNext, hiddenBackButton, isHandleClick, now, title } = props;

    return (
        <div className='k-footer'>
            <ProgressBar now={now} />
            <div className='container'>
                <div className='row'>
                    <div className='col-6 k-back-div'>
                        {hiddenBackButton ? null : (
                            <a href='#' className='k-back' onClick={(e) => handleBack(e)}>Back</a>
                        )}

                    </div>
                    <div className='col-6 k-next-div'>
                        <button
                            type='submit'
                            className={loading ? 'k-next disable' : 'k-next'}
                            disabled={loading ? true : false}
                            onClick={() => handleClick()}
                        >
                            {loading ? <PulseLoading /> : title}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FooterHost;