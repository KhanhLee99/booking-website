import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

TabHorizontal.propTypes = {

};

function TabHorizontal(props) {
    return (
        <nav className="secondary_nav sticky_horizontal">
            <div className="container">
                <ul className="clearfix">
                    <li><a href="#description" className="active">Description</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#sidebar">Booking</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default TabHorizontal;