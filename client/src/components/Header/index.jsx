import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';

function Header(props) {
    const dispatch = useDispatch();
    // useEffect
    return (
        <div className='custom-color'>Header</div>
    )
}
export default Header;