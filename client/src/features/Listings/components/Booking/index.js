import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';
import reservationApi from '../../../../api/reservationApi';
import { PayPalButton } from "react-paypal-button-v2";
import TestPaypal from '../../../../components/Test/TestPaypal';
import PayPal from '../PayPal';
import { useSelector } from 'react-redux';
import notificationApi from '../../../../api/notificationApi';
import Header from '../../../../components/Header';
import useQuery from '../../../../@use/useQuery';
import { Link } from 'react-router-dom';
import { parseVNDCurrency } from '../../../../@helper/helper';
import LoginModal from '../../../../components/LoginModal/LoginModal';
import Loading from '../../../../components/Loading/Loading';

var fx = require('money');

Booking.propTypes = {

};

const CURRENT_FORM = {
    BOOKING_INFO: 'booking',
    PERSONAL_INFO: 'personal',
    PAYMENT: 'payment',
    CONFIRM: 'confirm',
}

function Booking(props) {
    const history = useHistory();
    const query = useQuery();
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [totalPrice, setTotalPrice] = useState();
    const [activeBookingInfo] = useState(true);
    const [activePersonalInfo, setActivePersonalInfo] = useState(false);
    const [activePayment, setActivePayment] = useState(false);
    const [activeConfirm, setActiveConfirm] = useState(false);
    const [currentForm, setCurrentForm] = useState(CURRENT_FORM.BOOKING_INFO);
    const [loading, setLoading] = useState(false);


    const handlePay = async () => {
        const params = {
            checkin_date: query.get('checkin'),
            checkout_date: query.get('checkout'),
            total_price: totalPrice.total_price,
            adult_count: 1,
            child_count: 0,
            reservation_status_id: 3, // 3: Paid
            guest_id: loggedInUser.id,
            listing_id: id
        }

        await reservationApi.sendReservation(params).then(() => {
            setActiveConfirm(true);
            setCurrentForm(CURRENT_FORM.CONFIRM);
        }).catch(err => console.log(err.message));
    }

    const handleSendRequest = async () => {
        const params = {
            checkin_date: query.get('checkin'),
            checkout_date: query.get('checkout'),
            total_price: totalPrice.total_price,
            adult_count: 1,
            child_count: 0,
            reservation_status_id: 1, // 1: Request
            guest_id: loggedInUser.id,
            listing_id: id
        }
        setLoading(true);
        await reservationApi.sendReservation(params).then(() => {
            setActiveConfirm(true);
            setCurrentForm(CURRENT_FORM.CONFIRM);
            setLoading(false);
        }).catch(err => console.log(err.message));
    }

    const personalFormSubmit = () => {
        if (listing && listing.reservation_form == 'quick') {
            setActivePayment(true);
            setCurrentForm(CURRENT_FORM.PAYMENT);
        } else {
            handleSendRequest();
        }
    }

    useEffect(() => {
        const getListing = async () => {
            await listingApi.getBaseInfoListing(id).then(res => {
                console.log(res.data);
                setListing(res.data.data)
            });
        }

        const countPrice = async () => {
            try {
                const params = {
                    checkin: query.get('checkin'),
                    checkout: query.get('checkout'),
                    listing_id: id
                }
                await reservationApi.countTotalPrice(params).then(res => {
                    setTotalPrice(res.data.data);
                })
            } catch (err) {
                console.log(err.message);
            }
        }

        getListing();
        countPrice();
        return () => {

        }
    }, []);


    return (
        <div id="wrapper" className='gray-bg'>
            {loading && <Loading />}
            <Header />

            <div className="container" style={{ marginTop: '150px' }}>
                <div className="booking_form fl-wrap" style={{ float: 'left', position: 'relative' }}>
                    <h2>Booking form for : <span>{listing.name}</span></h2>
                </div>
                <div className="fl-wrap">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 padding-right-30">
                            {
                                listing && listing.reservation_form == 'quick' ?
                                    <ul id="booking_progressbar" className="no-list-style">
                                        <li className={activeBookingInfo && "active"}><span className="tolt" data-microtip-position="top" data-tooltip="Booking Info">01.</span></li>
                                        <li className={activePersonalInfo && "active"}><span className="tolt" data-microtip-position="top" data-tooltip="Personal Info">02.</span></li>
                                        <li className={activePayment && "active"}><span className="tolt" data-microtip-position="top" data-tooltip="Payment Method">03.</span></li>
                                        <li className={activeConfirm && "active"}><span className="tolt" data-microtip-position="top" data-tooltip="Confirm">04.</span></li>
                                    </ul>
                                    :
                                    <ul id="booking_progressbar" className="no-list-style">
                                        <li className={activeBookingInfo && "active"}><span className="tolt" data-microtip-position="top" data-tooltip="Booking Info">01.</span></li>
                                        <li className={activePersonalInfo && "active"} style={{ width: '50%' }}><span className="tolt" data-microtip-position="top" data-tooltip="Personal Info">02.</span></li>
                                        <li className={activeConfirm && "active"} style={{ width: '50%' }}><span className="tolt" data-microtip-position="top" data-tooltip="Confirm">03.</span></li>
                                    </ul>
                            }

                            <div className="bookiing-form-wrap block_box fl-wrap">
                                <div className="list-single-main-item fl-wrap hidden-section tr-sec">
                                    <div className="profile-edit-container">
                                        <div className="_custom_form">
                                            <BookingInfo
                                                checkin_date={query.get('checkin')}
                                                checkout_date={query.get('checkout')}
                                                isLoggedIn={isLoggedIn}
                                                bookingFormSubmit={() => { setActivePersonalInfo(true); setCurrentForm(CURRENT_FORM.PERSONAL_INFO) }}
                                                currentForm={currentForm}
                                            />
                                            <PersonalInfo
                                                loggedInUser={loggedInUser}
                                                currentForm={currentForm}
                                                handleBack={() => { setActivePersonalInfo(false); setCurrentForm(CURRENT_FORM.BOOKING_INFO) }}
                                                handleNext={personalFormSubmit}
                                            />
                                            {
                                                (listing && totalPrice) && (listing.reservation_form && totalPrice.total_price) && <Payment
                                                    total_usd={parseFloat(totalPrice.total_price) / 22650}
                                                    currentForm={currentForm}
                                                    handleBack={() => { setActivePayment(false); setCurrentForm(CURRENT_FORM.PERSONAL_INFO) }}
                                                    handleNext={handlePay}
                                                />
                                            }
                                            <Confirmation
                                                currentForm={currentForm}
                                                handleNext={() => history.push('/')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div className="col-lg-4 col-md-4 margin-top-0 margin-bottom-60">
                            <LeftSide
                                listing={listing}
                                totalPrice={totalPrice}
                                id={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;

function BookingInfo(props) {
    const { checkin_date, checkout_date, isLoggedIn, bookingFormSubmit, currentForm } = props;
    return (
        <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.BOOKING_INFO ? 'block' : 'none' }}>
            <div className="list-single-main-item-title fl-wrap">
                <h3>Booking Information</h3>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <label className="vis-label">Guests <i className="far fa-user" /></label>
                    <input type="text" defaultValue={'1 guests'} disabled />
                </div>
                <div className="col-sm-6">
                    <label className="vis-label">Nights <i className="far fa-moon" /></label>
                    <input type="text" defaultValue={'1 nights'} disabled />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Checkin<i className="far fa-calendar" /></label>
                    <input type="text" defaultValue={checkin_date} disabled />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Checkout<i className="far fa-calendar" /></label>
                    <input type="text" defaultValue={checkout_date} disabled />
                </div>

                <div className="col-sm-12">
                    <label className="vis-label">Mã khuyến mãi <i className="far fa-user" /></label>
                    <input type="text" defaultValue={'1 guests'} />
                </div>
            </div>

            <span className="fw-separator" />

            <div className="clearfix"></div>
            {isLoggedIn ? <a href="#" onClick={(e) => { e.preventDefault(); bookingFormSubmit() }} className="next-form action-button color-bg">Confirm</a>
                : <LoginModal>
                    <a href="#" className="next-form action-button color-bg">Sign in to continue</a>
                </LoginModal>
            }
        </fieldset>
    );
}

function PersonalInfo(props) {
    const { loggedInUser, currentForm, handleBack, handleNext } = props;
    return (
        <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.PERSONAL_INFO ? 'block' : 'none' }}>
            <div className="list-single-main-item-title fl-wrap">
                <h3>Your personal Information</h3>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <label className="vis-label">Full Name <i className="far fa-user" /></label>
                    <input type="text" placeholder="Your Name" defaultValue={loggedInUser.name} disabled />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Email Address<i className="far fa-envelope" /></label>
                    <input type="text" placeholder="yourmail@domain.com" defaultValue={loggedInUser.email} disabled />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Phone<i className="far fa-phone" /></label>
                    <input type="text" placeholder={'Your Phone Number'} defaultValue={loggedInUser.phone_number} />
                </div>
            </div>

            <span className="fw-separator" />

            <div className="clearfix"></div>
            <a href="#" className="previous-form action-button back-form color2-bg" onClick={handleBack}>Back</a>
            <a href="#" className="next-form action-button color-bg" onClick={handleNext}>Confirm</a>
        </fieldset>
    )
}

