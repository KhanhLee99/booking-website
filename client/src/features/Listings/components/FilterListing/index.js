import React from 'react';
import PropTypes from 'prop-types';

FilterListing.propTypes = {

};

function FilterListing(props) {
    return (
        <section className="search">
            <div className="row">
                <div className="col-md-12">
                    {/* Row With Forms */}
                    <div className="row with-forms">
                        {/* Filters */}
                        <div className="col-fs-12">
                            {/* Panel Dropdown / End */}
                            <div className="panel-dropdown">
                                <a href="#">Categories</a>
                                <div className="panel-dropdown-content checkboxes categories">
                                    {/* Checkboxes */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input id="check-1" type="checkbox" name="check" defaultChecked className="all" />
                                            <label htmlFor="check-1">All Categories</label>
                                            <input id="check-2" type="checkbox" name="check" />
                                            <label htmlFor="check-2">Shops</label>
                                            <input id="check-3" type="checkbox" name="check" />
                                            <label htmlFor="check-3">Hotels</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input id="check-4" type="checkbox" name="check" />
                                            <label htmlFor="check-4">Eat &amp; Drink</label>
                                            <input id="check-5" type="checkbox" name="check" />
                                            <label htmlFor="check-5">Fitness</label>
                                            <input id="check-6" type="checkbox" name="check" />
                                            <label htmlFor="check-6">Events</label>
                                        </div>
                                    </div>
                                    {/* Buttons */}
                                    <div className="panel-buttons">
                                        <button className="panel-cancel">Cancel</button>
                                        <button className="panel-apply">Apply</button>
                                    </div>
                                </div>
                            </div>
                            {/* Panel Dropdown / End */}
                            {/* Panel Dropdown */}
                            <div className="panel-dropdown wide">
                                <a href="#">More Filters</a>
                                <div className="panel-dropdown-content checkboxes">
                                    {/* Checkboxes */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input id="check-a" type="checkbox" name="check" />
                                            <label htmlFor="check-a">Elevator in building</label>
                                            <input id="check-b" type="checkbox" name="check" />
                                            <label htmlFor="check-b">Friendly workspace</label>
                                            <input id="check-c" type="checkbox" name="check" />
                                            <label htmlFor="check-c">Instant Book</label>
                                            <input id="check-d" type="checkbox" name="check" />
                                            <label htmlFor="check-d">Wireless Internet</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input id="check-e" type="checkbox" name="check" />
                                            <label htmlFor="check-e">Free parking on premises</label>
                                            <input id="check-f" type="checkbox" name="check" />
                                            <label htmlFor="check-f">Free parking on street</label>
                                            <input id="check-g" type="checkbox" name="check" />
                                            <label htmlFor="check-g">Smoking allowed</label>
                                            <input id="check-h" type="checkbox" name="check" />
                                            <label htmlFor="check-h">Events</label>
                                        </div>
                                    </div>
                                    {/* Buttons */}
                                    <div className="panel-buttons">
                                        <button className="panel-cancel">Cancel</button>
                                        <button className="panel-apply">Apply</button>
                                    </div>
                                </div>
                            </div>
                            {/* Panel Dropdown / End */}
                            {/* Panel Dropdown */}
                            <div className="panel-dropdown">
                                <a href="#">Distance Radius</a>
                                <div className="panel-dropdown-content">
                                    <input className="distance-radius" type="range" min={1} max={100} step={1} defaultValue={50} data-title="Radius around selected destination" />
                                    <div className="panel-buttons">
                                        <button className="panel-cancel">Disable</button>
                                        <button className="panel-apply">Apply</button>
                                    </div>
                                </div>
                            </div>
                            {/* Panel Dropdown / End */}
                        </div>
                        {/* Filters / End */}
                    </div>
                    {/* Row With Forms / End */}
                </div>
            </div>
        </section>
    );
}

export default FilterListing;