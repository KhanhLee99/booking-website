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
                <li className={basicInfo ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.listing_type_id) ?
                        <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Basic infomation
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        basicInfo ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Basic infomation</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Basic infomation</a>
                    }
                </li>
                <li className={location ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.street_address) ?
                        <Link to={`/become-host/${id}/location`} className='color-tab-active' style={tabs_menu_li_a}>Location
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        location ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Location</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Location</a>
                    }
                </li>
                <li className={rooms ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/floor-plan`} className='color-tab-active' style={tabs_menu_li_a}>Rooms
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className={amenity ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {amenities.length > 0 ?
                        <Link to={`/become-host/${id}/amenities`} className='color-tab-active' style={tabs_menu_li_a}>Amenity
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        amenity ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Amenity</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Amenity</a>
                    }
                </li>

                <li className={photo ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {photos.length > 0 ?
                        <Link to={`/become-host/${id}/photos`} className='color-tab-active' style={tabs_menu_li_a}>Photos
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        photo ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Photos</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Photos</a>
                    }
                </li>

                <li className={description ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.name) ?
                        <Link to={`/become-host/${id}/title`} className='color-tab-active' style={tabs_menu_li_a}>Description
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        description ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Description</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Description</a>
                    }
                </li>

                <li className={pricing ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    {(listingDetail && listingDetail.price_per_night_base) ?
                        <Link to={`/become-host/${id}/price`} className='color-tab-active' style={tabs_menu_li_a}>Pricing
                            <i className="fas fa-check-circle" style={check} />
                        </Link> :
                        pricing ? <Link to={`/become-host/${id}/basic-infomation`} className='color-tab-active' style={tabs_menu_li_a}>Pricing</Link> :
                            <a className='no-drop' style={tabs_menu_li_a}>Pricing</a>
                    }
                </li>

                <li className={preview ? 'current' : ''} style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/preview`} className='color-tab-active' style={tabs_menu_li_a}>Preview
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
    // color: '#7d93b2', /*rgb(219 219 219)*/
    // color: 'rgb(219 219 219)', /*rgb(219 219 219)*/
    fontSize: '13px',
    display: 'block',
    fontWeight: 600,
    padding: '20px 0',
}

const check = { color: 'green', marginLeft: 5 }