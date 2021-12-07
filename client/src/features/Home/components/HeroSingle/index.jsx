import React, { useState } from 'react';
import PropTypes from 'prop-types';

HeroSingle.propTypes = {

};

function HeroSingle(props) {
    const [active, setActive] = useState(false);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [animateRotate, setAnimateRotate] = useState(false);

    const handlClickPanelDropdown = (e) => {
        setActive(!active);
        e.preventDefault();
    }

    const handleDec = (type, value) => {
        if (value > 0) {
            type == 'adults' ? setAdults(value - 1) : setChildrens(value - 1);
            // setAnimateRotate(true);
            // setTimeout(() => {
            //     setAnimateRotate(false);
            // }, 300);
        }
    }

    const handleInc = (type, value) => {
        type == 'adults' ? setAdults(value + 1) : setChildrens(value + 1);
        // setAnimateRotate(true);
        // setTimeout(() => {
        //     setAnimateRotate(false);
        // }, 300);
    }

    return (
        <section className="hero_single version_2">
            <div className="wrapper">
                <div className="container">
                    <h3>Book unique experiences</h3>
                    <p>Expolore top rated tours, hotels and restaurants around the world</p>
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
                                    <input className="form-control" type="text" name="dates" placeholder="When.."/>
                                    <i className="icon_calendar" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={active ? "panel-dropdown active" : "panel-dropdown"}>
                                    <a onClick={handlClickPanelDropdown} href="#">Guests <span className={animateRotate ? 'qtyTotal rotate-x' : 'qtyTotal'}>{adults + childrens}</span></a>
                                    <div className="panel-dropdown-content">
                                        {/* Quantity Buttons */}
                                        <div className="qtyButtons">
                                            <label>Adults</label>
                                            <div onClick={() => handleDec('adults', adults)} className="qtyDec"></div>
                                            <input type="text" name="qtyInput" defaultValue={adults} value={adults} />
                                            <div onClick={() => handleInc('adults', adults)} className="qtyInc"></div>
                                        </div>
                                        <div className="qtyButtons">
                                            <label>Childrens</label>
                                            <div onClick={() => handleDec('childrens', childrens)} className="qtyDec"></div>
                                            <input type="text" name="qtyInput" defaultValue={childrens} value={childrens} />
                                            <div onClick={() => handleInc('childrens', childrens)} className="qtyInc"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <input type="submit" className="btn_search" defaultValue="Search" value="Search"/>
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