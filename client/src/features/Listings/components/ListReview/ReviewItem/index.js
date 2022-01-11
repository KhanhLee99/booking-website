import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { toCssValue } from 'jss';
import AvatarPlaceholder from '../../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';

ReviewItem.propTypes = {

};

const listing_review_item = {
    paddingBottom: '20px',
    marginTop: '20px',
}

function ReviewItem(props) {
    const { review } = props;
    return (
        <li style={listing_review_item}>
            <div className="avatar">
                <AvatarPlaceholder
                    avatar_url={review.avatar_url}
                />
            </div>
            <div className="comment-content">
                <div className="arrow-comment" />
                <div className="comment-by">{review.name}<span className="date">May 2019</span>
                    <div className="star-rating" data-rating={4} />
                </div>
                <p>{review.note}</p>
            </div>
        </li>
    );
}

export default ReviewItem;