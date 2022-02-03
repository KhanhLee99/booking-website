import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import userProfileApi from '../../../../api/userProfileApi';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PulseLoading from '../../../../components/Loading/PulseLoading';

ChangePassword.propTypes = {

};

const custom_form_input = {
    float: 'left',
    border: '1px solid #e5e7f2',
    background: '#f9f9f9',
    width: '100%',
    padding: '15px 20px 15px 20px',
    borderRadius: '4px',
    color: '#7d93b2',
    fontSize: '12px',
    outline: 'none',
    overflow: 'hidden',
    zIndex: 1,
    boxShadow: 'none',
}

function ChangePassword(props) {

    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');

    const handleChangePassword = async (values, resetForm) => {

        const params = {
            old_password: values.old_password,
            new_password: values.new_password,
            confirm_password: values.confirm_password,
        }
        setLoading(true);
        await userProfileApi.changePassword(params).then(res => {
            if (res.data.status === 200) {
                setMessageSuccess('Cập nhật mật khẩu thành công');
                setLoading(false);
                resetForm();
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <h3 className='h3_title'>Change Password</h3>

            <div className="add-listing-section">
                <div className="row with-forms">

                    <div className="col-md-12">
                        <Formik
                            initialValues={{ old_password: '', new_password: '', confirm_password: '' }}

                            validationSchema={
                                Yup.object({
                                    old_password: Yup.string().required('Vui lòng nhập Mật khẩu hiện tại'),
                                    new_password: Yup.string()
                                        .min(6, 'Vui lòng nhập Mật khẩu mới')
                                        .required('Password is required'),
                                    confirm_password: Yup.string()
                                        .min(6, 'Vui lòng nhập Xác nhận mật khẩu mới')
                                        .required('Password is required')
                                        .oneOf([Yup.ref('new_password'), null], 'Xác nhận mật khẩu mới khác với Mật khẩu mới')
                                })}
                            onSubmit={(values, { resetForm }) => {
                                handleChangePassword(values, resetForm);
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <label className='custom_form_label'>Mật khẩu hiện tại</label>

                                    <input
                                        type="password"
                                        placeholder=""
                                        style={custom_form_input}
                                        {...formik.getFieldProps('old_password')}
                                    />

                                    {formik.touched.old_password && formik.errors.old_password ? (
                                        <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.old_password}</label>
                                    ) : null}

                                    <label className='custom_form_label'>Mật khẩu mới</label>

                                    <input
                                        type="password"
                                        placeholder=""
                                        style={custom_form_input}
                                        {...formik.getFieldProps('new_password')}
                                    />

                                    {formik.touched.new_password && formik.errors.new_password ? (
                                        <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.new_password}</label>
                                    ) : null}

                                    <label className='custom_form_label'>Xác nhận mật khẩu mới</label>

                                    <input
                                        type="password"
                                        placeholder=""
                                        style={custom_form_input}
                                        {...formik.getFieldProps('confirm_password')}
                                    />

                                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                        <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.confirm_password}</label>
                                    ) : null}

                                    <button type='submit' className="logout_btn color2-bg" style={{ marginLeft: 0 }}>{loading ? <PulseLoading /> : 'Cập nhật'}</button>
                                    {messageSuccess && <label className='custom_form_label' style={{ color: 'red', marginTop: '10px' }}>{messageSuccess}</label>}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;