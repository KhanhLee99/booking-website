import React from 'react';
import PropTypes from 'prop-types';
import { UserListingFilter } from '../../../../../../app/constant';

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

    const { item, handleFilter, filterType, filterStar, type } = props;

    const checkFiltered = () => {
        let idx;
        if (type == UserListingFilter.TYPE) {
            idx = filterType.findIndex(element => element == item.id);
        } else {
            idx = filterStar.findIndex(element => element == item.id);
        }
        return <input
            id={item.id}
            type="checkbox"
            name="check"
            style={checkbox}
            onChange={handleFilter}
            defaultChecked={idx != -1 ? true : false}
        />
    }


    return (
        <li style={filter_tags_li}>
            {checkFiltered()}
            <label htmlFor={item.value} style={title}>{item.name}</label>
            {/* <span className='_4abc4c3d5'>85</span> */}
        </li>
    );
}

export default FilterItem;