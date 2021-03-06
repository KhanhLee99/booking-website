import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserBookingItem from '../../components/UserBookingItem/UserBookingItem';
import reservationApi from '../../../../api/reservationApi';
import reviewApi from '../../../../api/reviewApi';
import { ReservationStatus, UserProfileTab } from '../../../../app/constant';
import Loading from '../../../../components/Loading/Loading';
import { alertSuccess } from '../../../../@helper/alertComfirm';
import UserChat from '../../components/UserChat/UserChat';
import NoData from '../../../../components/NoData/NoData';
import { useHistory } from 'react-router-dom';
import CommonUserProfile from '../../../../components/CommonUserProfile/CommonUserProfile';
import { useSnackbar } from 'notistack';

MyBooking.propTypes = {

};

function MyBooking(props) {

    const history = useHistory();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

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
                handleEditStatus(id, ReservationStatus.CANCELLED.id);
                setLoading(false);
                alertSuccess('Success', 'Cancel reservation success');
            }).catch(err => {
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleCheckout = async (id) => {
        try {
            const params = {
                reservation_status_id: ReservationStatus.CHECKOUT.id
            }
            setLoading(true);
            await reservationApi.editStatusReservation(id, params).then(() => {
                handleEditStatus(id, ReservationStatus.CHECKOUT.id);
                setLoading(false);
            }).catch(err => {
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleEditStatus = (id, ReservationStatusId) => {
        let tmp = [...reservations];
        let index = tmp.findIndex(item => item.id == id);
        if (index != -1) {
            tmp[index].reservation_status_id = ReservationStatusId;
            setReservations(tmp);
        }
    }

    const handleAddReview = async (id, content, rating, reservation_id) => {
        try {
            const params = {
                note: content,
                rating: rating,
            }
            const params2 = {
                reservation_status_id: ReservationStatus.REVIEWED.id
            }
            setLoading(true);
            await reviewApi.addReviewListing(params, id).then(res => {
                if (res.data.status = 'success') {
                    reservationApi.editStatusReservation(reservation_id, params2).then(() => {
                        handleEditStatus(reservation_id, ReservationStatus.REVIEWED.id);
                        setLoading(false);
                        enqueueSnackbar('Thank You For Your Review.', { variant: "success" })
                    }).catch(err => {
                        console.log(err.message);
                    });
                }
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    const handlePay = (id) => {
        history.push(`/payment/${id}`);
    }

    useEffect(() => {
        fetchMyReservation();
        window.scrollTo(0, 0);

        return () => {
            setReservations([]);
        }
    }, []);


    return (
        <CommonUserProfile
            currentTab={UserProfileTab.BOOKINGS}
        >
            {loading && <Loading />}
            <h3 className='h3_title'>My Bookings</h3>
            <div className="dashboard-list-box fl-wrap" style={{ marginTop: 0 }}>
                {
                    reservations.length > 0 ? reservations.map((item, index) => (
                        <UserBookingItem
                            key={index}
                            reservation={item}
                            handleCancel={handleCancel}
                            handleCheckout={handleCheckout}
                            handlePay={handlePay}
                            handleAddReview={handleAddReview}
                        />
                    )) : <NoData />
                }
            </div>
        </CommonUserProfile>
    );
}

export default MyBooking;