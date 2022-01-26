import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import { useSelector } from 'react-redux';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import HeaderHost from '../../components/HeaderHost';
import './Reservation.scss';
import ReactPaginate from 'react-paginate';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import useQuery from '../../../../@use/useQuery';
import { useHistory } from 'react-router-dom';
import { ReservationFilter } from '../../../../app/constant';

Reservation.propTypes = {

};

function Reservation(props) {
    const history = useHistory();
    const query = useQuery();
    const loggedInUser = useSelector((state) => state.userSlice.current);

    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState(ReservationFilter.ALL);

    const fetchHostBooking = async () => {
        const params = {
            limit: postsPerPage,
            page: query.get('page') || 1,
            filter: filter
        }
        setLoading(true);
        await adminListing.getHostBooking(loggedInUser.id, { params }).then(res => {
            console.log(res)
            setBooking(res.data.data.data);
            setTotalPages(res.data.data.last_page);
            setLoading(false);
        });
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/host/booking/?page=${event.selected + 1}`)
    };

    const handleChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        fetchHostBooking();

        return () => {
            setBooking([]);
        }
    }, [currentPage, filter]);
    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            <HeaderHost />
            <div className='container' style={{ marginTop: '80px', paddingTop: '20px', minHeight: window.innerHeight }}>
                <div className='reservations-header-title wrap-title-header fl-wrap'>
                    <div style={{ width: '50%', float: 'left', height: '69px', display: 'flex', alignItems: 'center' }}>
                        <h3 className='h3_title'>Reservation</h3>
                    </div>
                    <div className='filter-host-listing'>
                        <div className='dropdown'>
                            <select value={ReservationFilter.ALL} className="no-search-select" onChange={handleChange}>
                                <option value={ReservationFilter.ALL}>Tất cả</option>
                                <option value={ReservationFilter.REQUEST}>Yêu cầu xác nhận</option>
                                <option value={ReservationFilter.UPCOMING}>Sắp đến</option>
                                <option value={ReservationFilter.TODAY}>Hôm nay</option>
                            </select>
                        </div>

                        <div className='search'>
                            <input type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                </div>
                <div className="dashboard-list-box fl-wrap">
                    {
                        loading ? <div>Loading</div> :
                            booking.map((item, index) => (
                                <ReservationItem
                                    key={index}
                                    reservation={item}
                                />
                            ))
                    }
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
    );
}

export default Reservation;