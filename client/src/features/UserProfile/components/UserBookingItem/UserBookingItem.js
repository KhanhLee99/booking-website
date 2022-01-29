import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserBookingItem.scss';
import ThumbListingPlaceholder from '../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import moment from 'moment';
import Popup from 'reactjs-popup';
import AddReview from '../../../Listings/components/ListReview/AddReview/AddReview';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import { ReservationStatus } from '../../../../app/constant';
import { alertConfirm } from '../../../../@helper/alertComfirm';


UserBookingItem.propTypes = {

};

export const color_reservation_status = (status_id) => {
    switch (status_id) {
        case ReservationStatus.REQUEST.id:
            return {
                borderColor: ReservationStatus.REQUEST.color,
                color: ReservationStatus.REQUEST.color,
            }
        case ReservationStatus.ACCEPTED.id:
            return {
                borderColor: ReservationStatus.ACCEPTED.color,
                color: ReservationStatus.ACCEPTED.color,
            }
        case ReservationStatus.PAID.id:
            return {
                borderColor: ReservationStatus.PAID.color,
                color: ReservationStatus.PAID.color,
            }
        case ReservationStatus.CANCELLED.id:
            return {
                borderColor: ReservationStatus.CANCELLED.color,
                color: ReservationStatus.CANCELLED.color,
            }
        case ReservationStatus.CHECKIN.id:
            return {
                borderColor: ReservationStatus.CHECKIN.color,
                color: ReservationStatus.CHECKIN.color,
            }
        case ReservationStatus.CHECKOUT.id:
            return {
                borderColor: ReservationStatus.CHECKOUT.color,
                color: ReservationStatus.CHECKOUT.color,
            }
        case ReservationStatus.DECLINE.id:
            return {
                borderColor: ReservationStatus.DECLINE.color,
                color: ReservationStatus.DECLINE.color,
            }
        default:
            return;
    }
}

export const statusText = (status_id) => {
    switch (status_id) {
        case ReservationStatus.REQUEST.id:
            return ReservationStatus.REQUEST.name;
        case ReservationStatus.ACCEPTED.id:
            return ReservationStatus.ACCEPTED.name;
        case ReservationStatus.PAID.id:
            return ReservationStatus.PAID.name
        case ReservationStatus.CANCELLED.id:
            return ReservationStatus.CANCELLED.name
        case ReservationStatus.CHECKIN.id:
            return ReservationStatus.CHECKIN.name
        case ReservationStatus.CHECKOUT.id:
            return ReservationStatus.CHECKOUT.name
        case ReservationStatus.DECLINE.id:
            return ReservationStatus.DECLINE.name
        default:
            return;
    }
}

const ava_size = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
}

function UserBookingItem(props) {

    const { reservation, handleCancel, handleAddReview } = props;

    const cancelReservation = (e) => {
        e.preventDefault();
        alertConfirm('Confirm to submit', 'Are you sure to cancel this reservation ?', () => handleCancel(reservation.id));
    }

    const checkBtnCancel = () => {
        let arr = [ReservationStatus.CANCELLED.id, ReservationStatus.DECLINE.id, ReservationStatus.CHECKOUT.id];

        if (arr.includes(reservation.reservation_status_id) == false) {
            return <a href='#' className='cancel-reservation-btn' onClick={(e) => cancelReservation(e)}>Huỷ đặt phòng</a>
        }
        return null;
    }

    const checkBtnReview = () => {
        try {
            var now = moment(moment().toDate(), "YYYY-MM-DD hh:mm:ss");
            var checkout = moment(reservation.checkout_date, "YYYY-MM-DD hh:mm:ss");
            var { _data } = moment.duration(now.diff(checkout));
            if (_data.days >= 0 && _data.days <= 14) {
                return <>
                    <div className='fl-wrap'>
                        <span className="fw-separator"></span>
                    </div>

                    <div className='review-btn fl-wrap'>
                        <Popup
                            trigger={<a href='#' onClick={e => e.preventDefault()}>Đánh giá</a>}
                            position="center"
                            modal
                            nested
                            closeOnDocumentClick
                            className='popup-content'
                        >
                            {close => (
                                <AddReview
                                    id={reservation.listing_id}
                                    name={reservation.listing_name}
                                    handleAddReview={handleAddReview}
                                    close={close}
                                />
                            )}
                        </Popup >
                    </div>
                </>
            }
            return null;
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="dashboard-list fl-wrap" style={{ border: '1px solid #e5e7f2', marginBottom: '20px' }}>
            <div className='fl-wrap reservation-head'>
                <div className='host-info'>
                    <AvatarPlaceholder
                        avatar_url={reservation.host_avatar}
                        style={ava_size}
                    />
                    <h5>{reservation.host_name}</h5>
                </div>

                <div className="k-booking-status">
                    {checkBtnCancel()}
                    <span className='status-text' style={color_reservation_status(reservation.reservation_status_id)}>
                        {statusText(reservation.reservation_status_id)}
                    </span>
                </div>
            </div>

            <div className='fl-wrap'>
                <span className="fw-separator"></span>
            </div>

            <div className="dashboard-message user-booking">
                <div className="k-booking-price">
                    <p className='booking-price'>{parseInt(reservation.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('.', ',')}</p>
                </div>

                <div className="dashboard-message-text">
                    <Link to={`/listing/${reservation.listing_id}`}>
                        <ThumbListingPlaceholder
                            listing_img={reservation.thumb_img}
                        />
                    </Link>
                    {/* <h4><a href='#' onClick={e => e.preventDefault()} className='booking-date'>{(new Date(reservation.checkin_date)).toDateString()} - {(new Date(reservation.checkout_date)).toDateString()}</a></h4> */}
                    <h3><Link to={`/listing/${reservation.listing_id}`}>{reservation.listing_name}</Link></h3>
                    <h4 style={{ color: '#566985' }}>Date :<a href='#' onClick={e => e.preventDefault()} className='booking-date' style={{ color: '#4db7fe' }}> {(new Date(reservation.checkin_date)).toLocaleDateString("vi-VN")} - {(new Date(reservation.checkout_date)).toLocaleDateString("vi-VN")}</a></h4>
                    <h4 style={{ color: '#566985' }}>Guests : 1 adult</h4>
                    <div className="geodir-category-location clearfix"><a href="#" className='booking-address'>{reservation.street_address}</a></div>
                </div>
            </div>

            {checkBtnReview()}
        </div>
    );
}

export default UserBookingItem;

