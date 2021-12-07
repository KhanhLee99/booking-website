import React, { useState } from 'react';
import PropTypes from 'prop-types';

QtyPerson.propTypes = {

};

function QtyPerson(props) {

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
        <div className={active ? "panel-dropdown active" : "panel-dropdown"}>
            <a onClick={handlClickPanelDropdown} href="#">Guests <span className={animateRotate ? 'qtyTotal rotate-x' : 'qtyTotal'}>{adults + childrens}</span></a>
            <div className="panel-dropdown-content">
                <div className={"qtyButtons " + props.class}>
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
    );
}

export default QtyPerson;