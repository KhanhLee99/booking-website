import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './BoxBooking.scss';
import QtyPerson from '../../../Home/components/QtyPerson';
import Skeleton from 'react-loading-skeleton';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import useQuery from '../../../../@use/useQuery';
import reservationApi from '../../../../api/reservationApi';
import { parseVNDCurrency } from '../../../../@helper/helper';
import OutsideAlerter from '../../../../components/OutsideAlerter/OutsideAlerter';

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

const rangePicker = {
    border: "none",
    width: "100%",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
    paddingTop: "5px",
    paddingLeft: '17px',
    fontWeight: "bold",
    fontSize: "0px",
    boxShadow: "0 1px 6px 0px rgba(0, 0, 0, 0.1)",
    height: '50px',
}


function BoxBooking(props) {
    const refQty = useRef(null);
    const query = useQuery();
    const history = useHistory();
    const [active, setActive] = useState(false);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [nights, setNights] = useState(1);
    const [calculating, setCalculating] = useState(false);
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [isDisableIncAdult, setIsDisableIncAdult] = useState(false);
    const [isDisableIncChildren, setIsDisableIncChildren] = useState(false);
    const [isDisableDecAdult, setIsDisableDecAdult] = useState(true);
    const [isDisableDecChildren, setIsDisableDecChildren] = useState(true);
    const [totalPrice, setTotalPrice] = useState();

    const { loadingListingDetail, listingDetail, reservationDate, blockList } = props;

    const disabledDate = current => {
        if (current && current < moment().endOf('day')) return true;
        if (reservationDate.findIndex(item => (item.getDate() === current._d.getDate() && item.getFullYear() === current._d.getFullYear() && item.getMonth() === current._d.getMonth())) != -1) return true;
        if (blockList.findIndex(item => (item.getDate() === current._d.getDate() && item.getFullYear() === current._d.getFullYear() && item.getMonth() === current._d.getMonth())) != -1) return true;
        return false;
    }

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
        const startDate = range[0].format("YYYY/MM/DD");
        const endDate = range[1].format("YYYY/MM/DD");
        history.push(`/listing/${listingDetail.id}?checkin=${startDate.replaceAll('/', '-')}&checkout=${endDate.replaceAll('/', '-')}`);
        setCheckin(startDate);
        setCheckout(endDate);
    }

    const handleBooking = (e) => {
        e.preventDefault();
        if (totalPrice) {
            history.push(`/host/checkout/${listingDetail.id}?checkin=${checkin.replaceAll('/', '-')}&checkout=${checkout.replaceAll('/', '-')}&guests=${adults + childrens}`);
        }
    }

    const checkAvailableDate = () => {

        if (totalPrice) {
            return <TotalPrice
                nights={totalPrice.nights}
                rentalPrice={totalPrice.rental_price}
                totalPrice={totalPrice.total_price}
            />
        }

        return null;
    }

    const countPrice = async () => {
        try {
            const params = {
                checkin: checkin,
                checkout: checkout,
                listing_id: listingDetail.id
            }
            await reservationApi.countTotalPrice(params).then(res => {
                setTotalPrice(res.data.data);
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        countPrice();
    }, [checkin, checkout]);

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
        <div className="col-lg-4 col-md-4 margin-top-75 sticky" >
            {
                loadingListingDetail ? <Skeleton height={300} borderRadius={12} /> :
                    <div id="booking-widget-anchor" className="boxed-widget booking-widget">
                        <span style={{ marginBottom: "20px" }}>
                            <span style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                fontFamily: "Roboto"
                            }}>
                                {totalPrice ? parseVNDCurrency(totalPrice.total_price) : parseVNDCurrency(listingDetail.price_per_night_base * nights)
                                }
                            </span>
                            <span style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                fontFamily: "Roboto"

                            }}> /{totalPrice ? ` ${totalPrice.nights} ` : null}đêm</span>
                        </span>

                        <div className="row with-forms margin-top-20">
                            <div className="col-lg-12">
                                <RangePicker
                                    disabledDate={disabledDate}
                                    format="DD/MM/YYYY"
                                    placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                                    suffixIcon
                                    inputReadOnly
                                    onChange={handleChangeDebut}
                                    defaultValue={[query.get('checkin') == null ? null : moment(query.get('checkin')), query.get('checkout') == null ? null : moment(query.get('checkout'))]}
                                    style={rangePicker}
                                />
                            </div>
                            <div className="col-lg-12">
                                <OutsideAlerter
                                    closePopup={() => setActive(false)}
                                    ref={refQty}
                                >
                                    <div className={active ? "panel-dropdown active" : "panel-dropdown"}>
                                        <a href="#" onClick={handleShowDropDown}>Guests <span className="qtyTotal" name="qtyTotal" style={{ background: "rgb(66, 89, 152)" }}>{adults + childrens}</span></a>

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
                                </OutsideAlerter>
                            </div>
                        </div>
                        {
                            checkAvailableDate()
                        }

                        <a onClick={handleBooking} href="#" className="button book-now fullwidth margin-top-5" style={{ borderRadius: "8px", padding: "14px 24px", background: "rgb(46, 63, 110)" }}>{totalPrice ? 'Đặt ngay' : 'Kiểm tra tình trạng còn phòng'}</a>
                    </div>
            }
        </div >

    );
}

export default BoxBooking;

TotalPrice.defaultProps = {
    nights: '',
    rentalPrice: '',
    servicePrice: '',
    totalPrice: '',
}

function TotalPrice(props) {
    const { nights, rentalPrice, servicePrice, totalPrice } = props;
    return (
        <div className="mb--12">
            <div className="checkup__price fadeIn border-1">
                <div className="is-flex middle-xs between-xs">
                    <div className="is-flex align-center">
                        <span className="pr--6">Giá thuê {nights} đêm</span>
                    </div>
                    <span>{parseVNDCurrency(rentalPrice)}</span>
                </div>
                <div className="is-flex middle-xs between-xs">
                    <div className="is-relative">
                        <span>Phí dịch vụ</span>
                    </div>
                    <span>{servicePrice}</span>
                </div>
                <hr className="my--18" />
                <div className="is-flex middle-xs between-xs">
                    <div>
                        <span className="extra-bold">Tổng tiền</span>
                    </div>
                    <span className="extra-bold">{parseVNDCurrency(totalPrice)}</span>
                </div>
            </div>
            <div className="my--12" />
        </div>
    )
}