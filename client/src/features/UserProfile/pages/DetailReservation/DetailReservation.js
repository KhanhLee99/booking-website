import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './DetailReservation.scss';
import Header from '../../../../components/Header';
import useWindowDimensions from '../../../../@use/useWindowDimensions';
import { Link, useHistory, useParams } from 'react-router-dom';
import { defaultValueGuests, parseVNDCurrency } from '../../../../@helper/helper';
import { Chrono } from "react-chrono";
import data from "../../../../app/data/timeline_data";
import reservationApi from '../../../../api/reservationApi';
import Loading from '../../../../components/Loading/Loading';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder'

DetailReservation.propTypes = {

};

const scroll_nav = {
    float: 'left',
}

function DetailReservation(props) {

    const { id } = useParams();
    const history = useHistory();

    const [reservation, setReservation] = useState({ id: 0 });
    const [loading, setLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [detailPrice, setDetailPrice] = useState();

    const { height } = useWindowDimensions();
    const heightSection = height - 100;

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                await reservationApi.getDetailReservation(id).then(res => {
                    setReservation(res.data.data);
                    setDetailPrice(res.data.detail_price);
                })
            } catch (err) {
                console.log(err.message)
            }
        }

        const getTimeline = async () => {
            try {
                await reservationApi.getTimeline(id).then(res => {
                    let tmp_timeline = res.data.data;
                    tmp_timeline.forEach((item, index) => {
                        let user_name = item.is_me ? 'You' : 'The host';
                        switch (item.reservation_status_id) {
                            case 1: // REQUEST
                                item.cardTitle = `${user_name} have created a reservation`
                                break;
                            case 2: // ACCEPT
                                item.cardTitle = `${user_name} has accepted your reservation`
                                break;
                            case 3: // PAID
                                item.cardTitle = `${user_name} have paid your reservation`
                                if (index == 0) {
                                    item.cardTitle = `${user_name} have created and paid a reservation`
                                }
                                break;
                            case 4: // CANCEL
                                item.cardTitle = `${user_name} have cancel your reservation`
                                break;
                            case 5: // CHECKIN
                                item.cardTitle = `${user_name} confirms that you have checked in`
                                break;
                            case 6: // CHECKOUT
                                item.cardTitle = `${user_name} checked out`
                                break;
                            case 7: // DECLINE
                                item.cardTitle = `${user_name} has decline your reservation`
                                break;
                            case 8: // REVIEW
                                item.cardTitle = `${user_name} reviewed`
                                break;
                        }
                    })
                    setTimeline(tmp_timeline);
                })
            } catch (err) {
                console.log(err.message);
            }
        }

        getTimeline();
        fetchReservation();
    }, []);

    useEffect(() => {
        if (reservation.id > 0 && detailPrice) {
            setLoading(false);
        }
    }, [reservation, detailPrice])

    return (
        <div className='reservation-detail-container' style={{ background: '#f6f6f6' }}>
            {loading && <Loading />}
            <Header />
            {
                (reservation.id > 0) && <section className="gray-bg main-dashboard-sec" id="sec1">
                    <div className="container" style={{ minHeight: heightSection }}>
                        <div className='col-md-12'>
                            <h3 className='h3_title' style={scroll_nav}>Reservation Detail</h3>
                        </div>
                        <div className='col-md-12 reservation-timeline-container' style={{ height: 'auto' }}>
                            <div className='reservation-timeline fl-wrap block_box' style={{ height: '100%' }}>
                                <div className='col-md-8' style={{ borderRight: '1px solid #e5e7f2' }}>
                                    <Chrono items={timeline} mode="VERTICAL"
                                        disableNavOnKey
                                        color={'red'}
                                    />
                                </div>

                                <div className='col-md-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <button
                                        className="logout_btn color2-bg"
                                        style={{ marginLeft: 0, marginBottom: 10 }}
                                        onClick={() => history.push(`/listing/${reservation.listing_id}`)}
                                    >Booking listing again <i className="fas fa-sign-out" /></button>
                                </div>
                            </div>
                        </div>

                        <div className='col-xl-8 col-md-12'>
                            <ReservationInfo
                                checkin={reservation.checkin_date.split(' ')[0]}
                                checkout={reservation.checkout_date.split(' ')[0]}
                                user_name={reservation.user_name}
                                adult_count={reservation.adult_count}
                                child_count={reservation.child_count}
                            />
                        </div>
                        <div className='col-xl-4 col-md-12'>
                            <Owner
                                host_phone_number={reservation.host_phone_number}
                                host_email={reservation.host_email}
                                host_avatar_url={reservation.host_avatar_url}
                                host_name={reservation.host_name}
                            />
                        </div>
                        <div className='h-30 fl-wrap' />
                        <div className='col-xl-8 col-md-12'>

                            <div className='fl-wrap'>
                                <div className="cart-details-item-header bb-none mb-0">
                                    <h3>Price</h3>
                                </div>
                                <div className='block_box reservation-info'>
                                    {(reservation && detailPrice) && <TotalPrice
                                        price_per_night={reservation.price_per_night_base}
                                        total_price={detailPrice.total_price}
                                        nights={detailPrice.nights}
                                        rental_price={detailPrice.rental_price}
                                        discount_mothly={detailPrice.discount_mothly}
                                        discount_weekly={detailPrice.discount_weekly}
                                        discount={detailPrice.discount}
                                    />}
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-md-12'>
                            <Listing
                                id={reservation.listing_id}
                                avatar_url={reservation.thumb_img}
                                street_address={reservation.street_address}
                                name={reservation.listing_name}
                                listing_type={reservation.listing_type}
                            />
                        </div>

                        <div className='col-md-12'>
                            <div className='h-20' />
                        </div>

                    </div>
                </section>
            }

        </div>
    );
}

