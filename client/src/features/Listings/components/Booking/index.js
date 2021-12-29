import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useParams } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';
import reservationApi from '../../../../api/reservationApi';
import { PayPalButton } from "react-paypal-button-v2";
import TestPaypal from '../../../../components/Test/TestPaypal';
import PayPal from '../PayPal';


Booking.propTypes = {

};

function Booking(props) {
    const { id, checkin, checkout, guests } = useParams();
    // const paypal = useRef();

    useEffect(() => {
        const getListing = async () => {
            await listingApi.getBaseInfoListing(id).then(res => {
                console.log(res);
            });

        }
        getListing();
        return () => {

        }

    }, []);

    const handlePay = async (e) => {
        e.preventDefault();
        const params = {
            checkin_date: checkin,
            checkout_date: checkout,
            total_price: 1,
            adult_count: 1,
            child_count: 1,
            reservation_status_id: 1,
            guest_id: 1,
            listing_id: id
        }

        await reservationApi.sendReservation(params).then(res => {
            console.log(res);
        });
    }

    return (
        <div className="container">
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
                            <p>{`${(new Date(checkin)).toDateString()} to ${(new Date(checkout)).toDateString()}`}</p>
                        </div>

                        <div className="col-md-6">
                            <h3 style={{ fontWeight: "600" }}>Guests</h3>
                        </div>
                        <div className="col-md-6 k-edit">
                            <a style={{ fontWeight: "600" }}>Edit</a>
                        </div>
                        <div className="col-md-12">
                            <p>{guests} guest</p>
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
                    <a href="#" onClick={handlePay} className="button booking-confirmation-btn margin-top-40 margin-bottom-65">Confirm and Pay</a>
                </div>
                <div className="col-1"></div>
                <div className="col-lg-5 col-md-5 margin-top-0 margin-bottom-60">
                    <div id="booking-widget-anchor" className="boxed-widget booking-widget">
                        <div className="row with-forms">
                            <div className="checkup__header">
                                <a href="/vi/rooms/68886" className="is-flex">
                                    <div className="grow">
                                        <h4 className="checkup__title">The Galaxy Home - 1 Phòng Ngủ, 60m2, View Thành Phố, Ban Công - Dịch Vọng</h4>
                                    </div>
                                    <div style={{ width: '128px' }}>
                                        <div className="bg-img bg-img--85 radius-xs" style={{ backgroundImage: 'url("https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png")' }} />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <hr className="my--18" />
                        <div className="mb--12">
                            <div className="checkup__price fadeIn border-1">
                                <div className="is-flex middle-xs between-xs">
                                    <div className="is-flex align-center">
                                        <span className="pr--6">Giá thuê 1 đêm</span>
                                    </div>
                                    <span>850,000₫</span>
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
                                    <span className="extra-bold">952,000₫</span>
                                </div>
                            </div>
                            <div className="my--12" />
                            <hr className="my--18" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;