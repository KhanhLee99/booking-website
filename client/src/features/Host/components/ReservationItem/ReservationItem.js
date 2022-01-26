import React from 'react';
import PropTypes from 'prop-types';
import ThumbListingPlaceholder from '../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import './ReservationItem.scss';
import Reservation from '../../pages/Reservation/Reservation';
import { Link } from 'react-router-dom';

ReservationItem.propTypes = {

};

const color_reservation_status = (status_id) => {
    if (status_id === 1) {
        return {
            border: '2px solid #f6cf48',
            color: '#f6cf48',
        }
    }
    if (status_id === 2) {
        return {
            border: '2px solid #7cccb2',
            color: '#7cccb2',
        }
    }
    if (status_id === 4) {
        return {
            border: '2px solid #5b5b68',
            color: '#5b5b68',
        }
    }
}

const ava_size = {
    width: '55px',
    height: '55px',
    float: 'left',
}

function ReservationItem(props) {
    const { reservation } = props;
    return (
        <div className="dashboard-list fl-wrap " style={{ border: '1px solid #e5e7f2', marginBottom: '20px' }}>
            <div className="dashboard-message user-booking r-item">

                <div className="k-booking-status">
                    <span className='status-text' style={color_reservation_status(reservation.reservation_status_id)}>{reservation.status}</span>
                    <p className='booking-price'>{parseInt(reservation.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('.', ',')}</p>
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
                        <h4 className='user-name-booking fl-wrap'>{reservation.user_name} - <span>27 December 2019</span></h4>
                        <div class="booking-details fl-wrap">
                            <span class="booking-title">Mail :</span>
                            <span class="booking-text"><a href="#" target="_top">yormail@domain.com</a></span>
                        </div>
                        <div class="booking-details fl-wrap">
                            <span class="booking-title">Phone :</span>
                            <span class="booking-text"><a href="#" target="_top">+496170961709</a></span>
                        </div>
                        <div class="booking-details fl-wrap">
                            <span class="booking-title">Payment State :</span>
                            <span class="booking-text"><a href="#" target="_top">Paypal</a></span>
                        </div>
                    </div>
                </div>

            </div>

            <div className='fl-wrap'>
                <span className="fw-separator"></span>
            </div>

            <div className='accept-booking fl-wrap'>
                <a href="#" onClick={() => { }} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}>  Accept </a>
                <a href="#" onClick={() => { }} className="scroll-nav-wrapper-opt-btn showshare" style={scroll_nav_wrapper_opt_btn}> Decline </a>
            </div>
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