function Payment(props) {
    const { total_usd, currentForm, handleBack, handleNext } = props;
    return (
        <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.PAYMENT ? 'block' : 'none' }}>
            <div className="list-single-main-item-title fl-wrap">
                <h3>Payment Method</h3>
            </div>

            <div className="payment">
                <PayPal
                    total_usd={total_usd}
                    handleNext={handleNext}
                />
            </div>

            <span className="fw-separator"></span>
            <a href="#" className="previous-form action-button back-form   color2-bg" onClick={handleBack}>Back</a>
        </fieldset>
    )
}

function Confirmation(props) {
    const { currentForm, handleNext } = props;
    return (
        <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.CONFIRM ? 'block' : 'none', left: '0%', opacity: 1, position: 'relative' }}>
            <div className="list-single-main-item-title fl-wrap">
                <h3>Confirmation</h3>
            </div>
            <div className="success-table-container">
                <div className="success-table-header fl-wrap">
                    <i className="fal fa-check-circle decsth" />
                    <h4>Thank you. Your reservation has been received.</h4>
                    <div className="clearfix" />
                    <p>Your payment has been processed successfully.</p>
                    <a href="invoice.html" target="_blank">View Invoice</a>
                </div>
            </div>
            <span className="fw-separator" />
            <a href="#" className="previous-form action-button back-form color2-bg" onClick={handleNext}>Back to home</a>
        </fieldset>

    )
}

