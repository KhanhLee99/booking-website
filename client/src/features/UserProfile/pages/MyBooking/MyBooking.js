import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserBookingItem from '../../components/UserBookingItem/UserBookingItem';
import reservationApi from '../../../../api/reservationApi';

MyBooking.propTypes = {

};

function MyBooking(props) {
    const [reservations, setReservations] = useState([]);

    const fetchMyReservation = async () => {
        await reservationApi.getMyReservation().then(res => {
            setReservations(res.data.data);
        })
    }

    useEffect(() => {
        fetchMyReservation();
        return () => {
            setReservations([]);
        }
    }, []);
    return (
        <div>
            <h3 className='h3_title'>Bookings</h3>
            <div className="dashboard-list-box fl-wrap">
                {reservations.map((item, index) => (
                    <UserBookingItem
                        key={index}
                        reservation={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyBooking;