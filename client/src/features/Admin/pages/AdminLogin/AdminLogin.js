import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './AdminLogin.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import adminAuthApi from '../../../../api/adminAuthApi';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../../../app/reducer/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

AdminLogin.propTypes = {

};

function AdminLogin(props) {

    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        const params = {
            email: values.email,
            password: values.password
        }
        const actionResult = await dispatch(adminLogin(params)).then(res => {
            if (res.payload === undefined) {
                console.log('cannot login');
            } else {
                history.push('/admin/listing/pending');
            }
        });
    }

    useEffect(() => {
        if (isLoggedIn && loggedInUser.role_id == 1) {
            history.push('/admin/listing/pending');
        }
    }, []);

    return (
        <div>
            <h2>ADMIN LOGIN</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values);
                }}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type='text'
                            placeholder='email'
                            {...formik.getFieldProps('email')}
                        />
                        <input
                            type='password'
                            placeholder='password'
                            {...formik.getFieldProps('password')}
                        />
                        <button type='submit'>Login</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AdminLogin;