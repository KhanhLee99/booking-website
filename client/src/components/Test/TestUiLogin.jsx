import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../app/reducer/userSlice';

TestUiLogin.propTypes = {

};

function TestUiLogin(props) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const handleLogin = async (values, resetForm) => {
        try {
            const params = {
                email: values.email,
                password: values.password
            }
            setLoading(true);
            await dispatch(login(params));
            setLoading(false);
            // setTriggerPopup(false);
            resetForm();
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