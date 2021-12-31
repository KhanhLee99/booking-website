import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GuestListingPending.scss';
import ListingPendingItem from '../ListingPendingItem/ListingPendingItem';

GuestListingPending.propTypes = {

};

function GuestListingPending(props) {

    const { list, publicListing } = props;

    return (
        <div className="dashboard-list-box fl-wrap">
            {list.length > 0 ? list.map((item, index) => (
                <ListingPendingItem
                    key={index}
                    listing={item}
                    publicListing={publicListing}
                />
            )) : 'Loading'
            }
        </div>
    );
}

export default GuestListingPending;