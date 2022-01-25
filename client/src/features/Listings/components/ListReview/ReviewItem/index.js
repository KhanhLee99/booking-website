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
    fontFamily: 'Roboto',
}

const ava_size = {
    width: '80px',
    height: '80px'
}

const review_content = {
    color: '#878c9f',
    fontSize: '14px',
    lineHeight: '24px',
}

function ReviewItem(props) {
    const { review } = props;
    return (
        <li style={listing_review_item}>
            <div className="avatar">
                <AvatarPlaceholder
                    avatar_url={review.avatar_url}
                    style={ava_size}
                />
            </div>
            <div className="comment-content">
                <div className="arrow-comment" />
                <div className="comment-by">{review.name}<span className="date">May 2019</span>
                    <div className="star-rating" data-rating={4} />
                </div>
                <p style={review_content}>{review.note}</p>
            </div>
        </li>
    );
}

export default ReviewItem;

