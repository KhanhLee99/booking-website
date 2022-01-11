import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

ListingItemSkeleton.propTypes = {

};
const listingItem = {
    float: 'left',
    width: '50%',
    padding: '0 8px 0 0',
    marginBottom: '12px',
    position: 'relative',
}
function ListingItemSkeleton(props) {
    return (
        <Skeleton className="col-md-6" height={400} />
    );
}

export default ListingItemSkeleton;