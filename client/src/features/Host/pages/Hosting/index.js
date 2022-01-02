import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderHost from '../../components/HeaderHost';
import './styles.scss';
import hostApi from '../../../../api/hostApi';
import { useSelector } from 'react-redux';
import HostingItem from '../../components/Hosting/HostingItem/HostingItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import HostingSkeleton from '../../components/Hosting/HostingSkeleton';

Hosting.propTypes = {

};

function Hosting(props) {

    const loggedInUser = useSelector((state) => state.userSlice.host);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const getListings = async () => {
            try {
                setLoading(true);
                await hostApi.getListingsByUserId(2).then(res => {
                    setListings(res.data.data);
                    setLoading(false)
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        getListings();

        return () => {
            setListings([]);
        }
    }, []);
    return (
        <div id="wrapper">
            <HeaderHost />
            <div className="clearfix" />
            <div className="k-content">
                <div className='k-listing-info'>
                    <div className='k-listing-count'>
                        {loading ? null : <h3>{listings.length} nha/phong cho thue</h3>}

                    </div>
                    <div className='k-add-listing'>
                        <a href="dashboard-add-listing.html" className="button border with-icon">Add Listing <i className="sl sl-icon-plus"></i></a>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col" className='k-title-name-th'>Nha/Phong cho thue</th>
                            <th scope="col">ĐỊA ĐIỂM</th>
                            <th scope="col">TRẠNG THÁI</th>
                            <th scope="col">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <HostingSkeleton />
                        </> :
                            listings.map((listing, index) => (
                                <HostingItem
                                    key={index}
                                    listing={listing}
                                />
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Hosting;