import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../app/reducer/userSlice';
import userApi from '../../api/userApi';
import { unwrapResult } from '@reduxjs/toolkit';

TestUiLogin.propTypes = {

};

function TestUiLogin(props) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const deviceToken = useSelector(state => state.userSlice.deviceToken);



    const handleLogin = async (values, resetForm) => {
        try {
            const params = {
                email: values.email,
                password: values.password
            }
            setLoading(true);
            await dispatch(login(params)).then(res => {
                const access_token = unwrapResult(res).data.token;
                userApi.updateDeviceToken({ device_token: deviceToken }, access_token);
            });
            // await userApi.updateDeviceToken({ device_token: deviceToken });
            // setLoading(false);
            // resetForm();
            // console.log('deviceToken', deviceToken);
        } catch (err) {
            console.log(err.message)
            setLoading(false);
        }
    }

    return (
        <div style={{ width: "50%" }}>
            <h2>USER LOGIN</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values);
                }}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string()
                            // .max(1, 'Must be 1 characters or less')
                            .required('Required'),
                    })}
                onSubmit={(values, { resetForm }) => {
                    handleLogin(values, resetForm);
                }}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type='text'
                            placeholder='email'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <input
                            type='password'
                            placeholder='password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <button type='submit'>Login</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default TestUiLogin;