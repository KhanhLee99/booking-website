import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../ListingItem';

ListListingsLocation.propTypes = {

};

function ListListingsLocation(props) {
    const { listings } = props;
    console.log('listings', listings);
    return (
        <div className="isotope-wrapper">
            <div className="row">
                {listings.map((item) => (
                    <ListingItem
                        key={item.listing_id}
                        listing_type={item.listing_type}
                        name={item.name}
                        price_per_night={item.price_per_night}
                    />
                )
                )}
            </div>
        </div>

    );
}

export default ListListingsLocation;