export default DetailReservation;

function Listing(props) {

    const { id, avatar_url, street_address, name, listing_type } = props;

    return (
        <>
            <div className="cart-details-item-header bb-none mb-0">
                <h3>Detail Listing</h3>
            </div>
            <div id="booking-widget-anchor" className="boxed-widget booking-widget" style={{ padding: '18px 18px 0' }}>
                <div className="with-forms">
                    <div className="checkup__header">
                        <div className="cart-booking-header">
                            <Link to={`/listing/${id}`} className="widget-posts-img"><img src={avatar_url} alt="" /></Link>
                            <div className="widget-posts-descr">
                                <h4><Link to={`/listing/${id}`}>{name}</Link></h4>
                                <div className="geodir-category-location fl-wrap"><a href="#">{street_address}</a></div>
                                <div className="widget-posts-descr-link"><a href="listing.html">{listing_type} </a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Owner(props) {
    const { host_phone_number, host_email, host_avatar_url, host_name } = props;
    return (
        <>
            <div className="cart-details-item-header bb-none mb-0">
                <h3>Owner</h3>
            </div>
            <div className="fl-wrap block_box">
                <div>
                    <div className="box-widget-content bwc-nopad">
                        <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                            <ul className="no-list-style">
                                <li><span><AvatarPlaceholder
                                    avatar_url={host_avatar_url}
                                    style={{
                                        width: 60, height: 60, borderRadius: '60%'
                                    }}
                                /></span> <a href="#" style={{ lineHeight: '50px', fontWeight: 'bold' }}>{host_name}</a></li>
                                <li><span><i className="fal fa-phone" /> Phone :</span> <a href="#">{host_phone_number}</a></li>
                                <li><span><i className="fal fa-envelope" /> Mail :</span> <a href="#">{host_email}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

function TotalPrice(props) {
    const { nights, rental_price, discount, total_price, price_per_night, discount_weekly, discount_monthly } = props;
    return (
        <div>
            <div className="checkup__price fadeIn border-1">
                <PriceItem
                    title={'Total cost 1 night'}
                    content={parseVNDCurrency(price_per_night)}
                />
                <PriceItem
                    title={'Nights'}
                    content={nights}
                />
                <PriceItem
                    title={`Total cost ${nights} đêm`}
                    content={parseVNDCurrency(rental_price)}
                />
                {(discount_weekly || discount_monthly) && <PriceItem
                    title={'Discount'}
                    content={`-${parseVNDCurrency(discount)}`}
                />}
                <PriceItem
                    title={'Payment Method'}
                    content={'PayPal'}
                />
                <PriceItem
                    title={'Total cost'}
                    content={parseVNDCurrency(total_price)}
                />
            </div>
        </div>
    )
}

function ReservationInfo(props) {
    const { checkin, checkout, user_name, adult_count, child_count } = props;
    return (
        <div className='fl-wrap'>
            <div className="cart-details-item-header bb-none mb-0">
                <h3>Reservation</h3>
            </div>
            <div className='block_box reservation-info' style={{ padding: 10 }}>
                <h3 style={{ fontSize: 22, padding: '5px 0', color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500 }}>{user_name}</h3>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='block_box' style={{ borderRadius: 6, padding: 16 }}>
                            <hr className="is-decorate is-green" />
                            <h3 className='check-title'>Checkin</h3>
                            <h3 className='check-date'>{checkin}</h3>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='block_box' style={{ borderRadius: 6, padding: 16 }}>
                            <hr className="is-decorate is-blue" />
                            <h3 className='check-title'>Checkout</h3>
                            <h3 className='check-date'>{checkout}</h3>
                        </div>
                    </div>
                    <div className='col-md-12' style={{ marginTop: 15 }}>
                        <h4 style={{ color: 'rgba(0, 0, 0, 0.85)', paddingBottom: 5, fontSize: 16 }}>Guests : {defaultValueGuests(adult_count, child_count)}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PriceItem(props) {
    const { title, content } = props;
    return (
        <div className="is-flex middle-xs between-xs cart-list pt-5 pb-5 pl-5 pr-5">
            <div className="is-flex align-center">
                <span style={{ color: '#566985', fontSize: 16 }}>{title}</span>
            </div>
            <span style={{ color: '#566985', fontSize: 16 }}>{content}</span>
        </div>
    )
}
