import React from 'react';
import PropTypes from 'prop-types';
import ListingItem from '../ListingItem';
import NoData from '../../../../components/NoData/NoData.js';


ListListingsLocation.propTypes = {

};

function ListListingsLocation(props) {

    const { listings, isLoggedIn, handleSave } = props;

    return (
        <div className="fl-wrap" style={{ padding: '30px 0 0' }}>
            {
                listings.length > 0 ?
                    listings.map((listing, index) => (
                        <ListingItem
                            key={index}
                            listing={listing}
                            isLoggedIn={isLoggedIn}
                            handleSave={handleSave}
                        />
                    ))
                    : <NoData />
            }
        </div >
    );
}

export default ListListingsLocation;