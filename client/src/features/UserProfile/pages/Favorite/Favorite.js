import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../../components/Header';
import ListListingsLocation from '../../../Listings/components/ListListingsLocation';
import userProfileApi from '../../../../api/userProfileApi';

Favorite.propTypes = {

};

function Favorite(props) {
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const fetchListFavorite = async () => {
        try {
            setLoading(true);
            await userProfileApi.getFavorites().then(res => {
                if (res.data.status === 'success') {
                    setListings(res.data.data)
                    setLoading(false);
                }
            })
        } catch (err) {
            console.log(err.message)
        }

    }

    useEffect(() => {
        fetchListFavorite();
        return () => {
            setListings([]);
        }

    }, []);

    return (
        <div>
            <h3 className='h3_title'>Yêu thích</h3>
            <ListListingsLocation
                listings={listings}
                loading={loading}
            />
        </div>
    );
}

export default Favorite;