import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '../../features/Guest/guestSlice';
import './styles.scss';

function Header(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     const actionResult = await dispatch(getMe);
        //     const currentUser = unwrapResult(actionResult);
        //     console.log(currentUser);
        // }
        // fetchData();
    }, [])
    return (
        <div className='custom-color'>Header</div>
    )
}
export default Header;