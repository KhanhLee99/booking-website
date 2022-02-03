import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserBookingItem from '../../components/UserBookingItem/UserBookingItem';
import reservationApi from '../../../../api/reservationApi';
import reviewApi from '../../../../api/reviewApi';
import { ReservationStatus } from '../../../../app/constant';
import Loading from '../../../../components/Loading/Loading';
import { alertSuccess } from '../../../../@helper/alertComfirm';
import UserChat from '../../components/UserChat/UserChat';

MyBooking.propTypes = {

};

function MyBooking(props) {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMyReservation = async () => {
        try {
            await reservationApi.getMyReservation().then(res => {
                setReservations(res.data.data);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleCancel = async (id) => {
        try {
            const params = {
                reservation_status_id: ReservationStatus.CANCELLED.id
            }
            setLoading(true);
            await reservationApi.editStatusReservation(id, params).then(() => {
                let tmp = [...reservations];
                let index = tmp.findIndex(item => item.id == id);
                if (index != -1) {
                    tmp[index].reservation_status_id = ReservationStatus.CANCELLED.id;
                    setReservations(tmp);
                }
                setLoading(false);
                alertSuccess('Success', 'Cancel reservation success');
            }).catch(err => {

            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleAddReview = async (id, content) => {
        try {
            const params = {
                note: content,
                rating: 5,
            }
            setLoading(true);
            await reviewApi.addReviewListing(params, id).then(res => {
                if (res.data.status = 'success') {
                    setLoading(false);
                }
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchMyReservation();
        window.scrollTo(0, 0);

        return () => {
            setReservations([]);
        }
    }, []);


    return (
        <div>
            {loading && <Loading />}
            <h3 className='h3_title'>My Bookings</h3>
            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
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