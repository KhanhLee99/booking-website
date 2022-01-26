import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useParams } from 'react-router-dom';
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


Booking.propTypes = {

};

function Booking(props) {
    const query = useQuery();
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [totalPrice, setTotalPrice] = useState();
    // const paypal = useRef();



    const handlePay = async (e) => {
        e.preventDefault();
        const params = {
            // checkin_date: query.get('checkin').split("-").reverse().join("-"),
            // checkout_date: query.get('checkout').split("-").reverse().join("-"),
            checkin_date: query.get('checkin'),
            checkout_date: query.get('checkout'),
            total_price: totalPrice.total_price,
            adult_count: 1,
            child_count: 0,
            reservation_status_id: 1,
            guest_id: loggedInUser.id,
            listing_id: id
        }

        await reservationApi.sendReservation(params).then(res => {
            console.log(res);
            alert('Booking Success');
            // sendNotification();
        });
    }

    const sendNotification = async () => {
        try {
            const params = {
                user_id: listing.user_id,
                title: 'hello',
                body: 'xin chao cac ban'
            }
            await notificationApi.sendNotification(params).then(res => {
                console.log(res);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const getListing = async () => {
            await listingApi.getBaseInfoListing(id).then(res => {
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
        <div id="wrapper">
            <Header />

            <div className="container" style={{ marginTop: '150px' }}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 padding-right-30">
                        <h2 className="margin-top-0 margin-bottom-30">Xác nhận và thanh toán</h2>
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Your trip</h3>
                            </div>
                            <div className="col-md-6">
                                <h3 style={{ fontWeight: "600" }}>Date</h3>
                            </div>
                            <div className="col-md-6 k-edit">
                                <a style={{ fontWeight: "600" }}>Edit</a>
                            </div>
                            <div className="col-md-12">
                                <p>{`${(new Date(query.get('checkin'))).toDateString()} to ${(new Date(query.get('checkout'))).toDateString()}`}</p>
                            </div>

                            <div className="col-md-6">
                                <h3 style={{ fontWeight: "600" }}>Guests</h3>
                            </div>
                            <div className="col-md-6 k-edit">
                                <a style={{ fontWeight: "600" }}>Edit</a>
                            </div>
                            <div className="col-md-12">
                                <p>{query.get('guests')} guest</p>
                            </div>
                        </div>

                        <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />

                        <h3 className="margin-top-55 margin-bottom-30 k-payment-method">Payment Method</h3>
                        <div className="payment">
                            <PayPal />
                            {/* <div className="payment-tab payment-tab-active">
                            <div className="payment-tab-trigger">
                                <input defaultChecked id="paypal" name="cardType" type="radio" defaultValue="paypal" />
                                <label htmlFor="paypal">PayPal</label>
                                <img className="payment-logo paypal" src="https://i.imgur.com/ApBxkXU.png" alt="" />
                            </div>
                            <div className="payment-tab-content">
                                <PayPal />
                            </div>
                        </div>
                        <div className="payment-tab">
                            <div className="payment-tab-trigger">
                                <input type="radio" name="cardType" id="creditCart" defaultValue="creditCard" />
                                <label htmlFor="creditCart">Credit / Debit Card</label>
                                <img className="payment-logo" src="https://i.imgur.com/IHEKLgm.png" alt="" />
                            </div>
                            <div className="payment-tab-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-label">
                                            <label htmlFor="nameOnCard">Name on Card</label>
                                            <input id="nameOnCard" name="nameOnCard" required type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-label">
                                            <label htmlFor="cardNumber">Card Number</label>
                                            <input id="cardNumber" name="cardNumber" placeholder="1234  5678  9876  5432" required type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-label">
                                            <label htmlFor="expirynDate">Expiry Month</label>
                                            <input id="expiryDate" placeholder="MM" required type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-label">
                                            <label htmlFor="expiryDate">Expiry Year</label>
                                            <input id="expirynDate" placeholder="YY" required type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-label">
                                            <label htmlFor="cvv">CVV</label>
                                            <input id="cvv" required type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        </div>
                        {isLoggedIn ? <a href="#" onClick={handlePay} className="button booking-confirmation-btn margin-top-40 margin-bottom-65" style={{ background: "rgb(66, 89, 152)" }}>Confirm and Pay</a>
                            : <LoginModal>
                                <a href="#" className="button booking-confirmation-btn margin-top-40 margin-bottom-65" style={{ background: "rgb(66, 89, 152)" }}>Confirm and Pay</a>
                            </LoginModal>
                        }

                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-5 col-md-5 margin-top-0 margin-bottom-60">
                        <div id="booking-widget-anchor" className="boxed-widget booking-widget">
                            <div className="row with-forms">
                                <div className="checkup__header">
                                    <Link to={`/listing/${id}`} className="is-flex">
                                        <div className="grow">
                                            <h4 className="checkup__title">{listing.name}</h4>
                                        </div>
                                        <div style={{ width: '128px', marginLeft: '20px' }}>
                                            <div className="bg-img bg-img--85 radius-xs" style={{ backgroundImage: "url(" + listing.avatar_url + ")" }} />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <hr className="my--18" />
                            <div className="mb--12">
                                <div className="checkup__price fadeIn border-1">
                                    <div className="is-flex middle-xs between-xs">
                                        <div className="is-flex align-center">
                                            <span className="pr--6">Giá thuê {totalPrice ? ` ${totalPrice.nights}` : 1} đêm</span>
                                        </div>
                                        <span>{totalPrice ? parseVNDCurrency(totalPrice.rental_price) : ''}</span>
                                    </div>
                                    <div className="is-flex middle-xs between-xs">
                                        <div className="is-relative">
                                            <span>Phí dịch vụ</span>
                                        </div>
                                        <span>102,000₫</span>
                                    </div>
                                    <hr className="my--18" />
                                    <div className="is-flex middle-xs between-xs">
                                        <div>
                                            <span className="extra-bold">Tổng tiền</span>
                                        </div>
                                        <span className="extra-bold">{totalPrice ? parseVNDCurrency(totalPrice.total_price) : ''}</span>
                                    </div>
                                </div>
                                <div className="my--12" />
                                <hr className="my--18" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;