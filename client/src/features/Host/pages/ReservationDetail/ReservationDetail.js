import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ReservationDetail.scss';
import HeaderHost from '../../components/HeaderHost';
import { useParams } from 'react-router-dom';
import reservationApi from '../../../../api/reservationApi';
import { datediff, parseDate } from '../../../../@helper/helper';
import moment from 'moment';

ReservationDetail.propTypes = {

};

const scroll_nav = {
    float: 'left',
}

const scroll_nav_wrapper_opt = {
    float: 'right',
    position: 'relative',
    top: '12px',
}

const scroll_nav_wrapper_opt_btn = {
    float: 'left',
    marginLeft: '10px',
    padding: '8px 20px',
    border: '1px solid transparent',
    background: '#425998',
    color: '#fff',
    fontSize: '12px',
    borderRadius: '2px',
}

function ReservationDetail(props) {
    const { id } = useParams();
    const [reservation, setReservation] = useState({});
    const fetchReservation = async () => {
        try {
            await reservationApi.getDetailReservation(id).then(res => {
                setReservation(res.data.data);
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleAccept = async (e) => {
        e.preventDefault();
        await reservationApi.editStatusReservation(id, { reservation_status_id: 2 });
    }

    const handleDecline = async (e) => {
        e.preventDefault();

        await reservationApi.editStatusReservation(id, { reservation_status_id: 7 });
    }
    useEffect(() => {
        fetchReservation();
    }, []);
    return (
        <div id="wrapper">
            <HeaderHost />
            <div className='container'>

                <div className='row'>
                    <div className='col-12'>
                        <h3 className='h3_title' style={scroll_nav}>Reservation Request</h3>
                        <div className="scroll-nav-wrapper-opt" style={scroll_nav_wrapper_opt}>
                            <a href="#" onClick={(e) => handleAccept(e)} className="scroll-nav-wrapper-opt-btn" style={scroll_nav_wrapper_opt_btn}>  Accept </a>
                            <a href="#" onClick={(e) => handleDecline(e)} className="scroll-nav-wrapper-opt-btn showshare" style={scroll_nav_wrapper_opt_btn}> Decline </a>
                        </div>
                    </div>
                    <div className='col-3'>
                        <h4>Check In</h4>
                        <h3>{(new Date(reservation.checkin_date)).toDateString()}</h3>
                    </div>
                    <div className='col-3'>
                        <h4>Check Out</h4>
                        <h3>{(new Date(reservation.checkout_date)).toDateString()}</h3>
                    </div>
                    <div className='col-3'>
                        <h4>Total Date</h4>
                        <h3>{datediff(parseDate(moment(reservation.checkin_date, "YYYY-MM-DD hh:mm:ss").format('DD/MM/YYYY')), parseDate(moment(reservation.checkout_date, "YYYY-MM-DD hh:mm:ss").format('DD/MM/YYYY')))} nights</h3>
                    </div>
                    <div className='col-3'>
                        <h4>Request Time</h4>
                        <h3>{moment(reservation.created_at, "YYYY-MM-DD hh:mm:ss").format('DD/MM/YYYY')}</h3>
                        <h3>{moment(reservation.created_at, "YYYY-MM-DD hh:mm:ss").format('hh:mm:ss')}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetail;