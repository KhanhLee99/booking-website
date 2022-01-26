import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminListingPending.scss';
import adminListing from '../../../../api/adminListing';
import GuestListingPending from '../../components/GuestListingPending/GuestListingPending';
import ReactNotificationComponent from '../../../../components/Notification/ReactNotification';

AdminListingPending.propTypes = {

};

function AdminListingPending(props) {

    const [listingPending, setListingPending] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListingPending = async () => {
            try {
                await adminListing.getListingPending().then(res => {
                    setListingPending(res.data.data);
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchListingPending();

        return () => {
            setListingPending([]);
        }
    }, []);

    const publicListing = async (id) => {
        try {
            await adminListing.activeListing(id).then(res => {
                const index = listingPending.findIndex(item => item.id === id);
                if (index !== -1) {
                    setListingPending(listingPending.filter(item => item.id != id));
                }
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="dashboard-title fl-wrap">
                <h3>Your Listings</h3>
            </div>
            <GuestListingPending
                list={listingPending}
                publicListing={publicListing}
            />
        </>
    );
}

export default AdminListingPending;