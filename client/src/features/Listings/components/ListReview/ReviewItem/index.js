import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { toCssValue } from 'jss';

ReviewItem.propTypes = {

};

function ReviewItem(props) {
    const { review } = props;
    return (
        <li>
            <div className="avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt="" /> </div>
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