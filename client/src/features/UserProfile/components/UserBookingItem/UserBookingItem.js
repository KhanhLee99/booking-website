import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserBookingItem.scss';
import ThumbListingPlaceholder from '../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';

UserBookingItem.propTypes = {

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

function UserBookingItem(props) {
    const { reservation } = props;

    return (

        <div className="dashboard-list fl-wrap" style={{ border: '1px solid #e5e7f2', marginBottom: '20px' }}>
            <div className="dashboard-message">
                <div className="k-booking-status">
                    <span className='status-text' style={color_reservation_status(reservation.reservation_status_id)}>{reservation.status}</span>
                    <p className='booking-price'>{parseInt(reservation.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('.', ',')}</p>
                </div>
                <div className="dashboard-message-text">
                    <Link to={`/listing/${reservation.listing_id}`}>
                        <ThumbListingPlaceholder
                            listing_img={reservation.thumb_img}
                        />
                    </Link>
                    <h4><a href='#' onClick={e => e.preventDefault()} className='booking-date'>{(new Date(reservation.checkin_date)).toDateString()} - {(new Date(reservation.checkout_date)).toDateString()}</a></h4>
                    <h4><Link to={`/listing/${reservation.listing_id}`}>{reservation.listing_name}</Link></h4>
                    <div className="geodir-category-location clearfix"><a href="#" className='booking-address'>{reservation.street_address}</a></div>
                </div>
            </div>
        </div>
    );
}

export default UserBookingItem;