import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

ReviewItemSkeleton.propTypes = {

};

const listing_review_item = {
    marginTop: '20px',
}

function ReviewItemSkeleton(props) {
    return (
        <li style={listing_review_item}>
            <div className="avatar">
                <Skeleton width={'80px'} height={'80px'} circle={'50%'} />
            </div>
            <div className="comment-content">
                <Skeleton height={'20px'} width={'30%'} />
                <Skeleton height={'20px'} width={'20%'} />
                <Skeleton height={'20px'} width={'100%'} />
            </div>
        </li>
    );
}

export default ReviewItemSkeleton;