import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import PulseLoading from '../../components/Loading/PulseLoading';
import useWindowDimensions from '../../@use/useWindowDimensions';
import Header from '../../components/Header';
import userApi from '../../api/userApi';
import useQuery from '../../@use/useQuery';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

ResetPassword.propTypes = {

};

const custom_form_button = {
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0px',
    width: '100%',
    padding: '13px 0',
    color: '#fff',
    // marginLeft: '50%',
    // transform: 'translateX(-50%)',
}

const custom_form_label = {
    float: 'left',
    position: 'relative',
    width: '100%',
    textAlign: 'left',
    fontWeight: 500,
    color: '#666',
    color: '#878c9f',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '12px'
}

const errorLogin = { color: 'red', margin: '-10px 0 5px 20px', fontSize: '12px' }

function ResetPassword(props) {
    const [loading, setLoading] = useState(false);
    const query = useQuery();

    const { enqueueSnackbar } = useSnackbar();


    const { height } = useWindowDimensions();

    const resetPassword = async (values) => {
        try {
            const params = {
                token: query.get('token') || '',
                password: values.password,
            }
            setLoading(true);
            await userApi.resetPassword(params).then(res => {
                if (res.data.success) {
                    setLoading(false);
                    enqueueSnackbar('Reset Password Success', { variant: "success" })
                } else {
                    setLoading(false);
                    enqueueSnackbar('Reset Password Error', { variant: "error" })
                }
            }).catch(err => {
                setLoading(false);
                enqueueSnackbar('Reset Password Error', { variant: "error" })
            })
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    return (
        <div className='admin-login-box gray-bg' style={{ minHeight: height }}>
            <Header />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={
                    Yup.object({
                        password: Yup.string()
                            .min(6, 'Password must be least 6 characters')
                            .required('Password is required'),
                        confirm_password: Yup.string()
                            .min(6, 'Confirm password is required')
                            .required('Confirm password is required')
                            .oneOf([Yup.ref('password'), null], 'Please make sure your passwords match')
                    })}
                onSubmit={(values, { setSubmitting }) => {
                    resetPassword(values);
                }}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} style={{ marginTop: 150 }}>
                        <h2 className='admin-login-title'>RESET PASSWORD</h2>
                        <input
                            type='password'
                            placeholder='New Password'
                            {...formik.getFieldProps('password')}
                            className="text-field"
                        />

                        {formik.touched.password && formik.errors.password ? (
                            <label className='custom_form_label' style={errorLogin}>{formik.errors.password}</label>
                        ) : null}

                        <input
                            type='password'
                            placeholder='Retype New Password'
                            {...formik.getFieldProps('confirm_password')}
                            className="text-field"
                        />

                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <label className='custom_form_label' style={errorLogin}>{formik.errors.confirm_password}</label>
                        ) : null}

                        <button type='submit' className='admin-login-submit-btn'>Reset Password</button>
                    </form>
                )}
            </Formik>
            <div style={{ width: '100%' }}>
                <Link to='/' style={{ textAlign: 'center', display: 'block' }}>Back to home</Link>
            </div>
        </div>
    );
}

export default ResetPassword;