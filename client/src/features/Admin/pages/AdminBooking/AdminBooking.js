import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import useQuery from '../../../../@use/useQuery';
import Loading from '../../../../components/Loading/Loading';
import NoData from '../../../../components/NoData/NoData';
import adminBooking from '../../../../api/adminBooking';
import moment from 'moment';
import './AdminBooking.scss';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { AdminTab } from '../../../../app/constant';



AdminBooking.propTypes = {

};

function AdminBooking(props) {
    const qs = queryString.parse(props.location.search);
    const query = useQuery();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(() => { return qs.page || 0 });
    const [postsPerPage] = useState(() => { return qs.limit || 15 });
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/admin/booking/?page=${event.selected + 1}`)
    };


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const params = {
                    limit: postsPerPage,
                    page: query.get('page') || 1,
                }
                setLoading(true);
                await adminBooking.index({ params }).then(res => {
                    setBookings(res.data.data.data);
                    setTotalPages(res.data.data.last_page);
                    setLoading(false);
                })
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchBookings();

        return () => {
            setBookings([]);
        }
    }, [currentPage]);

    return (
        <CommonAdmin>
            <Child
                loading={loading}
                bookings={bookings}
                totalPages={totalPages}
                query={query}
                handlePageClick={handlePageClick}
                currentTab={AdminTab.BOOKINGS}
            />
        </CommonAdmin>
    );
}

export default AdminBooking;

function Child(props) {

    const { loading, bookings, totalPages, query, handlePageClick } = props;

    return (
        <>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Bookings</h3>
            </div>

            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
                <div className="card table-card">
                    <div className="card-block">
                        <div className="table-responsive">
                            {bookings.length > 0 ?
                                <table className="table table-hover table-borderless">
                                    <thead>
                                        <tr>
                                            <th style={{ color: '#495057' }} className='text-center'>#</th>
                                            <th style={{ color: '#495057' }}>Name</th>
                                            <th style={{ color: '#495057' }}>Listing</th>
                                            <th style={{ color: '#495057' }} className='text-center'>
                                                Checkin Checkout</th>
                                            <th style={{ color: '#495057' }} className='text-center'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {bookings.map((item, index) => (
                                            <AdminBookingItem
                                                key={index}
                                                reservation_id={item.id}
                                                user_name={item.user_name}
                                                user_email={item.user_email}
                                                user_avatar={item.user_avatar}
                                                listing_name={item.listing_name}
                                                listing_id={item.listing_id}
                                                listing_thumb={item.listing_thumb}
                                                street_address={item.street_address}
                                                created_at={item.created_at}
                                                checkin_date={item.checkin_date}
                                                checkout_date={item.checkout_date}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                : <NoData />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-20 fl-wrap' />

            {(totalPages > 0 && bookings.length > 0) ? <ReactPaginate
                previousLabel={
                    <MdArrowBackIosNew />
                }
                nextLabel={
                    <MdArrowForwardIos />
                }
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
        </>
    )
}

function AdminBookingItem(props) {
    const { reservation_id, user_avatar, user_name, user_email, created_at, listing_name, listing_id, listing_thumb, street_address, checkin_date, checkout_date } = props;
    return (
        <tr>
            {/* <td className="text-center text-muted">#{id}</td> */}
            <td className='text-center'>
                <div className="badge badge-warning">#{reservation_id}</div>
            </td>
            <td>
                <div className="widget-content p-0"><div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                            <img width={40} src={user_avatar} alt="" className="rounded-circle"
                                style={{
                                    verticalAlign: 'middle',
                                    borderStyle: 'none',
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        </div>
                    </div>
                    <div className="widget-content-left flex2">
                        <div className="widget-heading">{user_name}</div>
                        <div className="widget-subheading opacity-7">{user_email}</div>
                    </div>
                </div>
                </div>
            </td>
            <td>
                <div className="widget-content p-0"><div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                            <img width={40} src={listing_thumb} alt=""
                                style={{
                                    verticalAlign: 'middle',
                                    borderStyle: 'none',
                                    width: 40,
                                    height: 50,
                                }}
                            />
                        </div>
                    </div>
                    <div className="widget-content-left flex2">
                        <div className="widget-heading"><Link to={`/listing/${listing_id}`}>{listing_name}</Link></div>
                        <div className="widget-subheading opacity-7">{street_address}</div>
                    </div>
                </div>
                </div>
            </td>
            <td className='text-center'>
                <label className="label label-success">{moment(checkin_date, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD")}</label>
                <label className="label label-danger">{moment(checkout_date, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD')}</label>
            </td>
            <td className='text-center'>{moment(created_at, "YYYY-MM-DD hh:mm:ss").format('YYYY/MM/DD')}</td>
        </tr>
    )
}