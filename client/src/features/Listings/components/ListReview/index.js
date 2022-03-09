import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import AddReview from './AddReview/AddReview';
import ReviewItemSkeleton from './ReviewItemSkeleton/ReviewItemSkeleton';

ListReview.propTypes = {

};

function ListReview(props) {
    const { reviews, rating, title } = props;
    return (
        <>
            <div id="listing-reviews" className="listing-section">
                <h3 className="listing-desc-headline" style={title}>Reviews</h3>
                <div className="star-rating" data-rating="3.5">
                    <h3 className="listing-desc-headline" style={{ fontFamily: "Roboto", fontSize: '18px', }}><span className="star"></span>{rating} <span>({reviews.length} reviews)</span></h3>
                </div>

                <section className="comments listing-reviews" style={{ padding: 0 }}>
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

        </>

    );
}

export default ListReview;