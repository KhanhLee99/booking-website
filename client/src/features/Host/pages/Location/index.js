import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Location.propTypes = {

};

function Location(props) {
    return (
        <div className='k-wrap'>
            <div className='k-header'></div>
            <div className='k-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8 k-left-side'>
                            <div id="add-listing">
                                {/* Section */}
                                <div className="add-listing-section">
                                    {/* Headline */}
                                    <div className="add-listing-headline">
                                        <h3><i className="sl sl-icon-doc" />Amenities</h3>
                                    </div>
                                    {/* Title */}

                                    <h5 class="margin-top-30 margin-bottom-10">Amenities</h5>
                                    <div className="checkboxes in-row margin-bottom-20">
                                        <input id="check-a" type="checkbox" name="check" />
                                        <label htmlFor="check-a">Elevator in building</label>
                                        <input id="check-b" type="checkbox" name="check" />
                                        <label htmlFor="check-b">Friendly workspace</label>
                                        <input id="check-c" type="checkbox" name="check" />
                                        <label htmlFor="check-c">Instant Book</label>
                                        <input id="check-d" type="checkbox" name="check" />
                                        <label htmlFor="check-d">Wireless Internet</label>
                                        <input id="check-e" type="checkbox" name="check" />
                                        <label htmlFor="check-e">Free parking on premises</label>
                                        <input id="check-f" type="checkbox" name="check" />
                                        <label htmlFor="check-f">Free parking on street</label>
                                        <input id="check-g" type="checkbox" name="check" />
                                        <label htmlFor="check-g">Smoking allowed</label>
                                        <input id="check-h" type="checkbox" name="check" />
                                        <label htmlFor="check-h">Events</label>
                                    </div>

                                    <h5 class="margin-top-30 margin-bottom-10">Amenities</h5>
                                    <div className="checkboxes in-row margin-bottom-20">
                                        <input id="check-a" type="checkbox" name="check" />
                                        <label htmlFor="check-a">Elevator in building</label>
                                        <input id="check-b" type="checkbox" name="check" />
                                        <label htmlFor="check-b">Friendly workspace</label>
                                        <input id="check-c" type="checkbox" name="check" />
                                        <label htmlFor="check-c">Instant Book</label>
                                        <input id="check-d" type="checkbox" name="check" />
                                        <label htmlFor="check-d">Wireless Internet</label>
                                        <input id="check-e" type="checkbox" name="check" />
                                        <label htmlFor="check-e">Free parking on premises</label>
                                        <input id="check-f" type="checkbox" name="check" />
                                        <label htmlFor="check-f">Free parking on street</label>
                                        <input id="check-g" type="checkbox" name="check" />
                                        <label htmlFor="check-g">Smoking allowed</label>
                                        <input id="check-h" type="checkbox" name="check" />
                                        <label htmlFor="check-h">Events</label>
                                    </div>

                                    <h5 class="margin-top-30 margin-bottom-10">Amenities</h5>
                                    <div className="checkboxes in-row margin-bottom-20">
                                        <input id="check-a" type="checkbox" name="check" />
                                        <label htmlFor="check-a">Elevator in building</label>
                                        <input id="check-b" type="checkbox" name="check" />
                                        <label htmlFor="check-b">Friendly workspace</label>
                                        <input id="check-c" type="checkbox" name="check" />
                                        <label htmlFor="check-c">Instant Book</label>
                                        <input id="check-d" type="checkbox" name="check" />
                                        <label htmlFor="check-d">Wireless Internet</label>
                                        <input id="check-e" type="checkbox" name="check" />
                                        <label htmlFor="check-e">Free parking on premises</label>
                                        <input id="check-f" type="checkbox" name="check" />
                                        <label htmlFor="check-f">Free parking on street</label>
                                        <input id="check-g" type="checkbox" name="check" />
                                        <label htmlFor="check-g">Smoking allowed</label>
                                        <input id="check-h" type="checkbox" name="check" />
                                        <label htmlFor="check-h">Events</label>
                                    </div>

                                    <h5 class="margin-top-30 margin-bottom-10">Amenities</h5>
                                    <div className="checkboxes in-row margin-bottom-20">
                                        <input id="check-a" type="checkbox" name="check" />
                                        <label htmlFor="check-a">Elevator in building</label>
                                        <input id="check-b" type="checkbox" name="check" />
                                        <label htmlFor="check-b">Friendly workspace</label>
                                        <input id="check-c" type="checkbox" name="check" />
                                        <label htmlFor="check-c">Instant Book</label>
                                        <input id="check-d" type="checkbox" name="check" />
                                        <label htmlFor="check-d">Wireless Internet</label>
                                        <input id="check-e" type="checkbox" name="check" />
                                        <label htmlFor="check-e">Free parking on premises</label>
                                        <input id="check-f" type="checkbox" name="check" />
                                        <label htmlFor="check-f">Free parking on street</label>
                                        <input id="check-g" type="checkbox" name="check" />
                                        <label htmlFor="check-g">Smoking allowed</label>
                                        <input id="check-h" type="checkbox" name="check" />
                                        <label htmlFor="check-h">Events</label>
                                    </div>

                                    {/* Row / End */}
                                </div>
                            </div>

                        </div>
                        <div className='col-4 k-right-side'>
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
        </div>
    );
}

export default Location;