function LeftSide(props) {

    const { listing, totalPrice, id } = props;

    return (
        <div id="booking-widget-anchor" className="boxed-widget booking-widget" style={{ padding: '18px' }}>
            <div className="with-forms">
                <div className="checkup__header">
                    <div className="cart-booking-header">
                        <Link to={`/listing/${id}`} className="widget-posts-img"><img src={listing.avatar_url} alt="" /></Link>
                        <div className="widget-posts-descr">
                            <h4><Link to={`/listing/${id}`}>{listing.name}</Link></h4>
                            <div className="geodir-category-location fl-wrap"><a href="#">{listing.street_address}</a></div>
                            <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="checkup__price fadeIn border-1">
                        <div className="is-flex middle-xs between-xs cart-list">
                            <div className="is-flex align-center">
                                <span className="pr--6">Giá thuê {totalPrice ? ` ${totalPrice.nights}` : 1} đêm</span>
                            </div>
                            <span>{totalPrice ? parseVNDCurrency(totalPrice.rental_price) : ''}</span>
                        </div>

                        <div className="is-flex middle-xs between-xs cart-list">
                            <div className="is-relative">
                                <span>Phí dịch vụ</span>
                            </div>
                            <span>102,000₫</span>
                        </div>

                        <div className="is-flex middle-xs between-xs cart-list">
                            <div>
                                <span className="extra-bold">Tổng tiền</span>
                            </div>
                            <span className="extra-bold">{totalPrice ? parseVNDCurrency(totalPrice.total_price) : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}