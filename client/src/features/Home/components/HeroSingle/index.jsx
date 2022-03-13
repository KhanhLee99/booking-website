import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QtyPerson from '../QtyPerson';

HeroSingle.propTypes = {

};

function HeroSingle(props) {


    return (
        <section className="hero_single version_2">
            <div className="wrapper">
                <div className="container">
                    <h3>Book unique experiences</h3>
                    <p>Explore top rated tours, hotels and restaurants around the world</p>
                    <form>
                        <div className="row no-gutters custom-search-input-2">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Hotel, City..." />
                                    <i className="icon_pin_alt" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <input className="form-control" type="text" name="dates" placeholder="When.." />
                                    <i className="icon_calendar" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <QtyPerson />
                            </div>
                            <div className="col-lg-2">
                                <input type="submit" className="btn_search" defaultValue="Search" value="Search" />
                            </div>
                        </div>
                        {/* /row */}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default HeroSingle;