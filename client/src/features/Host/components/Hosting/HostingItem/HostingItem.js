import React from 'react';
import PropTypes from 'prop-types';

HostingItem.propTypes = {

};

function HostingItem(props) {
    const { listing } = props;
    return (
        <tr>
            <th scope="row">{listing.id}</th>
            <td>
                <div>
                    <img className='k-image-thumbnail-td' src={listing.avatar_url} />
                    <span className='k-listing-name-td'>{listing.name}</span>
                </div>

            </td>
            <td>{listing.street_address}</td>
            <td>Chưa Xác Thực</td>
            <td><a>Chỉnh sửa</a></td>
        </tr>
    );
}

export default HostingItem;