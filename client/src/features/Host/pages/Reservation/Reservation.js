import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import { useSelector } from 'react-redux';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import HeaderHost from '../../components/HeaderHost';

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
        <div id="wrapper">
            <HeaderHost />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col" className='k-title-name-th'>Guest</th>
                        <th scope="col">Listing</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Create At</th>
                        <th scope="col">Status</th>
                        <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <>
                        {/* <HostingSkeleton /> */}
                    </> :
                        booking.map((item, index) => (
                            <ReservationItem
                                key={index}
                                reservation={item}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Reservation;