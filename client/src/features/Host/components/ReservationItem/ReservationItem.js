import React from 'react';
import PropTypes from 'prop-types';
import ThumbListingPlaceholder from '../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import './ReservationItem.scss';
import Reservation from '../../pages/Reservation/Reservation';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ReservationStatus } from '../../../../app/constant';
import { alertConfirm } from '../../../../@helper/alertComfirm';
import { color_reservation_status, statusText } from '../../../UserProfile/components/UserBookingItem/UserBookingItem';
import { parseVNDCurrency } from '../../../../@helper/helper';


ReservationItem.propTypes = {

};

const ava_size = {
    width: '55px',
    height: '55px',
    float: 'left',
}

function ReservationItem(props) {
    const { reservation, handleDecline, handleAccept, handleCancel, handleCheckin } = props;

    const accept = (e) => {
        e.preventDefault();
        alertConfirm('Confirm to submit', 'Are you sure to accept this reservation ?', () => handleAccept(reservation.id))
    }

    const decline = (e) => {
        e.preventDefault();
        alertConfirm('Confirm to submit', 'Are you sure to decline this reservation ?', () => handleDecline(reservation.id))
    }

    const cancel = (e) => {
        e.preventDefault();
        handleCancel(reservation.id);
    }
    const checkin = (e) => {
        e.preventDefault();
        handleCheckin(reservation.id);
    }

    const renderButton = (status) => {
        switch (status) {
            case ReservationStatus.REQUEST.id:
                return <>
                    <div className='fl-wrap'>
                        <span className="fw-separator"></span>
                    </div>
                    <div className='accept-booking fl-wrap'>
                        <a href="#" onClick={(e) => { accept(e) }} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}>  Accept </a>
                        <a href="#" onClick={(e) => { decline(e) }} className="scroll-nav-wrapper-opt-btn showshare" style={scroll_nav_wrapper_opt_btn}> Decline </a>
                    </div>
                </>
            case ReservationStatus.ACCEPTED.id:
                return <>
                    <div className='fl-wrap'>
                        <span className="fw-separator"></span>
                    </div>
                    <div className='accept-booking fl-wrap'>
                        <a href="#" onClick={(e) => { cancel(e) }} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}>  Cancel </a>
                    </div>
                </>
            case ReservationStatus.PAID.id:
                var checkout_date = moment(reservation.checkout_date, "YYYY-MM-DD hh:mm:ss");
                var checkin_date = moment(reservation.checkout_date, "YYYY-MM-DD hh:mm:ss");
                var now = moment(moment().toDate(), "YYYY-MM-DD hh:mm:ss");
                if (checkout_date.isSameOrAfter(now) && now.isSameOrBefore(checkin_date)) {
                    return <>
                        <div className='fl-wrap'>
                            <span className="fw-separator"></span>
                        </div>
                        <div className='accept-booking fl-wrap'>
                            <a href="#" onClick={(e) => { checkin(e) }} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}>  Checkin </a>
                        </div>
                    </>
                }
                return;
            default:
                return;
        }
    }

    return (
        <div className="dashboard-list fl-wrap " style={{ border: '1px solid #e5e7f2', marginBottom: '20px' }}>
            <div className="dashboard-message user-booking r-item">

                <div className="k-booking-status">
                    <span className='status-text' style={color_reservation_status(reservation.reservation_status_id)}>
                        {statusText(reservation.reservation_status_id)}
                    </span>
                    <p className='booking-price'>{parseVNDCurrency(reservation.total_price)}</p>
                </div>
                <div className="dashboard-message-text" style={{ width: '50%' }}>
                    <Link to={`/listing/${reservation.listing_id}`}>
                        <ThumbListingPlaceholder
                            listing_img={reservation.thumb_img}
                        />
                    </Link>
                    <h3><Link to={`/listing/${reservation.listing_id}`}>{reservation.listing_name}</Link></h3>
                    <h4 style={{ color: '#566985' }}>Date :<Link to={`/host/reservation/${reservation.id}`} className='booking-date' style={{ color: '#4db7fe' }}> {(new Date(reservation.checkin_date)).toLocaleDateString("vi-VN")} - {(new Date(reservation.checkout_date)).toLocaleDateString("vi-VN")}</Link></h4>
                    <h4 style={{ color: '#566985' }}>Guests : 1 adult</h4>
                    <div className="geodir-category-location clearfix"><a href="#" className='booking-address'>{reservation.street_address}</a></div>
                </div>

                <div className="dashboard-message-text abc" style={{ width: '30%' }}>
                    <AvatarPlaceholder
                        avatar_url={reservation.user_avatar_url}
                        className='avatar-radius'
                        style={ava_size}
                    />
                    <div className='user-booking-info'>
                        <h4 className='user-name-booking fl-wrap'>{reservation.user_name} - <span>{moment(reservation.created_at).format('LL')}</span></h4>
                        <div className="booking-details fl-wrap">
                            <span className="booking-title">Mail :</span>
                            <span className="booking-text"><a href="#" target="_top">{reservation.user_email}</a></span>
                        </div>
                        <div className="booking-details fl-wrap">
                            <span className="booking-title">Phone :</span>
                            <span className="booking-text"><a href="#" target="_top">{reservation.user_phone}</a></span>
                        </div>
                        <div className="booking-details fl-wrap">
                            <span className="booking-title">Payment State :</span>
                            <span className="booking-text"><a href="#" target="_top">Paypal</a></span>
                        </div>
                    </div>
                </div>

            </div>

            {renderButton(reservation.reservation_status_id)}
        </div>
    );
}

export default ReservationItem;

const scroll_nav_wrapper_opt_btn = {
    float: 'right',
    marginLeft: '10px',
    padding: '8px 20px',
    border: '1px solid transparent',
    background: '#425998',
    color: '#fff',
    fontSize: '12px',
    borderRadius: '2px',
}