import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';
import reservationApi from '../../../../api/reservationApi';
import { PayPalButton } from "react-paypal-button-v2";
import TestPaypal from '../../../../components/Test/TestPaypal';
import PayPal from '../PayPal';
import { useDispatch, useSelector } from 'react-redux';
import notificationApi from '../../../../api/notificationApi';
import Header from '../../../../components/Header';
import useQuery from '../../../../@use/useQuery';
import { Link } from 'react-router-dom';
import { parseVNDCurrency } from '../../../../@helper/helper';
import LoginModal from '../../../../components/LoginModal/LoginModal';
import Loading from '../../../../components/Loading/Loading';
import adminPaymentApi from '../../../../api/adminPaymentApi';
import { PersonPinCircleSharp } from '@material-ui/icons';
import Footer from '../../../../components/Footer';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { phoneRegExp } from '../../../UserProfile/pages/EditProfile/EditProfile';
import userProfileApi from '../../../../api/userProfileApi';
import { updateProfile } from '../../../../app/reducer/userSlice';
import { useSnackbar } from 'notistack';

Booking.propTypes = {

};

export const h2_header = {
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '18px',
    float: 'left',
    color: '#566985',
    margin: 0,
    padding: 0,
}

export const CURRENT_FORM = {
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
    const dispatch = useDispatch();

    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [totalPrice, setTotalPrice] = useState();
    const [activeBookingInfo] = useState(true);
    const [activePersonalInfo, setActivePersonalInfo] = useState(false);
    const [activePayment, setActivePayment] = useState(false);
    const [activeConfirm, setActiveConfirm] = useState(false);
    const [currentForm, setCurrentForm] = useState(CURRENT_FORM.BOOKING_INFO);
    const [loading, setLoading] = useState(true);
    const [reservationError, setReservationError] = useState(false);

    const handlePay = async () => {
        const params = {
            checkin_date: query.get('checkin'),
            checkout_date: query.get('checkout'),
            total_price: totalPrice.total_price,
            adult_count: query.get('adults'),
            child_count: query.get('childrens'),
            reservation_status_id: 3, // 3: Paid
            guest_id: loggedInUser.id,
            listing_id: id
        }

        await reservationApi.sendReservation(params).then(() => {
            setActiveConfirm(true);
            setCurrentForm(CURRENT_FORM.CONFIRM);
        }).catch(err => console.log(err.message));
        await adminPaymentApi.add(params);
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

    const handleEditProfile = async (values) => {
        const params = {
            phone_number: values.phone_number,
        }
        setLoading(true)

        await userProfileApi.editProfile(params).then(res => {
            dispatch(updateProfile(res.data.data));
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }

    const personalFormSubmit = (values) => {
        if (values.phone_number) {
            handleEditProfile(values)
            if (listing && listing.reservation_form == 'quick') {
                setActivePayment(true);
                setCurrentForm(CURRENT_FORM.PAYMENT);
            } else {
                handleSendRequest();
            }
        }
    }

    const defaultValueGuests = (adults, childrens) => {
        let s = adults + ' adults ';
        s += childrens > 0 ? '- ' + childrens + ' childrens' : '';
        return s;
    }

    useEffect(() => {

        const checkReservation = async () => {
            try {
                const params = {
                    checkin_date: query.get('checkin'),
                    checkout_date: query.get('checkout'),
                    listing_id: id
                }
                await reservationApi.checkReservation(params).then(res => {

                }).catch(err => {
                    // history.push('/error');
                    setReservationError(true);
                })
            } catch (err) {
                console.log(err.message);
            }
        }

        const getListing = async () => {
            try {
                await listingApi.getBaseInfoListing(id).then(res => {
                    console.log(res.data);
                    setListing(res.data.data)
                });
            } catch (err) {
                console.log(err.message)
            }

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
                    setLoading(false);
                })
            } catch (err) {
                console.log(err.message);
            }
        }
        window.scrollTo(0, 0);
        checkReservation();
        getListing();
        countPrice();

        return () => {

        }
    }, []);


    return (
        <div id="wrapper" className='gray-bg'>
            {loading && <Loading />}
            <Header />
            {!reservationError ? <div className="container" style={{ marginTop: '150px' }}>
                <div className="breadcrumbs inline-breadcrumbs fl-wrap block-breadcrumbs">
                    <h2 style={h2_header}>Booking form for : <span style={{ color: '#4DB7FE' }}>{listing.name}</span></h2>
                </div>

                <div className="fl-wrap">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 padding-right-30">
                            {
                                listing && listing.reservation_form == 'quick' ?
                                    <ul id="booking_progressbar" className="no-list-style">
                                        <li className={activeBookingInfo ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Booking Info">01.</span></li>
                                        <li className={activePersonalInfo ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Personal Info">02.</span></li>
                                        <li className={activePayment ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Payment Method">03.</span></li>
                                        <li className={activeConfirm ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Confirm">04.</span></li>
                                    </ul>
                                    :
                                    <ul id="booking_progressbar" className="no-list-style">
                                        <li className={activeBookingInfo ? 'active' : ''}><span className="tolt" data-microtip-position="top" data-tooltip="Booking Info">01.</span></li>
                                        <li className={activePersonalInfo ? 'active' : ''} style={{ width: '50%' }}>
                                            <span className="tolt" data-microtip-position="top" data-tooltip="Personal Info">02.</span>
                                        </li>
                                        <li className={activeConfirm ? 'active' : ''} style={{ width: '50%' }}>
                                            <span className="tolt" data-microtip-position="top" data-tooltip="Confirm">03.</span>
                                        </li>
                                    </ul>
                            }

                            <div className="bookiing-form-wrap block_box fl-wrap">
                                <div className="list-single-main-item fl-wrap hidden-section tr-sec">
                                    <div className="profile-edit-container">
                                        <div className="_custom_form">
                                            {totalPrice && <BookingInfo
                                                adults={query.get('adults')}
                                                childrens={query.get('childrens')}
                                                checkin_date={query.get('checkin')}
                                                checkout_date={query.get('checkout')}
                                                isLoggedIn={isLoggedIn}
                                                bookingFormSubmit={() => { setActivePersonalInfo(true); setCurrentForm(CURRENT_FORM.PERSONAL_INFO) }}
                                                currentForm={currentForm}
                                                nights={totalPrice.nights}
                                                defaultValueGuests={defaultValueGuests}
                                            />}

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
                                                reservation_form={listing.reservation_form}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div className="col-lg-4 col-md-4 margin-top-0 margin-bottom-60">
                            {(totalPrice && listing) && <LeftSide
                                total_price={totalPrice.total_price}
                                rental_price={totalPrice.rental_price}
                                nights={totalPrice.nights}
                                id={id}
                                avatar_url={listing.avatar_url}
                                street_address={listing.street_address}
                                name={listing.name}
                                checkin_date={query.get('checkin')}
                                checkout_date={query.get('checkout')}
                                defaultValueGuests={defaultValueGuests(query.get('adults'), query.get('childrens'))}
                                discount={totalPrice.discount}
                                discount_weekly={totalPrice.discount_weekly}
                                discount_mothly={totalPrice.discount_mothly}
                            />}
                        </div>
                    </div>
                </div>
            </div> : <div id="wrapper-not-found-page">
                {/* content*/}
                <div className="content">
                    {/*  section  */}
                    <section className="parallax-section small-par" data-scrollax-parent="true" style={{ marginTop: 0 }}>
                        <div className="bg" data-bg="https://www.youtube.com/watch?v=zq0TuNqV0Ew&t=469s" data-scrollax="properties: { translateY: '30%' }" style={{}} />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                                <div className="bubbles">
                                    <h2>Sorry</h2>
                                </div>
                                <p>We're sorry, data not found</p>

                            </div>
                        </div>
                    </section>
                </div>
            </div>}

            <Footer />
        </div>
    );
}

export default Booking;

BookingInfo.propTypes = {
    isLoggedIn: PropTypes.bool,
};

BookingInfo.defaultProps = {
    isLoggedIn: false
}

export function BookingInfo(props) {
    const { adults, childrens, checkin_date, checkout_date, nights, isLoggedIn, bookingFormSubmit, currentForm, defaultValueGuests } = props;

    return (
        <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.BOOKING_INFO ? 'block' : 'none' }}>
            <div className="list-single-main-item-title fl-wrap">
                <h3>Booking Information</h3>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <label className="vis-label">Guests <i className="far fa-user" /></label>
                    <input type="text" defaultValue={defaultValueGuests(adults, childrens)} disabled style={{ height: 51 }} />
                </div>
                <div className="col-sm-6">
                    <label className="vis-label">Nights <i className="far fa-moon" /></label>
                    <input type="text" defaultValue={`${nights || 1} nights`} disabled style={{ height: 51 }} />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Checkin<i className="far fa-calendar" /></label>
                    <input type="text" defaultValue={checkin_date} disabled style={{ height: 51 }} />
                </div>

                <div className="col-sm-6">
                    <label className="vis-label">Checkout<i className="far fa-calendar" /></label>
                    <input type="text" defaultValue={checkout_date} disabled style={{ height: 51 }} />
                </div>

                {/* <div className="col-sm-12">
                    <label className="vis-label">Mã khuyến mãi <i className="far fa-user" /></label>
                    <input type="text" defaultValue={'1 guests'} style={{ height: 51 }} />
                </div> */}
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

export function PersonalInfo(props) {
    const { enqueueSnackbar } = useSnackbar();

    const { loggedInUser, currentForm, handleBack, handleNext } = props;
    return (
        <Formik
            initialValues={{ phone_number: loggedInUser.phone_number || '' }}
            validationSchema={
                Yup.object({
                    phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
                        .required('Please input your phone number.'),
                })}
            onSubmit={(values) => {
                // handleRegister(values, resetForm);
                handleNext(values)
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <fieldset className="fl-wrap" style={{ display: currentForm == CURRENT_FORM.PERSONAL_INFO ? 'block' : 'none' }}>
                        <div className="list-single-main-item-title fl-wrap">
                            <h3>Your personal Information</h3>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <label className="vis-label">Full Name <i className="far fa-user" /></label>
                                <input type="text" placeholder="Your Name" defaultValue={loggedInUser.name} disabled style={{ height: 51 }} />
                            </div>

                            <div className="col-sm-6">
                                <label className="vis-label">Email Address<i className="far fa-envelope" /></label>
                                <input type="text" placeholder="yourmail@domain.com" defaultValue={loggedInUser.email} disabled style={{ height: 51 }} />
                            </div>

                            <div className="col-sm-6">
                                <label className="vis-label">Phone<i className="far fa-phone" /></label>
                                <input type="text" placeholder={'Your Phone Number'}
                                    {...formik.getFieldProps('phone_number')}
                                    style={{ height: 51 }} />
                                {formik.errors.phone_number ? (
                                    <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.phone_number}</label>
                                ) : null}

                                {/* {formik.errors.phone_number && enqueueSnackbar(formik.errors.phone_number, { variant: "error" })} */}
                            </div>
                        </div>

                        <span className="fw-separator" />

                        <div className="clearfix"></div>
                        <a href="#" className="previous-form action-button back-form color2-bg" onClick={handleBack}>Back</a>
                        <button type='submit' className="next-form action-button color-bg" onClick={() => handleNext(formik.values)}>Confirm</button>
                    </fieldset>
                </form>
            )}
        </Formik>
    )
}

export function Payment(props) {
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

export function Confirmation(props) {
    const { currentForm, handleNext, reservation_form } = props;
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
                    <p>Your {reservation_form == 'quick' ? 'payment' : 'reservation'} has been processed successfully.</p>
                    <Link to="/me/bookings" target="_blank">View Your Bookings</Link>
                </div>
            </div>
            <span className="fw-separator" />
            <a href="#" className="previous-form action-button back-form color2-bg" onClick={handleNext}>Back to home</a>
        </fieldset>

    )
}

export function LeftSide(props) {

    const { total_price, rental_price, nights, id, avatar_url, street_address, name, defaultValueGuests,
        checkin_date, checkout_date, discount, discount_weekly, discount_mothly } = props;

    return (
        <>
            <div className="cart-details-item-header">
                <h3> Your Booking</h3>
            </div>
            <div id="booking-widget-anchor" className="boxed-widget booking-widget" style={{ padding: '18px 18px 0' }}>
                <div className="with-forms">
                    <div className="checkup__header">
                        <div className="cart-booking-header">
                            <Link to={`/listing/${id}`} className="widget-posts-img"><img src={avatar_url} alt="" /></Link>
                            <div className="widget-posts-descr">
                                <h4><Link to={`/listing/${id}`}>{name}</Link></h4>
                                <div className="geodir-category-location fl-wrap"><a href="#">{street_address}</a></div>
                                <div className="widget-posts-descr-link"><a href="listing.html">Homestay </a></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="checkup__price fadeIn border-1">
                            <Item
                                title={'Checkin date'}
                                content={checkin_date}
                            />

                            <Item
                                title={'Checkout date'}
                                content={checkout_date}
                            />

                            <Item
                                title={'Guest'}
                                content={defaultValueGuests}
                            />

                            <Item
                                title={`Total cost ${nights ? ` ${nights}` : 1} night`}
                                content={rental_price ? parseVNDCurrency(rental_price) : ''}
                            />

                            {(discount_weekly || discount_mothly) && <Item
                                title={'Discount'}
                                content={`-${parseVNDCurrency(discount)}`}
                            />}

                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-total color2-bg fl-wrap">
                <span className="cart-total_item_title">Total Cost</span>
                <strong>{total_price ? parseVNDCurrency(total_price) : ''}</strong>
            </div>
        </>
    );
}

function Item(props) {
    const { title, content } = props;
    return (
        <div className="is-flex middle-xs between-xs cart-list">
            <div className="is-flex align-center">
                <span className="pr--6">{title}</span>
            </div>
            <span>{content}</span>
        </div>
    )
}