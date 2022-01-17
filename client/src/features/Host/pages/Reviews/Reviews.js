import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderHost from '../../components/HeaderHost';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../../@use/useQuery';
import reviewApi from '../../../../api/reviewApi';
import ReviewItem from './ReviewItem/ReviewItem';
import ReactPaginate from 'react-paginate';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

Reviews.propTypes = {

};

function Reviews(props) {
    const history = useHistory();
    const query = useQuery();

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const params = {
            limit: postsPerPage,
            page: query.get('page') || 1
        }
        setLoading(true);
        await reviewApi.getReviewsByHostId({ params }).then(res => {
            setReviews(res.data.data.data);
            setTotalPages(res.data.data.last_page);
            setLoading(false);
            window.scrollTo(0, 0)
        })
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/host/reviews?page=${event.selected + 1}`)
    };

    useEffect(() => {
        fetchReviews();

        return () => {
            setReviews([]);
        }
    }, [currentPage]);

    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            <HeaderHost />
            <div className='container' style={{ marginTop: '80px' }}>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-9'>
                        <div className="dashboard-list-box margin-top-0">
                            {/* Sort by */}
                            <div className="sort-by">
                                <div className="sort-by-select">
                                    <select data-placeholder="Default order" className="chosen-select-no-single">
                                        <option>All Listings</option>
                                        <option>Tom's Restaurant</option>
                                        <option>Sticky Band</option>
                                        <option>Hotel Govendor</option>
                                        <option>Burger House</option>
                                        <option>Airport</option>
                                        <option>Think Coffee</option>
                                    </select>
                                </div>
                            </div>
                            <h4>Visitor Reviews</h4>

                            <ul>
                                {reviews.map((review, index) => (
                                    <ReviewItem
                                        key={index}
                                        review={review}
                                    />
                                ))}
                            </ul>
                        </div>

                        {totalPages > 0 ? <ReactPaginate
                            previousLabel={
                                <MdArrowBackIosNew />
                            }
                            nextLabel={
                                <MdArrowForwardIos />
                            }

                            // initialPage={1}
                            // initialPage={currentPage}
                            forcePage={(query.get('page') != undefined) ? query.get('page') - 1 : 0}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={totalPages === 0 ? "page-item disabled" : "page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        /> : null}

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Reviews;