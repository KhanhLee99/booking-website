import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import GuestListingActive from '../../components/GuestListingActive/GuestListingActive';

AdminListingActive.propTypes = {

};

function AdminListingActive(props) {
    const [listingActive, setListingActive] = useState([]);

    useEffect(() => {
        const fetchListingActive = async () => {
            try {
                await adminListing.getListingActive().then(res => {
                    setListingActive(res.data.data);
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        fetchListingActive();

        return () => {
            setListingActive([]);
        }
    }, []);

    const lockListing = async (id) => {
        await adminListing.lockListing(id).then(res => {
            setListingActive(listingActive.filter(item => item.id != id));
        });
    }

    return (
        <>
            <div className="dashboard-title fl-wrap">
                <h3>Your Listings</h3>
            </div>
            <GuestListingActive
                list={listingActive}
                lockListing={lockListing}
            />
        </>
    );
}

export default AdminListingActive;