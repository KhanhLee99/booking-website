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
import { HostTab, ReservationFilter, ReservationStatus } from '../../../../app/constant';
import reservationApi from '../../../../api/reservationApi';
import Loading from '../../../../components/Loading/Loading';
import ReactNotificationComponent, { NotificationStattus } from '../../../../components/Notification/ReactNotification';
import useWindowDimensions from '../../../../@use/useWindowDimensions';
import NoData from '../../../../components/NoData/NoData';
import CountUp from 'react-countup';

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
    const [showNoti, setShowNoti] = useState(false);
    const [noti, setNoti] = useState({ title: '', body: '', status: NotificationStattus.SUCCESS });


    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        history.push(`/host/booking/?page=${event.selected + 1}`)
    };

    const handleChange = (e) => {
        setFilter(e.target.value);
    }

    const handleAccept = async (id) => {
        setLoading(true);
        await reservationApi.editStatusReservation(id, { reservation_status_id: ReservationStatus.ACCEPTED.id }).then(res => {
            setLoading(false);
            handleEditStatus(id, ReservationStatus.ACCEPTED.id);
        }).catch(err => {
            setNoti({ title: 'Error', body: 'Error', status: NotificationStattus.ERROR });
            setLoading(false);
        });
    }

    const handleDecline = async (id) => {
        setLoading(true);
        await reservationApi.editStatusReservation(id, { reservation_status_id: ReservationStatus.DECLINE.id }).then(() => {
            handleEditStatus(id, ReservationStatus.DECLINE.id);
            setLoading(false);
        }).catch(err => {
            setNoti({ title: 'Error', body: 'Error', status: NotificationStattus.ERROR });
            setLoading(false);
        });
    }

    const handleCancel = async (id) => {
        setLoading(true);
        await reservationApi.editStatusReservation(id, { reservation_status_id: ReservationStatus.CANCELLED.id }).then(() => {
            handleEditStatus(id, ReservationStatus.CANCELLED.id);
            setLoading(false);
        })
    }

    const handleCheckin = async (id) => {
        setLoading(true);
        await reservationApi.editStatusReservation(id, { reservation_status_id: ReservationStatus.CHECKIN.id }).then(() => {
            handleEditStatus(id, ReservationStatus.CHECKIN.id);
            setLoading(false);
        })
    }

    const handleEditStatus = (id, ReservationStatusId) => {
        let tmp = [...booking];
        let index = tmp.findIndex(item => item.id == id);
        if (index != -1) {
            tmp[index].reservation_status_id = ReservationStatusId;
            setBooking(tmp);
        }
        setLoading(false);
    }

    useEffect(() => {
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

        fetchHostBooking();

        return () => {
            setBooking([]);
        }
    }, [currentPage, filter]);

    const { height } = useWindowDimensions();


    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            {loading && <Loading />}
            {/* {showNoti && <ReactNotificationComponent
                title={noti.title}
                body={noti.body}
                status={noti.status}
            />} */}
            <HeaderHost
                currentTab={HostTab.RESERVATIONS}
            />
            <div className='container' style={{ marginTop: '80px', paddingTop: '20px', minHeight: height }}>
                <div className='reservations-header-title wrap-title-header fl-wrap'>
                    <div style={{ width: '50%', float: 'left', height: '69px', display: 'flex', alignItems: 'center' }}>
                        <h3 className='h3_title' style={{ marginBottom: 0 }}>Business situation statistics</h3>
                    </div>
                </div>

                <div className='h-20 fl-wrap' />

                <div className='row'>
                    <StatisticalItem
                        title={'Revenue'}
                        icon={'fal fa-envelope-open-dollar'}
                        count={2347}
                    >
                        <div className="stat-wave">
                            <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 17 45 8 T100 11 V30z" />
                            </svg>
                        </div>
                    </StatisticalItem>
                    <StatisticalItem
                        title={'Listings'}
                        icon={'fal fa-home'}
                        count={5}
                    >
                        <div className="stat-wave">
                            <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 12 55 5 T100 11 V30z" />
                            </svg>
                        </div>
                    </StatisticalItem>
                    <StatisticalItem
                        title={'Reservations'}
                        icon={'fal fa-calendar-check'}
                        count={235000}
                    >
                        <div className="stat-wave">
                            <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                            </svg>
                        </div>
                    </StatisticalItem>
                    <StatisticalItem
                        title={'Reviews'}
                        icon={'fal fa-comments'}
                        count={200}
                    >
                        <div className="stat-wave">
                            <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 17 55 2 T100 11 V30z" />
                            </svg>
                        </div>
                    </StatisticalItem>


                </div>

                <div className='h-20 fl-wrap' />

                <div className='reservations-header-title wrap-title-header fl-wrap'>
                    <div style={{ width: '50%', float: 'left', height: '69px', display: 'flex', alignItems: 'center' }}>
                        <h3 className='h3_title' style={{ marginBottom: 0 }}>Reservation</h3>
                    </div>
                    <div style={{ float: 'right', height: 69, display: 'flex', alignItems: 'center' }}>
                        <div className='dropdown'>
                            <select defaultValue={ReservationFilter.ALL} className="no-search-select" onChange={handleChange}>
                                <option value={ReservationFilter.ALL}>Tất cả</option>
                                <option value={ReservationFilter.REQUEST}>Yêu cầu xác nhận</option>
                                <option value={ReservationFilter.UPCOMING}>Sắp đến</option>
                                <option value={ReservationFilter.CHECKIN}>Đang tiếp đón</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="dashboard-list-box fl-wrap">
                    {
                        booking.length > 0 ? booking.map((item, index) => (
                            <ReservationItem
                                key={index}
                                reservation={item}
                                handleAccept={handleAccept}
                                handleDecline={handleDecline}
                                handleCancel={handleCancel}
                                handleCheckin={handleCheckin}
                            />
                        )) : <NoData
                            description='No reservations yet'
                        />
                    }
                </div>

                <div className='h-20 fl-wrap' />

                {(totalPages > 0 && booking.length > 0) ? <ReactPaginate
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
            </div>
        </div>
    );
}

export default Reservation;

Reservation.propTypes = {
    title: PropTypes.string,
};

StatisticalItem.defaultProps = {
    title: ''
}

function StatisticalItem(props) {
    const { title, icon, count } = props;
    return (
        <div className="col-md-3">
            <div className="dashboard_inline-facts-wrap gradient-bg" style={{ height: '112px' }}>
                <div className="inline-facts">
                    <i className={icon} />
                    <div className="milestone-counter">
                        <div className="stats animaper">
                            <CountUp
                                start={0}
                                end={count}
                                className="num"
                                duration={1}
                            />
                            {/* <div className="num" data-content={0} data-num={1054}>{1054}</div> */}
                        </div>
                    </div>
                    <h6>{title}</h6>
                </div>
            </div>
            {props.children}
        </div>
    )
}

