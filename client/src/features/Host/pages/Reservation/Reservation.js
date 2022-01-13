import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import { useSelector } from 'react-redux';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import HeaderHost from '../../components/HeaderHost';
import './Reservation.scss';

Reservation.propTypes = {

};

function Reservation(props) {
    const loggedInHost = useSelector((state) => state.userSlice.host);

    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHostBooking = async () => {
        setLoading(true);
        await adminListing.getHostBooking(loggedInHost.id).then(res => {
            setBooking(res.data.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchHostBooking();

        return () => {
            setBooking([]);
        }
    }, []);
    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            <HeaderHost />
            <div className='container'>
                <div className="dashboard-list-box fl-wrap">
                    {
                        loading ? <div>Loading</div> :
                            booking.map((item, index) => (
                                <ReservationItem
                                    key={index}
                                    reservation={item}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Reservation;