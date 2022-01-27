import React from 'react';
import PropTypes from 'prop-types';
import './GuestListingActive.scss';
import ListingActiveItem from '../ListingActiveItem/ListingActiveItem';

GuestListingActive.propTypes = {

};

function GuestListingActive(props) {
    const { list, lockListing } = props;

    return (
        <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
            {
                list.map((item, index) => (
                    <ListingActiveItem
                        key={index}
                        listing={item}
                        lockListing={lockListing}
                    />
                ))
            }
        </div>
    );
}

export default GuestListingActive;