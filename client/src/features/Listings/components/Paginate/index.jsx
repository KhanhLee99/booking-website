import React from 'react';
import PropTypes from 'prop-types';

Paginate.propTypes = {

};

function Paginate(props) {

    const { totalPages, paginate } = props;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <span onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Paginate;