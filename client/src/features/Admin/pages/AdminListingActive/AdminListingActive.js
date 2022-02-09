import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import adminListing from '../../../../api/adminListing';
import GuestListingActive from '../../components/GuestListingActive/GuestListingActive';
import Loading from '../../../../components/Loading/Loading';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import NoData from '../../../../components/NoData/NoData';
import './AdminListingActive.scss';
import { Link } from 'react-router-dom';

AdminListingActive.propTypes = {

};

function AdminListingActive(props) {
    const [listingActive, setListingActive] = useState([]);
    const [totalPending, setTotalPending] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
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

        const getCountListing = () => {
            try {
                adminListing.getCountListingFilter().then(res => {
                    setTotalPending(res.data.total_pending);
                    setTotalActive(res.data.total_active);
                })
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        getCountListing();
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
                <ul className='filter-admin-listing'>
                    <li style={{ border: '1.5px solid black' }}><Link to='/admin/listing/active'>Active ({totalActive})</Link></li>
                    <li style={{ border: '1px solid #dddddd' }}><Link to='/admin/listing/pending'>Pending ({totalPending})</Link></li>
                </ul>
            </div>
            {listingActive.length > 0 ? <GuestListingActive
                list={listingActive}
                lockListing={lockListing}
            /> : <NoData />}

        </CommonAdmin>
    );
}

export default AdminListingActive;