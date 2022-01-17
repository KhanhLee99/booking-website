import React from 'react';
import PropTypes from 'prop-types';
import AvatarPlaceholder from '../../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import './ReviewItem.scss';

ReviewItem.propTypes = {

};

function ReviewItem(props) {
    const { review } = props;
    return (
        <li>
            <div className="comments listing-reviews">
                <ul>
                    <li>
                        <div className="avatar">
                            <AvatarPlaceholder
                                avatar_url={review.user_avatar}
                                className='avatar_size'
                            />
                        </div>
                        <div className="comment-content">
                            <div className="arrow-comment" />
                            <div className="comment-by">{review.user_name} <div className="comment-by-listing">
                                on <a href="#">{review.listing_name}</a></div> <span className="date">{review.created_at}</span>
                                <div className="star-rating" data-rating="5">
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <p>{review.content}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    );
}

export default ReviewItem;