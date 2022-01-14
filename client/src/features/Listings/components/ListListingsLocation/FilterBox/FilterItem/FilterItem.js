import React from 'react';
import PropTypes from 'prop-types';

FilterItem.propTypes = {

};

const filter_tags_li = {
    width: '50%',
    margin: '0 0 10px 0',
    float: 'left',
}

const checkbox = {
    float: 'left',
    position: 'relative',
    border: '1px solid #ccc',
    cursor: 'pointer',
    padding: 0,
    width: '20px',
    height: '20px',
    position: 'relative',
    borderRadius: '2px',
    color: '#fff',
    background: '#fff',
}

const title = {
    float: 'left',
    padding: '0 2px 0 10px',
    position: 'relative',
    top: '1px',
    color: '#888da0',
    fontWeight: 600,
    width: 'auto',
    fontSize: '12px',
}

function FilterItem(props) {
    const { item, handleFilter } = props;
    return (
        <li style={filter_tags_li}>
            <input id={item.id} type="checkbox" name="check" style={checkbox} onChange={handleFilter}/>
            <label htmlFor={item.id} style={title}>{item.name}</label>
            <span className='_4abc4c3d5'>85</span>
        </li>
    );
}

export default FilterItem;