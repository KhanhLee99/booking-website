import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminListingPending.scss';
import adminListing from '../../../../api/adminListing';
import GuestListingPending from '../../components/GuestListingPending/GuestListingPending';
import ReactNotificationComponent from '../../../../components/Notification/ReactNotification';
import Loading from '../../../../components/Loading/Loading';
import CommonAdmin from '../../../../components/CommonAdmin/CommonAdmin';
import NoData from '../../../../components/NoData/NoData';
import { Link } from 'react-router-dom';

AdminListingPending.propTypes = {

};

function AdminListingPending(props) {

    const [listingPending, setListingPending] = useState([]);
    const [totalPending, setTotalPending] = useState(0);
    const [totalActive, setTotalActive] = useState(0);
    const [loading, setLoading] = useState(false);

    const removeListingActive = (id) => {
        const index = listingPending.findIndex(item => item.id === id);
        if (index !== -1) {
            setListingPending(listingPending.filter(item => item.id != id));
        }
    }

    useEffect(() => {
        const fetchListingPending = async () => {
            try {
                setLoading(true);
                await adminListing.getListingPending().then(res => {
                    setListingPending(res.data.data);
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
        fetchListingPending();

        return () => {
            setListingPending([]);
        }
    }, []);

    return (
        <CommonAdmin>
            {loading && <Loading />}
            <Child
                listingPending={listingPending}
                totalActive={totalActive}
                totalPending={totalPending}
                removeListingActive={removeListingActive}
                setLoading={setLoading}
                title='Title'
                body='Body'
            />
        </CommonAdmin>
    );
}

export default AdminListingPending;

function Child(props) {

    const handlePublicListing = async (id) => {
        try {
            setLoading(true);
            await adminListing.activeListing(id).then(res => {
                removeListingActive(id);
                setLoading(false);
                showNotification(title, body);
            }).catch(err => {
                console.log(err.message);
                setLoading(false);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const { showNotification, title, body, listingPending, removeListingActive, setLoading, totalActive, totalPending } = props;

    return (
        <>
            <div className="dashboard-title fl-wrap">
                <h3>Listings</h3>
                <ul className='filter-admin-listing'>
                    <li style={{ border: '1px solid #dddddd' }}><Link to='/admin/listing/active'>Active ({totalActive})</Link></li>
                    <li style={{ border: '1.5px solid black' }}><Link to='/admin/listing/pending'>Pending ({totalPending})</Link></li>
                </ul>
            </div>
            {listingPending.length > 0 ? <GuestListingPending
                list={listingPending}
                handlePublicListing={handlePublicListing}
            /> : <NoData />}
        </>
    )
}

