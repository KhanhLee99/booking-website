import React from 'react';
import PropTypes from 'prop-types';
import './CommonAddListing.scss';
import HeaderHost from '../../features/Host/components/HeaderHost';

CommonAddListing.propTypes = {

};

function CommonAddListing(props) {
    return (
        <div className='k-wrap'>
            <HeaderHost />
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8 k-left-side'>
                            {props.children}
                            {/* <div className='row'>
                                <div className='col-8'>
                                    {props.children}
                                </div>

                                <div className='col-4 k-right-side'>
                                    <div className='k-property-content'>
                                        <h5>Chung cu</h5>
                                        <p>Can ho khep kin, cung tap trung tren mot mat san trong mot toa nha lon</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <FooterHost
                loading={loading}
                handleBack={handleBack}
                handleNext={handleNext}
                hiddenBackButton={true}
                isHandleClick={true}
            /> */}
        </div>
    );
}

export default CommonAddListing;