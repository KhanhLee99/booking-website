import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../ListingItem';

ListListingsLocation.propTypes = {

};

function ListListingsLocation(props) {
    const { listings, loading, loggedInUser, setTriggerPopup } = props;

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="isotope-wrapper">
            <div className="row">
                {listings.map((item) => (
                    <ListingItem
                        key={item.listing_id}
                        listing_id={item.listing_id}
                        listing_type={item.listing_type}
                        name={item.name}
                        price_per_night={item.price_per_night}
                        loggedInUser={loggedInUser}
                        setTriggerPopup={setTriggerPopup}
                    />
                )
                )}
            </div>
        </div>

    );
}

export default ListListingsLocation;