import React from 'react';
import PropTypes from 'prop-types';

Location.propTypes = {

};

function Location(props) {
    return (
        <div className='k-wrap'>
            <div className='k-header'></div>
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-7 k-left-side'>
                            <div id="add-listing">
                                <div className="add-listing-section margin-top-45">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-location" /> Location</h3>
                                    </div>
                                    <div className="submit-section">
                                        {/* Row */}
                                        <div className="row with-forms">
                                            {/* Country */}
                                            <div className="col-md-12">
                                                <h5>Country/ Region</h5>
                                                <select className="">
                                                    <option>Vietnam</option>
                                                    <option>USA</option>
                                                </select>
                                            </div>

                                            {/* Address */}
                                            <div className="col-md-12">
                                                <h5>Street Address</h5>
                                                <input type="text" placeholder="e.g. 964 School Street" />
                                            </div>

                                            {/* City */}
                                            <div className="col-md-6">
                                                <h5>City</h5>
                                                <input type="text" placeholder="Da Nang" />
                                            </div>

                                            {/* City */}
                                            <div className="col-md-6">
                                                <h5>State</h5>
                                                <input type="text" />
                                            </div>
                                            {/* Zip-Code */}
                                            <div className="col-md-6">
                                                <h5>Zip-Code</h5>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        {/* Row / End */}
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

export default Location;