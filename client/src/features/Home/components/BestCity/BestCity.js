import React from 'react';
import PropTypes from 'prop-types';
import './BestCity.scss';
import { Link, useHistory } from 'react-router-dom';

BestCity.propTypes = {

};

function BestCity(props) {

    const history = useHistory();

    const handleClickCity = (city_id) => {
        history.push(`/location/${city_id}`);
    }

    const { cities } = props;
    return (
        <section className="gray-bg hidden-section particles-wrapper">
            <div className="container">
                <div className="section-title">
                    <h2>Explore Best Cities</h2>
                    <div className="section-subtitle">Catalog of Categories</div>
                    <span className="section-separator" />
                    <p style={{ textAlign: 'center' }}>Discover top-rated attractions, activities, and more.</p>
                </div>
                <div className="listing-item-grid_container fl-wrap">
                    {/* <div className="row"> */}
                    {cities.map((city, index) => (
                        <BestCityItem
                            key={index}
                            city={city}
                            handleClickCity={handleClickCity}
                        />
                    ))}
                    {/* </div> */}
                </div>
            </div>
        </section>
    );
}

export default BestCity;

function BestCityItem(props) {

    const { city, handleClickCity } = props;
    return (
        // <div className="col-sm-4">

        <div className="listing-item-grid" onClick={() => handleClickCity(city.id)}>
            <div className="bg" data-bg="images/all/1.jpg"
                style={{ backgroundImage: "url(" + city.thumb_url + ")" }}
            />
            <div className="d-gr-sec" />
            <div className="listing-counter color2-bg"><span>16 </span> Locations</div>
            <div className="listing-item-grid_title">
                <h3><Link to={`/location/${city.id}/?page=1`}>{city.name}</Link></h3>
            </div>
        </div>
        // </div>

    )
}