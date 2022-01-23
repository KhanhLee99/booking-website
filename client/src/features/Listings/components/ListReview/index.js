import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import AddReview from './AddReview/AddReview';
import ReviewItemSkeleton from './ReviewItemSkeleton/ReviewItemSkeleton';

ListReview.propTypes = {

};

function ListReview(props) {
    const { reviews, handleAddReview, loadingAddReview, isLoggedIn } = props;
    return (
        <>
            <div id="listing-reviews" className="listing-section">
                <h3 className="listing-desc-headline">Đánh giá</h3>
                <div className="star-rating" data-rating="3.5">
                    <h3 className="listing-desc-headline"><span className="star"></span>4,89 <span>({reviews.length} đánh giá)</span></h3>
                </div>

                <section className="comments listing-reviews" style={{ padding: 0 }}>
                    <ul>
                        {reviews.map((review, index) => (
                            <ReviewItem
                                key={index}
                                review={review}
                            />
                        ))}
                        {/* {
                            loadingAddReview ? <ReviewItemSkeleton /> : null
                        } */}

                    </ul>
                </section>
            </div>
            {/* {
                isLoggedIn ? <AddReview
                    handleAddReview={handleAddReview}
                /> : null
            } */}

        </>

    );
}

export default ListReview;