import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TestSlice from '../../../../components/Test/TestSlice';
import './MainSearch.scss';
import { header_search_input_input } from '../../../../components/Header';
import { DatePicker } from 'antd';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Typed from "typed.js";


MainSearch.propTypes = {

};

const { RangePicker } = DatePicker;

function MainSearch(props) {

    const history = useHistory();

    const { customStyles, options, listingType } = props;

    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [city_id, set_city_id] = useState();
    const [listing_type, set_listing_type] = useState([]);

    const disabledDate = current => {
        if (current && current < moment().endOf('day')) return true;
        return false;
    }

    const handleChangeDebut = range => {
        const startDate = range[0].format("YYYY/MM/DD");
        const endDate = range[1].format("YYYY/MM/DD");
        // history.push(`/listing/${listingDetail.id}?checkin=${startDate.replaceAll('/', '-')}&checkout=${endDate.replaceAll('/', '-')}`);
        setCheckin(startDate);
        setCheckout(endDate);
    }

    const handleSearch = () => {
        if (city_id) {
            let searchParams = '';
            let tmpStr = '';
            if (listing_type.length > 0) {
                listing_type.map(item => tmpStr += `&pt=${item}`);
            }
            if (checkin && checkout && listing_type.length > 0) {
                searchParams += `?checkin_date=${checkin.replaceAll('/', '-')}&checkout_date=${checkout.replaceAll('/', '-')}${tmpStr}`;
                history.push(`/location/${city_id}${searchParams}`);
            } else if (checkin && checkout) {
                searchParams += `?checkin_date=${checkin.replaceAll('/', '-')}&checkout_date=${checkout.replaceAll('/', '-')}`;
                history.push(`/location/${city_id}${searchParams}`);
            } else if (listing_type.length > 0) {
                history.push(`/location/${city_id}/?checkin_date&checkout_date${tmpStr}`)
            } else {
                history.push(`/location/${city_id}`);
            }
        } else {
            alert('Select Location');
        }
    }
    const el = useRef(null);

    useEffect(() => {
        var typed = new Typed(el.current, {
            strings: ["Homestays", "Apartments", "Studios"],
            typeSpeed: 80,
            backSpeed: 80,
            backDelay: 4000,
            startDelay: 1000,
            loop: true,
            showCursor: true
        });
        //     startDelay: 300,
        //     typeSpeed: 100,
        //     backSpeed: 100,
        //     backDelay: 100

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="main-search-container plain-color fl-wrap">
            <div className="overlay op7"></div>
            <div className="main-search-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-search-headlines">
                                <h2 style={{
                                    fontSize: '46px',
                                    fontWeight: 900,
                                    color: '#fff',
                                    position: 'relative',
                                    fontFamily: "'Raleway', sans-serif",
                                    zIndex: 6,
                                }}>
                                    Find Best
                                    <span> </span>
                                    <span className="typed-words" ref={el} />
                                </h2>
                                <h4 style={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    zIndex: 7,
                                    opacity: 1,
                                }}>Expolore top-rated attractions, activities and more</h4>
                            </div>
                            <div className='fl-wrap'
                                style={{
                                    background: '#fff',
                                    borderRadius: '6px',
                                    boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.2)',
                                    padding: '8px 180px 8px 0',
                                    marginTop: '20px',
                                }}
                            >
                                <div style={input_wrap}>
                                    <Select
                                        isMulti
                                        isSearchable={false}
                                        options={listingType}
                                        name="listing_type"
                                        styles={customStyles}
                                        placeholder='What are you looking for?'
                                        onChange={option => {
                                            set_listing_type(option.map(item => item.value));
                                        }}
                                    />
                                </div>
                                <div style={input_wrap}>
                                    <Select
                                        options={options}
                                        name="city"
                                        styles={customStyles}
                                        placeholder='Location'
                                        onChange={option => set_city_id(option.value)}
                                    />
                                </div>
                                <div style={input_wrap}>
                                    <RangePicker
                                        disabledDate={disabledDate}
                                        format="DD/MM/YYYY"
                                        placeholder={['Checkin', 'Checkout']}
                                        suffixIcon
                                        style={header_search_input_input}
                                        inputReadOnly
                                        onChange={handleChangeDebut}
                                    />
                                </div>
                                <button className="button" onClick={handleSearch}
                                    style={search_btn}
                                >Search</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container msps-container">
                <div className="main-search-photo-slider">
                    <div className="msps-slider">
                        <TestSlice />
                    </div>
                </div>
            </div>
        </div >

    );
}

export default MainSearch;

const input_wrap = {
    float: 'left',
    width: '33.3%',
    boxSizing: 'border-box',
    borderRight: '1px solid #eee',
    height: '50px',
    padding: '0 5px',
    position: 'relative',
};

const search_btn = {
    background: '#384F95',
    borderRadius: '6px',
    fontSize: '12px',
    position: 'absolute',
    right: '10px',
    width: '160px',
    color: '#fff',
    top: '10px',
    bottom: '10px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
}