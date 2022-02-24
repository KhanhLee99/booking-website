import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Pay.scss';
import { useHistory, useParams } from 'react-router-dom';
import reservationApi from '../../../../api/reservationApi';
import { BookingInfo, Confirmation, CURRENT_FORM, h2_header, LeftSide, Payment } from '../../../Listings/components/Booking';
import Loading from '../../../../components/Loading/Loading';
import Header from '../../../../components/Header';
import { useSelector } from 'react-redux';
import { ReservationStatus } from '../../../../app/constant';
import moment from 'moment';
import adminPaymentApi from '../../../../api/adminPaymentApi';

Pay.propTypes = {

};

function Pay(props) {

    const { id } = useParams();
    const history = useHistory();

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const [reservation, setReservation] = useState({});
    const [loading, setLoading] = useState(true);

    const [activeBookingInfo] = useState(true);
    const [currentForm, setCurrentForm] = useState(CURRENT_FORM.BOOKING_INFO);
    const [activePayment, setActivePayment] = useState(false);
    const [activeConfirm, setActiveConfirm] = useState(false);
    const [totalPrice, setTotalPrice] = useState();


    const handlePay = async () => {
        try {
            const params = {
                reservation_status_id: ReservationStatus.PAID.id
            }
            setLoading(true);
            await reservationApi.editStatusReservation(id, params).then(() => {
                setActiveConfirm(true);
                setCurrentForm(CURRENT_FORM.CONFIRM);
                setLoading(false);
            }).catch(err => {
            });
            await adminPaymentApi.add({ reservation_id: id });
        } catch (err) {
            console.log(err.message);
        }

    }

    const defaultValueGuests = (adults, childrens) => {
        let s = adults + ' adults ';
        s += childrens > 0 ? '- ' + childrens + ' childrens' : '';
        return s;
    }

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                setLoading(true);
                await reservationApi.getDetailReservation(id).then(res => {
                    setReservation(res.data.data);
                    countPrice(res.data.data.checkin_date, res.data.data.checkout_date, res.data.data.listing_id);
                    setLoading(false);
                })
            } catch (err) {
                console.log(err.message);
            }
        }

        const countPrice = async (checkin, checkout, listing_id) => {
            try {
                const params = {
                    checkin: checkin,
                    checkout: checkout,
                    listing_id: listing_id
                }
                await reservationApi.countTotalPrice(params).then(res => {
                    setTotalPrice(res.data.data);
                })
            } catch (err) {
                console.log(err.message);
            }
        }


        fetchReservation();
    }, [])

    return (
        <div id="wrapper" className='gray-bg'>
            {loading && <Loading />}
            <Header />

            <div className="container" style={{ marginTop: '150px' }}>
                <div className="breadcrumbs inline-breadcrumbs fl-wrap block-breadcrumbs">
                    <h2 style={h2_header}>Booking form for : <span style={{ color: '#4DB7FE' }}>{reservation.listing_name}</span></h2>
                </div>
                <div className="fl-wrap">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 padding-right-30">
                            <ul id="booking_progressbar" className="no-list-style">
                                <li className={activeBookingInfo ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Booking Info">01.</span></li>
                                <li className={activePayment ? 'active' : ''} style={{ width: '50%' }}><span className="tolt" data-microtip-position="top" data-tooltip="Personal Info">02.</span></li>
                                <li className={activeConfirm ? 'active' : ''} style={{ width: '50%' }}><span className="tolt" data-microtip-position="top" data-tooltip="Confirm">03.</span></li>
                            </ul>

                            <div className="bookiing-form-wrap block_box fl-wrap">
                                <div className="list-single-main-item fl-wrap hidden-section tr-sec">
                                    <div className="profile-edit-container">
                                        <div className="_custom_form">
                                            {(reservation && totalPrice) && <BookingInfo
                                                adults={reservation.adult_count}
                                                childrens={reservation.child_count}
                                                checkin_date={reservation.checkin_date.split(' ')[0]}
                                                checkout_date={reservation.checkout_date.split(' ')[0]}
                                                nights={totalPrice.nights}
                                                isLoggedIn={isLoggedIn}
                                                bookingFormSubmit={() => { setActivePayment(true); setCurrentForm(CURRENT_FORM.PAYMENT) }}
                                                currentForm={currentForm}
                                                defaultValueGuests={defaultValueGuests}
                                            />
                                            }

                                            {reservation && <Payment
                                                total_usd={parseFloat(reservation.total_price) / 22650}
                                                currentForm={currentForm}
                                                handleBack={() => { setActivePayment(false); setCurrentForm(CURRENT_FORM.BOOKING_INFO) }}
                                                handleNext={handlePay}
                                            />}

                                            <Confirmation
                                                currentForm={currentForm}
                                                handleNext={() => history.push('/')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 margin-top-0 margin-bottom-60">
                            {(reservation && totalPrice) && <LeftSide
                                total_price={totalPrice.total_price}
                                rental_price={totalPrice.rental_price}
                                nights={totalPrice.nights}
                                id={reservation.listing_id}
                                avatar_url={reservation.thumb_img}
                                street_address={reservation.street_address}
                                name={reservation.listing_name}
                                checkin_date={reservation.checkin_date.split(' ')[0]}
                                checkout_date={reservation.checkout_date.split(' ')[0]}
                                defaultValueGuests={defaultValueGuests(reservation.adult_count, reservation.child_count)}
                            />}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;