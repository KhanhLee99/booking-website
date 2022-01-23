import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserBookingItem from '../../components/UserBookingItem/UserBookingItem';
import reservationApi from '../../../../api/reservationApi';
import reviewApi from '../../../../api/reviewApi';

MyBooking.propTypes = {

};

function MyBooking(props) {
    const [reservations, setReservations] = useState([]);
    const [loadingAddReview, setLoadingAddReview] = useState(false);

    const fetchMyReservation = async () => {
        await reservationApi.getMyReservation().then(res => {
            setReservations(res.data.data);
        })
    }

    const handleCancel = async (id) => {
        const params = {
            reservation_status_id: 4
        }
        await reservationApi.editStatusReservation(id, params);
    }

    const handleAddReview = async (id, content) => {
        try {
            const params = {
                note: content,
                rating: 5,
            }
            setLoadingAddReview(true);
            await reviewApi.addReviewListing(params, id).then(res => {
                if (res.data.status = 'success') {
                    setLoadingAddReview(false);
                }
            })
        } catch (err) {
            console.log(err.message);
        }
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
                        handleCancel={handleCancel}
                        handleAddReview={handleAddReview}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyBooking;