import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './BoxBooking.scss';
import QtyPerson from '../../../Home/components/QtyPerson';
import Skeleton from 'react-loading-skeleton';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import useQuery from '../../../../@use/useQuery';
import reservationApi from '../../../../api/reservationApi';
import { parseVNDCurrency } from '../../../../@helper/helper';
import OutsideAlerter from '../../../../components/OutsideAlerter/OutsideAlerter';
import { MdOutlineEast } from 'react-icons/md';
import PulseLoading from '../../../../components/Loading/PulseLoading';


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
    const [checkoutNull, setCheckoutNull] = useState(true);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [loadingCounting, setLoadingCounting] = useState(false);

    const { loadingListingDetail, listingDetail, reservationDate, blockList, host } = props;

    const disabledDate = current => {
        if (current && current < moment().endOf('day')) return true;
        if (reservationDate.findIndex(item => (item.getDate() === current._d.getDate() && item.getFullYear() === current._d.getFullYear() && item.getMonth() === current._d.getMonth())) != -1) return true;
        // if (blockList.findIndex(item => (item.getDate() === current._d.getDate() && item.getFullYear() === current._d.getFullYear() && item.getMonth() === current._d.getMonth())) != -1) return true;
        return false;
    }

    const disabledCheckoutDate = current => {
        if (current && current < moment().endOf('day')) return true;
        if (reservationDate.findIndex(item => (item.getDate() === current._d.getDate() && item.getFullYear() === current._d.getFullYear() && item.getMonth() === current._d.getMonth())) != -1) return true;
        if (minDate) {
            if (current && current < moment(minDate).endOf('day')) return true;
        }
        if (maxDate) {
            console.log(maxDate);
            if (current && current > moment(maxDate).endOf('day')) return true;
        }
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
        // const startDate = range[0].format("YYYY/MM/DD");
        // const endDate = range[1].format("YYYY/MM/DD");
        // console.log(startDate, endDate);
        // history.push(`/listing/${listingDetail.id}?checkin=${startDate.replaceAll('/', '-')}&checkout=${endDate.replaceAll('/', '-')}`);
        // setCheckin(startDate);
        // setCheckout(endDate);
    }

    const onChangeCheckin = date => {
        setLoadingCounting(true);
        setMaxDate(null);
        setMinDate(date);
        setCheckin(date.format("YYYY/MM/DD"));
        setCheckout(null);

        const sortedArray = reservationDate.sort((a, b) => new moment(a).format('YYYYMMDD') - new moment(b).format('YYYYMMDD'))
        for (let i = 0; i < sortedArray.length; i++) {
            if (date < sortedArray[i]) {
                setMaxDate(sortedArray[i]);
                break;
            }
        }
    }

    const onChangeCheckout = date => {
        console.log(date.format("YYYY/MM/DD"));
        setCheckout(date.format("YYYY/MM/DD"));
    }

    const handleBooking = (e) => {
        e.preventDefault();
        if (totalPrice) {
            history.push(`/host/checkout/${listingDetail.id}?checkin=${checkin.replaceAll('/', '-')}&checkout=${checkout.replaceAll('/', '-')}&adults=${adults}&childrens=${childrens}`);
        }
    }

    const checkAvailableDate = () => {

        if (totalPrice) {
            return loadingCounting ? <PulseLoading colorLoading='#566985' /> : <TotalPrice
                nights={totalPrice.nights}
                rentalPrice={totalPrice.rental_price}
                totalPrice={totalPrice.total_price}
                discount={totalPrice.discount}
                discount_weekly={totalPrice.discount_weekly}
                discount_mothly={totalPrice.discount_mothly}
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
                setLoadingCounting(false)
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    // in out null
    // loading neu co 1 trong 2 in hoac out
    // neu ca in out khac null - nhap in => out null
    // --------------------------nhap out => in null

    useEffect(() => {
        setCheckoutNull(true);
    }, [checkin]);

    useEffect(() => {
        if (checkout != null) {
            console.log(checkout)
            setCheckoutNull(false);
        }
        var checkin_date = moment(checkin, "YYYY-MM-DD hh:mm:ss");
        var checkout_date = moment(checkout, "YYYY-MM-DD hh:mm:ss");
        if (checkout_date.isAfter(checkin_date)) {
            countPrice();
        } else {

        }
    }, [checkout]);

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
                    <>
                        <div id="booking-widget-anchor" className="boxed-widget booking-widget">
                            {
                                loadingCounting ? <PulseLoading colorLoading='#566985' /> : <span style={{ marginBottom: "20px" }}>
                                    <span style={{
                                        fontSize: "30px",
                                        fontWeight: "600",
                                        fontFamily: "Roboto",
                                        color: '#566985',
                                    }}>
                                        {totalPrice ? parseVNDCurrency(totalPrice.total_price) : parseVNDCurrency(listingDetail.price_per_night_base * nights)
                                        }
                                    </span>
                                    <span style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        fontFamily: "Roboto",
                                        color: '#566985',

                                    }}> /{totalPrice ? ` ${totalPrice.nights} ` : null}night</span>

                                </span>
                            }


                            <div className="row with-forms margin-top-20">
                                <div className="col-lg-12">
                                    {/* <RangePicker
                                        disabledDate={disabledDate}
                                        format="DD/MM/YYYY"
                                        placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                                        suffixIcon
                                        inputReadOnly
                                        onChange={handleChangeDebut}
                                        defaultValue={[query.get('checkin') == null ? null : moment(query.get('checkin')), query.get('checkout') == null ? null : moment(query.get('checkout'))]}
                                        style={rangePicker}
                                    /> */}
                                    <Space direction="horizontal">
                                        <DatePicker
                                            onChange={onChangeCheckin}
                                            disabledDate={disabledDate}
                                            placeholder='dd/mm/yyyy'
                                            style={rangePicker}
                                            format="DD/MM/YYYY"
                                            inputReadOnly
                                            suffixIcon
                                        // defaultValue={moment(checkin, "YYYY/MM/DD")}
                                        />
                                        <MdOutlineEast
                                            style={{
                                                margin: '0 20px',
                                            }}
                                        />
                                        {checkoutNull ? <DatePicker
                                            onChange={onChangeCheckout}
                                            disabledDate={disabledCheckoutDate}
                                            placeholder='dd/mm/yyyy'
                                            format="DD/MM/YYYY"
                                            inputReadOnly
                                            suffixIcon
                                            style={rangePicker}
                                        /> : <DatePicker
                                            onChange={onChangeCheckout}
                                            disabledDate={disabledCheckoutDate}
                                            placeholder='dd/mm/yyyy'
                                            style={rangePicker}
                                            format="DD/MM/YYYY"
                                            inputReadOnly
                                            suffixIcon
                                            value={moment(checkout, "YYYY/MM/DD")}
                                        />}
                                    </Space>

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

                            <a onClick={handleBooking} href="#" className="button book-now fullwidth margin-top-5" style={{ borderRadius: "8px", padding: "14px 24px", background: "rgb(46, 63, 110)" }}>{(totalPrice && !loadingCounting) ? 'Booking now' : 'Check available'}</a>
                        </div>

                        <div className="fl-wrap block_box" style={{ marginTop: 20 }}>
                            <div className="box-widget-item-header">
                                <h3>Location / Contacts</h3>
                            </div>
                            <div>
                                {/* <div className="map-container">
                                    <div id="singleMap" data-latitude="40.7427837" data-longitude="-73.11445617675781" data-maptitle="Our Location" />
                                </div> */}
                                <div className="box-widget-content bwc-nopad">
                                    <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                                        <ul className="no-list-style">
                                            <li><span><i className="fal fa-browser" /> Host :</span> <a href="#">{host.name}</a></li>
                                            <li><span><i className="fal fa-map-marker" /> Adress :</span> <a href="#">{listingDetail.street_address}</a></li>
                                            <li><span><i className="fal fa-phone" /> Phone :</span> <a href="#">{host.phone_number}</a></li>
                                            <li><span><i className="fal fa-envelope" /> Mail :</span> <a href="#">{host.email}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div >

    );
}

export default BoxBooking;

TotalPrice.defaultProps = {
    nights: '',
    rentalPrice: '',
    servicePrice: '',
    totalPrice: 0,
    discount: 0,
    discount_weekly: false,
    discount_mothly: false,
}

function TotalPrice(props) {
    const { nights, rentalPrice, servicePrice, totalPrice, discount, discount_weekly, discount_mothly } = props;
    return (
        <div className="mb--12">
            <div className="checkup__price fadeIn border-1">
                <Item
                    title={`Total cost ${nights} night`}
                    content={parseVNDCurrency(rentalPrice)}
                />
                {(discount_weekly || discount_mothly) && <Item
                    title={'Discount'}
                    content={`-${parseVNDCurrency(discount)}`}
                />}
                <div className="is-flex middle-xs between-xs cart-list">
                    <div>
                        <span className="extra-bold">Total cost</span>
                    </div>
                    <span className="extra-bold">{parseVNDCurrency(totalPrice)}</span>
                </div>
            </div>
        </div>
    )
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