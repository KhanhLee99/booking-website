import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

AddPhotos.propTypes = {

};

function AddPhotos(props) {
    return (
        <div className='k-wrap'>
            <div className='k-header'></div>
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-7 k-left-side'>
                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section margin-top-45">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-picture" /> Gallery</h3>
                                    </div>
                                    {/* Dropzone */}
                                    <div className="submit-section">
                                        <form action="/file-upload" className="dropzone" />
                                    </div>
                                </div>
                                {/* Section / End */}

                            </div>
                        </div>
                        <div className='col-5 k-right-side'>
                            <div className='k-property-description'>
                                <div className='k-property-content'>
                                    <h5>Chung cu</h5>
                                    <p>Can ho khep kin, cung tap trung tren mot mat san trong mot toa nha lon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default AddPhotos;