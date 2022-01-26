import React from 'react';
import PropTypes from 'prop-types';
import './ListingActiveItem.scss';
import { Link } from 'react-router-dom';

ListingActiveItem.propTypes = {

};

function ListingActiveItem(props) {
    const { listing, lockListing } = props;

    const handleLockListing = (e, id) => {
        e.preventDefault();
        lockListing(id);
    }

    return (
        <div className="dashboard-list fl-wrap">
            <div className="dashboard-message">
                <div className="booking-list-contr">
                    <a onClick={(e) => handleLockListing(e, listing.id)} href="#" className="green-bg tolt" data-microtip-position="left" data-tooltip="Public"><i className="fal fa-lock" /></a>
                    {/* <a href="#" className="color-bg tolt" data-microtip-position="left" data-tooltip="Edit"><i className="fal fa-edit" /></a> */}
                    <a href="#" className="red-bg tolt" data-microtip-position="left" data-tooltip="Delete"><i className="fal fa-trash" /></a>
                </div>
                <div className="dashboard-message-text">
                    <img src={listing.avatar_url} alt="" />
                    <h4><Link to={`/listing/${listing.id}`}>{listing.name}</Link></h4>
                    <div className="geodir-category-location clearfix"><a href="#"> {listing.street_address}</a></div>
                </div>
            </div>
        </div>
    );
}

export default ListingActiveItem;