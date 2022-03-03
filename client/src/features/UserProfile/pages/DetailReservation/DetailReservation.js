import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetailReservation.scss';
import Header from '../../../../components/Header';
import useWindowDimensions from '../../../../@use/useWindowDimensions';
import { Link, useParams } from 'react-router-dom';
import { defaultValueGuests, parseVNDCurrency } from '../../../../@helper/helper';
import { Chrono } from "react-chrono";
import data from "../../../../app/data/timeline_data";
import reservationApi from '../../../../api/reservationApi';
import Loading from '../../../../components/Loading/Loading';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder'

DetailReservation.propTypes = {

};

function DetailReservation(props) {

    const { id } = useParams();

    const [reservation, setReservation] = useState({ id: 0 });
    const [loading, setLoading] = useState(true);

    const { height } = useWindowDimensions();
    const heightSection = height - 100;

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                await reservationApi.getDetailReservation(id).then(res => {
                    setReservation(res.data.data);
                })
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchReservation();
    }, []);

    useEffect(() => {
        if (reservation.id > 0) {
            setLoading(false);
        }
    }, [reservation])

    return (
        <div className='reservation-detail-container' style={{ background: '#f6f6f6' }}>
            {loading && <Loading />}
            <Header />
            {
                (reservation.id > 0) && <section className="gray-bg main-dashboard-sec" id="sec1">
                    <div className="container" style={{ minHeight: heightSection }}>
                        <div className='col-md-12 reservation-timeline-container'>
                            <div className='reservation-timeline fl-wrap block_box'>
                                <Chrono items={data} mode="VERTICAL"
                                    disableNavOnKey
                                />
                            </div>
                        </div>
                        <div className='col-xl-8 col-md-12'>
                            <div className='fl-wrap'>
                                <div className="cart-details-item-header">
                                    <h3>CHI TIẾT CHỖ Ở</h3>
                                </div>
                                <div className='block_box reservation-info'>
                                    <TotalPrice
                                        price_per_night={reservation.price_per_night_base}
                                        total_price={reservation.total_price}
                                    />
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
                        <div className='h-30 fl-wrap' />
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
                        <div className='col-md-12'>
                            <button className="logout_btn color2-bg" style={{ marginLeft: 0, marginBottom: 10 }}>Booking listing again <i className="fas fa-sign-out" /></button>
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
            <div className="cart-details-item-header">
                <h3>CHI TIẾT CHỖ Ở</h3>
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
            <div className="cart-details-item-header">
                <h3>CHI TIẾT CHỖ Ở</h3>
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
                                {/* <li><span><i className="fal fa-browser" /> Website :</span> <a href="#">themeforest.net</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

function TotalPrice(props) {
    const { nights, rentalPrice, servicePrice, total_price, price_per_night } = props;
    return (
        <div>
            <div className="checkup__price fadeIn border-1">
                <PriceItem
                    title={'Giá thuê 1 night'}
                    content={parseVNDCurrency(price_per_night)}
                />
                <PriceItem
                    title={'Nights'}
                    content={3}
                />
                <PriceItem
                    title={'Giá thuê 3 đêm'}
                    content={parseVNDCurrency(total_price)}
                />
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
            <div className="cart-details-item-header">
                <h3>CHI TIẾT CHỖ Ở</h3>
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
                        {/* <h4 style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 16 }}>Guests : 1</h4> */}
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
                <span style={{ color: '#555', fontSize: 16 }}>{title}</span>
            </div>
            <span style={{ color: '#555', fontSize: 16 }}>{content}</span>
        </div>
    )
}
