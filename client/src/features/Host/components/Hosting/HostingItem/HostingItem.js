import React from 'react';
import PropTypes from 'prop-types';
import ThumbListingPlaceholder from '../../../../../components/Placeholder/ThumbListingPlaceholder/ThumbListingPlaceholder';
import { Link } from 'react-router-dom';
import { MdCheck, MdClose, MdEditCalendar, MdCheckCircle, MdCancel } from 'react-icons/md';
import './HostingItem.scss';
import { ListingStatus, listing_types } from '../../../../../app/constant';

HostingItem.propTypes = {

};

function badge_listing_type(id) {
    var badge = '';
    var type = listing_types.find(item => item.id == id);
    if (type) {
        badge = type.badge;
    }
    return badge;
}

function HostingItem(props) {
    const { listing } = props;

    const status = () => {
        switch (listing.status) {
            case ListingStatus.ACTIVE:
                return <span style={{ color: '#3ac47d', fontWeight: 700 }}>Đang hoạt động</span>;
            case ListingStatus.STOP_PUBLIC:
                return <span style={{ color: '#f7b924', fontWeight: 700 }}>Dừng hiển thị</span>;
            case ListingStatus.BLOCK_ACTIVITY:
                return <span style={{ color: '#ff5370', fontWeight: 700 }}>Chặn hoạt động</span>;
            default: return;
        }
    }
    return (
        <tr>
            <th scope="row" className='text-center'>
                <div className='badge badge-warning'>#{listing.id}</div>
            </th>
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
            <td style={{ fontWeight: 700 }}>{listing.type}</td>
            {/* <td style={{ fontWeight: 600 }} className='text-center'>
                {status()}
            </td> */}
            <td className='verify-status text-center' style={{ color: listing.is_verified == 0 ? '#6ab5f8' : '#b53e4e' }}>{listing.is_verified == 0 ? <MdCancel color='#ff5370' /> : <MdCheckCircle color='#3ac47d' />}</td>
            {/* <td className='verify-status'><Link to={`/host/calendar/listing/${listing.id}`}><MdEditCalendar /></Link></td> */}
            <td className='text-center'><Link to={`/become-host/${listing.id}/basic-infomation`} style={{ fontWeight: 700 }}>Edit</Link></td>
        </tr >
    );
}

export default HostingItem;