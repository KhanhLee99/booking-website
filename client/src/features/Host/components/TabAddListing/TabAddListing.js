import React from 'react';
import PropTypes from 'prop-types';
import './TabAddListing.scss';
import { Link, useParams } from 'react-router-dom';

TabAddListing.propTypes = {

};

function TabAddListing(props) {
    const { id } = props;
    return (
        <div id='tab-add-listing'>
            <ul className="tabs-menu fl-wrap">
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/basic-infomation`} style={tabs_menu_li_a}>Basic infomation
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/location`} style={tabs_menu_li_a}>Location
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/floor-plan`} style={tabs_menu_li_a}>Rooms
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/amenities`} style={tabs_menu_li_a}>Amenity
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/photos`} style={tabs_menu_li_a}>Photos
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/title`} style={tabs_menu_li_a}>Description
                        <i className="fas fa-check-circle" style={check} />
                    </Link>
                </li>
                <li className='current' style={tabs_menu_li} onClick={e => { e.preventDefault() }}>
                    <Link to={`/become-host/${id}/price`} style={tabs_menu_li_a}>Pricing
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
    width: `${100 / 7}%`,
    borderColor: '#4DB7FE',
    cursor: 'pointer',
}

const tabs_menu_li_a = {
    color: '#7d93b2', /*rgb(219 219 219)*/
    fontSize: '13px',
    display: 'block',
    fontWeight: 600,
    padding: '20px 0',
}

const check = { color: 'green', marginLeft: 5 }