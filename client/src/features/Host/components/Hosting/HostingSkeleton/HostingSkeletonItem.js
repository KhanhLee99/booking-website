import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

HostingSkeletonItem.propTypes = {

};

function HostingSkeletonItem(props) {
    return (
        <tr>
            <th scope="row"><Skeleton /></th>
            <td>
                <div>
                    <span><Skeleton className='k-image-thumbnail-td' style={{ float: "left" }} /></span>
                    <span className='k-listing-name-td'><Skeleton width={"40%"} style={{ float: "left" }} /></span>
                </div>

            </td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><a><Skeleton /></a></td>
        </tr>
    );
}

export default HostingSkeletonItem;