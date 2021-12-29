import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BoxBooking.scss';
import QtyPerson from '../../../Home/components/QtyPerson';
import Skeleton from 'react-loading-skeleton';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

BoxBooking.propTypes = {

};

const { RangePicker } = DatePicker;

const disableClick = {
    cursor: "not-allowed",
    border: "1px solid #ced4da",
    backgroundColor: "#f5f7fa",
    opacity: ".4"
};

const enableClick = {
    cursor: "pointer",
    backgroundColor: "#f2f2f2",
    border: "1px solid #ced4da"
}


function BoxBooking(props) {
    const history = useHistory();
    const [active, setActive] = useState(false);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [nights, setNights] = useState(1);
    const [calculating, setCalculating] = useState(false);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [isDisableIncAdult, setIsDisableIncAdult] = useState(false);
    const [isDisableIncChildren, setIsDisableIncChildren] = useState(false);
    const [isDisableDecAdult, setIsDisableDecAdult] = useState(true);
    const [isDisableDecChildren, setIsDisableDecChildren] = useState(true);

    const { loadingListingDetail, listingDetail } = props;

    const handleDec = (type, value) => {
        if (value > 0) {
            if (type == 'adults') {
                if (value == 1) return;
                setAdults(value - 1);
            } else {
                setChildrens(value - 1);
            }
        }
    }

    const handleInc = (type, value) => {
        const total = adults + childrens;
        if (total < listingDetail.standard_guest_count) {
            type == 'adults' ? setAdults(value + 1) : setChildrens(value + 1);
        }
    }

    const handleShowDropDown = (e) => {
        e.preventDefault();
        setActive(!active);
    }

    const handleChangeDebut = range => {
        const startDate = range[0].format("DD/MM/YYYY");
        const endDate = range[1].format("DD/MM/YYYY");
        setCheckin(startDate);
        setCheckout(endDate);
        // setNights(datediff(parseDate(checkin), parseDate(checkout)))

        // console.log(datediff(parseDate(checkin), parseDate(checkout)));
        // console.log('start date', checkin1.replaceAll('/', '-'));
        // console.log("end date", checkout);
    }

    const parseDate = (str) => {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1] - 1, mdy[0]);
    }

    const datediff = (first, second) => {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    const handleBooking = (e) => {
        e.preventDefault();
        history.push(`/checkout/${listingDetail.id}/${checkin.replaceAll('/', '-')}/${checkout.replaceAll('/', '-')}/${adults + childrens}`);
    }

    useEffect(() => {
        if (adults === 1 && childrens === 0) {
            setIsDisableDecAdult(true);
            setIsDisableDecChildren(true);

            setIsDisableIncAdult(false);
            setIsDisableIncChildren(false);
        } else if (adults === listingDetail.standard_guest_count) {
            setIsDisableDecAdult(false);
            setIsDisableDecChildren(true);

            setIsDisableIncAdult(true);
            setIsDisableIncChildren(true);
        } else if (childrens === listingDetail.standard_guest_count - 1) {
            setIsDisableDecAdult(true);
            setIsDisableDecChildren(false);

            setIsDisableIncAdult(true);
            setIsDisableIncChildren(true);
        } else if (adults + childrens === listingDetail.standard_guest_count) {
            setIsDisableDecAdult(false);
            setIsDisableDecChildren(false);

            setIsDisableIncAdult(true);
            setIsDisableIncChildren(true);
        } else {
            if (adults === 1) {
                setIsDisableDecAdult(true);
                setIsDisableIncAdult(false);
            } else {
                setIsDisableDecAdult(false);
                setIsDisableIncAdult(false);
            }

            if (childrens === 0) {
                setIsDisableDecChildren(true);
                setIsDisableIncChildren(false);
            } else {
                setIsDisableDecChildren(false);
                setIsDisableIncChildren(false);
            }
        }
    }, [adults, childrens]);

    return (
        < div className="col-lg-4 col-md-4 margin-top-75 sticky" >
            {
                loadingListingDetail ? <Skeleton height={300} borderRadius={12} /> :

                    <div id="booking-widget-anchor" className="boxed-widget booking-widget">
                        <span style={{ marginBottom: "20px" }}>
                            <span style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                fontFamily: "Luxstay"
                            }}>
                                {parseInt(listingDetail.price_per_night_base * nights).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                            <span style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                fontFamily: "Luxstay"

                            }}> /{nights === 1 ? null : ` ${nights} `}đêm</span>
                        </span>

                        <div className="row with-forms  margin-top-20">
                            <div className="col-lg-12">
                                {/* <input type="text" id="date-picker" placeholder="Date" readOnly="readonly" /> */}
                                <RangePicker
                                    format="DD/MM/YYYY"
                                    placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                                    suffixIcon
                                    onChange={handleChangeDebut}
                                    style={{
                                        border: "none",
                                        // height: "auto",
                                        width: "100%",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginBottom: "10px",
                                        paddingTop: "5px",
                                        fontWeight: "bold",
                                        fontSize: "0px",
                                        boxShadow: "0 1px 6px 0px rgba(0, 0, 0, 0.1)"
                                    }}
                                />
                            </div>
                            <div className="col-lg-12">
                                <div className={active ? "panel-dropdown active" : "panel-dropdown"}>
                                    <a href="#" onClick={handleShowDropDown}>Guests <span className="qtyTotal" name="qtyTotal">{adults + childrens}</span></a>
                                    <div className="panel-dropdown-content" style={{ width: "100%" }}>
                                        <div className="qtyButtons">
                                            <div className="qtyTitle">Adults</div>
                                            <div onClick={() => handleDec('adults', adults)} className="qtyDec" style={isDisableDecAdult ? disableClick : enableClick} />
                                            <input type="text" name="qtyInput" defaultValue={adults} value={adults} />
                                            <div onClick={() => handleInc('adults', adults)} className="qtyInc" style={isDisableIncAdult ? disableClick : enableClick} />
                                        </div>
                                        <div className="qtyButtons">
                                            <div className="qtyTitle">Childrens</div>
                                            <div onClick={() => handleDec('childrens', childrens)} className="qtyDec" style={isDisableDecChildren ? disableClick : enableClick} />
                                            <input type="text" name="qtyInput" defaultValue={childrens} value={childrens} />
                                            <div onClick={() => handleInc('childrens', childrens)} className="qtyInc" style={isDisableIncChildren ? disableClick : enableClick} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        </div>
                        <a onClick={handleBooking} href="#" className="button book-now fullwidth margin-top-5" style={{ borderRadius: "8px", padding: "14px 24px" }}>Kiểm tra tình trạng còn phòng</a>
                    </div>
            }
        </div >

    );
}

export default BoxBooking;