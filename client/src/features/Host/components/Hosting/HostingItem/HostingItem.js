import React from 'react';
import PropTypes from 'prop-types';
import ThumbListingPlaceholder from '../../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import { Link } from 'react-router-dom';
import { MdCheck, MdClose, MdEditCalendar } from 'react-icons/md';
import './HostingItem.scss';
import { ListingStatus } from '../../../../../app/constant';

HostingItem.propTypes = {

};



function HostingItem(props) {
    const { listing } = props;

    const status = () => {
        switch (listing.status) {
            case ListingStatus.ACTIVE:
                return <p style={{ color: '#7cccb2' }}>Đang hoạt động</p>;
            case ListingStatus.STOP_PUBLIC:
                return <p style={{ color: '#f6cf48' }}>Dừng hiển thị</p>;
            case ListingStatus.BLOCK_ACTIVITY:
                return <p style={{ color: '#5b5b68' }}>Chặn hoạt động</p>;
            default: return;
        }
    }
    return (
        <tr>
            <th scope="row">{listing.id}</th>
            <td>
                <div>
                    <ThumbListingPlaceholder
                        listing_img={listing.avatar_url}
                        className='k-image-thumbnail-td'
                    />
                    <Link to={`/listing/${listing.id}`} className='k-listing-name-td'>{listing.name}</Link>
                </div>

            </td>
            <td>{listing.street_address}</td>
            <td style={{ fontWeight: 600 }}>
                {status()}
            </td>
            <td className='verify-status' style={{ color: listing.is_verified == 0 ? '#6ab5f8' : '#b53e4e' }}>{listing.is_verified == 0 ? <MdClose /> : <MdCheck />}</td>
            <td className='verify-status'><Link to={`/host/calendar/listing/${listing.id}`}><MdEditCalendar /></Link></td>
            <td><a>Chỉnh sửa</a></td>
        </tr>
    );
}

export default HostingItem;