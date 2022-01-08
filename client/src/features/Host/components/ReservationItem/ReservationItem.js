import React from 'react';
import PropTypes from 'prop-types';

ReservationItem.propTypes = {

};

function ReservationItem(props) {
    const { reservation } = props;
    return (
        <tr>
            <th scope="row">{reservation.reservation_id}</th>

            <td>{reservation.user_name}</td>
            <td>{reservation.listing_name}</td>
            <td>{reservation.total_price}</td>
            <td>Paypal</td>
            <td>Pending</td>
            <td>{reservation.created_at}</td>
            <td>Pending</td>
            <td><a>Chỉnh sửa</a></td>
        </tr>
    );
}

export default ReservationItem;