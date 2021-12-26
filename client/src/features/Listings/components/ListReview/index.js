import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';

ListReview.propTypes = {

};

function ListReview(props) {
    const { reviews } = props;
    return (
        <div id="listing-reviews" className="listing-section">
            <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">Đánh giá</h3>
            <div className="star-rating" data-rating="3.5">
                <h3 className="listing-desc-headline margin-top-75 margin-bottom-20"><span className="star"></span>4,89 <span>({reviews.length} đánh giá)</span></h3>
            </div>

            <section className="comments listing-reviews">
                <ul>
                    {reviews.map((review, index) => (
                        <ReviewItem
                            key={index}
                            review={review}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default ListReview;