import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import GuestListingActive from '../../components/GuestListingActive/GuestListingActive';
import Loading from '../../../../components/Loading/Loading';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';

AdminListingActive.propTypes = {

};

function AdminListingActive(props) {
    const [listingActive, setListingActive] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListingActive = async () => {
            try {
                setLoading(true);
                await adminListing.getListingActive().then(res => {
                    setListingActive(res.data.data);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err.message);
                setLoading(false);
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
        <CommonAdmin>
            {loading && <Loading />}
            <div className="dashboard-title fl-wrap">
                <h3>Listings</h3>
            </div>
            <GuestListingActive
                list={listingActive}
                lockListing={lockListing}
            />
        </CommonAdmin>
    );
}

export default AdminListingActive;