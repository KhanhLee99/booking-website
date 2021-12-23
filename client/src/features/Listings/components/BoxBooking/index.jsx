import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import QtyPerson from '../../../Home/components/QtyPerson';

BoxBooking.propTypes = {

};

function BoxBooking(props) {

    const { listingDetail } = props;

    return (
        <aside className="col-lg-4" id="sidebar">
            <div className="box_detail booking">
                <div className="price">
                    <span>45$<small>/night</small></span>
                    <div className="score"><span>Good<em>350 Reviews</em></span></div>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" name="dates" placeholder="When.." />
                    <i className="icon_calendar" />
                </div>
                <QtyPerson
                    className={props.class}
                    listingDetail={listingDetail}
                />
                <a href="cart-1.html" className=" add_top_30 btn_1 full-width purchase">Purchase</a>
                <a href="wishlist.html" className="btn_1 full-width outline wishlist"><i className="icon_heart" /> Add to wishlist</a>
                <div className="text-center"><small>No money charged in this step</small></div>
            </div>
        </aside>

    );
}

export default BoxBooking;