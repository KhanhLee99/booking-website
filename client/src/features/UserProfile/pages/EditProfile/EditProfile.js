import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import userProfileApi from '../../../../api/userProfileApi';
import PulseLoading from '../../../../components/Loading/PulseLoading';
import { updateProfile } from '../../../../app/reducer/userSlice';
import uploadApi from '../../../../api/uploadApi';
import Header from '../../../../components/Header';
import AvatarPlaceholder from '../../../../components/Placeholder/AvatarPlaceholder/AvatarPlaceholder';
import CommonUserProfile from '../../../../components/CommonUserProfile/CommonUserProfile';
import { UserProfileTab } from '../../../../app/constant';

EditProfile.propTypes = {

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
    height: '50px',
}

const ava_size = {
    width: '120px',
    height: '120px'
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function EditProfile(props) {

    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [avatarImg, setAvatarImg] = useState(null);
    const [file, setFile] = useState(new FormData());
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.userSlice.current);

    const handleEditProfile = async (values) => {
        const params = {
            name: values.name,
            phone_number: values.phone_number,
        }
        setLoading(true)
        if (avatarImg) {
            setFile(file.append("file", avatarImg))
        }

        await userProfileApi.editProfile(params).then(res => {
            dispatch(updateProfile(res.data.data));
            if (avatarImg) {
                uploadApi.uploadAvatarUser(file).then(res => {
                    dispatch(updateProfile(res.data.data));
                    setLoading(false);
                    setAvatarImg(null);
                    setFile(new FormData());
                    setMessageSuccess('Update Success');
                }).catch(err => {
                    console.log(err.message)
                    setLoading(false)
                })
            } else {
                setLoading(false)
                setMessageSuccess('Update Success');
            }
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <CommonUserProfile
            currentTab={UserProfileTab.USER_PROFILE}
        >
            <h3 className='h3_title'>User Profile</h3>
            <div className="add-listing-section">
                <div className="row with-forms">

                    <div className="col-md-12">
                        <Formik
                            initialValues={{ name: loggedInUser.name, phone_number: loggedInUser.phone_number || '' }}

                            validationSchema={
                                Yup.object({
                                    name: Yup.string().required('Please input your name.'),
                                    phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
                                        .required('Please input your phone number.'),
                                })}
                            onSubmit={(values) => {
                                handleEditProfile(values);
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="edit-profile-photo k-edit-avatar">
                                        {
                                            avatarImg ?
                                                <img src={URL.createObjectURL(avatarImg)} alt="" style={ava_size} />
                                                :
                                                <AvatarPlaceholder
                                                    avatar_url={loggedInUser.avatar_url}
                                                    style={ava_size}
                                                />
                                        }
                                        <div className="change-photo-btn k-change-photo-btn">
                                            <div className="photoUpload" style={{ textAlign: 'center' }}>
                                                <span><i className="fal fa-edit" style={{ color: '#fff' }} /></span>
                                                <input
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    className="upload"
                                                    onChange={(e) => setAvatarImg(e.currentTarget.files[0])}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <label className='custom_form_label'>Name</label>

                                    <input
                                        type="text"
                                        placeholder=""
                                        style={custom_form_input}
                                        {...formik.getFieldProps('name')}
                                    />

                                    {formik.errors.name ? (
                                        <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.name}</label>
                                    ) : null}

                                    <label className='custom_form_label'>Email</label>

                                    <input
                                        type="email"
                                        placeholder=""
                                        style={custom_form_input}
                                        disabled
                                        defaultValue={loggedInUser.email}
                                    />

                                    <label className='custom_form_label'>Phone Number</label>

                                    <input
                                        type="text"
                                        placeholder=""
                                        style={custom_form_input}
                                        {...formik.getFieldProps('phone_number')}
                                    />

                                    {formik.errors.phone_number ? (
                                        <label className='custom_form_label' style={{ color: 'red', marginTop: '-20px' }}>{formik.errors.phone_number}</label>
                                    ) : null}

                                    {/* <label className='custom_form_label'>Địa chỉ</label>

                                    <input
                                        type="text"
                                        placeholder=""
                                        style={custom_form_input}
                                    /> */}

                                    <button type='submit' className="logout_btn color2-bg" style={{ marginLeft: 0 }}>{loading ? <PulseLoading /> : 'Update'}</button>

                                    {messageSuccess && <label className='custom_form_label' style={{ color: 'red', marginTop: '10px' }}>{messageSuccess}</label>}
                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </CommonUserProfile>
    );
}

export default EditProfile;