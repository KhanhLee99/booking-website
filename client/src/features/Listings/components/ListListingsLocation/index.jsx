import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../ListingItem';

ListListingsLocation.propTypes = {

};

function ListListingsLocation(props) {

    const { listings, loading, isLoggedIn, loggedInUser } = props;

    return (
        <div className="fl-wrap" style={{ padding: '30px 0 0' }}>
            {listings.map((listing, index) => (
                <ListingItem
                    key={index}
                    listing={listing}
                    isLoggedIn={isLoggedIn}
                    loggedInUser={loggedInUser}
                />
            ))}
        </div >

    );
}

export default ListListingsLocation;