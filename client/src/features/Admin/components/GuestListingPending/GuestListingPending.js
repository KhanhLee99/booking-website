import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GuestListingPending.scss';
import ListingPendingItem from '../ListingPendingItem/ListingPendingItem';

GuestListingPending.propTypes = {

};

function GuestListingPending(props) {

    const { list, handlePublicListing } = props;

    return (
        <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
            {
                list.map((item, index) => (
                    <ListingPendingItem
                        key={index}
                        listing={item}
                        handlePublicListing={handlePublicListing}
                    />
                ))
            }
        </div>
    );
}

export default GuestListingPending;