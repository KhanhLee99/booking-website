import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TabAddListing.scss';
import { Link } from 'react-router-dom';
import listingApi from '../../../../api/listingApi';

TabAddListing.propTypes = {

};

TabAddListing.defaultProps = {
    basicInfo: false,
    location: false,
    rooms: false,
    amenity: false,
    photo: false,
    description: false,
    pricing: false,
    preview: false
};

function TabAddListing(props) {
    const { id, basicInfo, location, rooms, amenity, photo, description, pricing, preview } = props;

    const [listingDetail, setListingDetail] = useState({});
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await listingApi.getListingPreview(id).then(res => {
                setListingDetail(res.data.data.listing);
                setAmenities(res.data.data.amenities || []);
                setPhotos(res.data.data.photos || []);
            })
        }

        fetchData();

        return () => {
            setListingDetail([]);
            setAmenities([]);
            setPhotos([]);
        }
    }, []);
    return (
        <div id='tab-add-listing'>
            <ul className="tabs-menu fl-wrap">
                <li className={basicInfo && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.listing_type_id) ?
                        <Link to={`/become-host/${id}/basic-infomation`} style={tabs_menu_li_a}>Basic infomation
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Basic infomation</a>
                    }
                </li>
                <li className={location && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.street_address) ?
                        <Link to={`/become-host/${id}/location`} style={tabs_menu_li_a}>Location
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Location</a>
                    }
                </li>
                <li className={rooms && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/floor-plan`} style={tabs_menu_li_a}>Rooms
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className={amenity && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {amenities.length > 0 ?
                        <Link to={`/become-host/${id}/amenities`} style={tabs_menu_li_a}>Amenity
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Amenity</a>
                    }
                </li>

                <li className={photo && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {photos.length > 0 ?
                        <Link to={`/become-host/${id}/photos`} style={tabs_menu_li_a}>Photos
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Photos</a>
                    }
                </li>

                <li className={description && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.name) ?
                        <Link to={`/become-host/${id}/title`} style={tabs_menu_li_a}>Description
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Description</a>
                    }
                </li>

                <li className={pricing && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.price_per_night_base) ?
                        <Link to={`/become-host/${id}/price`} style={tabs_menu_li_a}>Pricing
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        <a className='no-drop' style={tabs_menu_li_a}>Pricing</a>
                    }
                </li>

                <li className={preview && 'current'} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/price`} style={tabs_menu_li_a}>Preview
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default TabAddListing;

const tabs_menu_li = {
    float: 'left',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    width: `${100 / 8}%`,
    borderColor: '#4DB7FE',
    // cursor: 'pointer',
}

const tabs_menu_li_a = {
    color: '#7d93b2', /*rgb(219 219 219)*/
    fontSize: '13px',
    display: 'block',
    fontWeight: 600,
    padding: '20px 0',
}

const check = { color: 'green', marginLeft: 5 }