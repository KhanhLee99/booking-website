import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Booking.propTypes = {

};

function Booking(props) {
    return (
        <div className="container">
            <div className="row">
                {/* Content
			================================================== */}
                <div className="col-lg-6 col-md-6 padding-right-30">
                    <h2 className="margin-top-0 margin-bottom-30">Xác nhận và thanh toán</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Your trip</h3>
                        </div>
                        <div className="col-md-6">
                            <h3>Date</h3>
                        </div>
                        <div className="col-md-6 k-edit">
                            <a>Edit</a>
                        </div>
                        <div className="col-md-12">
                            <p>Ngày 15 - Ngày 16 tháng 12</p>
                        </div>

                        <div className="col-md-6">
                            <h3>Guests</h3>
                        </div>
                        <div className="col-md-6 k-edit">
                            <a>Edit</a>
                        </div>
                        <div className="col-md-12">
                            <p>1 guest</p>
                        </div>
                    </div>

                    <div className="_npr0qi" style={{ borderTopColor: 'rgb(221, 221, 221)' }} />
                    
                    <h3 className="margin-top-55 margin-bottom-30 k-payment-method">Payment Method</h3>
                    {/* Payment Methods Accordion */}
                    <div className="payment">
                        <div className="payment-tab payment-tab-active">
                            <div className="payment-tab-trigger">
                                <input defaultChecked id="paypal" name="cardType" type="radio" defaultValue="paypal" />
                                <label htmlFor="paypal">PayPal</label>
                                <img className="payment-logo paypal" src="https://i.imgur.com/ApBxkXU.png" alt="" />
                            </div>
                            <div className="payment-tab-content">
                                <p>Đăng nhập để sử dụng PayPal.</p>
                                <button>paypal</button>
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
                        </div>
                    </div>
                    {/* Payment Methods Accordion / End */}
                    <a href="pages-booking-confirmation.html" className="button booking-confirmation-btn margin-top-40 margin-bottom-65">Confirm and Pay</a>
                </div>
                {/* Sidebar
		================================================== */}
                <div className="col-lg-4 col-md-4 margin-top-0 margin-bottom-60">
                </div>
            </div>
        </div>

    );
}

export default Booking;