import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ListingPendingItem.scss';
import { Link } from "react-router-dom";
import MoonLoading from '../../../../components/Loading/MoonLoading';
import PulseLoading from '../../../../components/Loading/PulseLoading';

ListingPendingItem.propTypes = {

};

function ListingPendingItem(props) {

    const [loadingPublic, setLoadingPublic] = useState(false);

    const { listing, publicListing } = props;

    const handlePublicListing = async (e, id) => {
        e.preventDefault();
        setLoadingPublic(true);
        await publicListing(id).then(() => {
            setLoadingPublic(false);
        });
    }

    return (
        <div className="dashboard-list fl-wrap">
            <div className="dashboard-message">
                <div className="booking-list-contr">
                    <a onClick={(e) => handlePublicListing(e, listing.id)} href="#" className="green-bg tolt" data-microtip-position="left" data-tooltip="Public">{loadingPublic ? <MoonLoading /> : <i className="fal fa-upload" />}</a>
                    <a href="#" className="color-bg tolt" data-microtip-position="left" data-tooltip="Edit"><i className="fal fa-edit" /></a>
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

export default ListingPendingItem;