import React from 'react';
import PropTypes from 'prop-types';
import './FilterBox.scss';
import FilterItem from './FilterItem/FilterItem';

FilterBox.propTypes = {

};

function FilterBox(props) {
    const { listing_types, star, handleFilter, filterType, filterStar } = props;
    return (
        <div className="fl-wrap block_box">
            <div className="_62409d4c7"><h2 className="ac6bdec376">Filter by:</h2></div>
            <ul className="no-list-style filter-list" style={{ padding: 0 }}>
                <li className="fl-wrap filter-bt" style={{ borderBottom: '1px solid #e5e7f2' }}>
                    <div className="fl-wrap filter-tags" >
                        <div className=""><h2 className="ac6bdec376">Property type</h2></div>
                        <ul className="no-list-style">
                            {listing_types.map((type, index) => (
                                <FilterItem
                                    item={type}
                                    key={index}
                                    handleFilter={(e) => handleFilter(e, 'type')}
                                    filterType={filterType}
                                    type='type'
                                />
                            ))}
                        </ul>
                    </div>
                </li>
                <li className="fl-wrap filter-bt" style={{ borderBottom: '1px solid #e5e7f2' }}>
                    <div className="fl-wrap filter-tags"  >
                        <div className=""><h2 className="ac6bdec376">Star rating</h2></div>
                        <ul className="no-list-style">
                            {star.map((item, index) => (
                                <FilterItem
                                    item={item}
                                    key={index}
                                    handleFilter={(e) => handleFilter(e, 'star')}
                                    filterStar={filterStar}
                                    type='star'
                                />
                            ))}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default FilterBox;