import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import FooterHost from '../../components/FooterHost';
import { Formik } from 'formik';
import * as Yup from 'yup';
import hostApi from '../../../../api/hostApi';
import { useHistory, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import listingApi from '../../../../api/listingApi';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';

AddName.propTypes = {

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

function AddName(props) {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [percent, setPercent] = useState(100 / 7 * 4);

    const handleNext = async (values) => {
        try {
            console.log(values);
            const params = {
                name: values.title,
                description: description
            }
            setLoading(true);
            await hostApi.updateListing(params, id).then(res => {
                setLoading(false);
                if (res.data.status == 'success') {
                    history.push(`/become-host/${id}/price`);
                }
            });
        } catch (err) {
            console.log(err.message);
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/become-host/${id}/photos`);
    }

    useEffect(() => {
        const fetchListingDetail = async () => {
            await listingApi.getListingById(id).then(res => {
                setName(res.data.data.listing.name);
                setDescription(res.data.data.listing.description);
                setPercent(100 / 7 * 5);
            });
        }

        fetchListingDetail();
    }, []);

    return (
        <CommonAddListing>
            <TabAddListing
                id={id}
                description={true}
            />
            <div className='row'>
                <div className='col-8'>
                    <Formik
                        enableReinitialize
                        initialValues={{ title: name || '', description: description }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                // .max(15, 'Must be 15 characters or less')
                                .required('Required')
                                .max(50),

                            // description: Yup.string()
                            //     .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            handleNext(values);
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <div id="add-listing">
                                    <h3 className='h3_title'>Tiêu đề và mô tả</h3>
                                    <div className="add-listing-section">
                                        <div className="row with-forms">
                                            <div className="col-md-12">
                                                <label className='custom_form_label'>Tên chỗ nghỉ của bạn là:</label>
                                                {/* <p>Hãy thu hút khách hàng bằng cách đặt tiêu đề chỗ nghỉ của bạn trở nên đặc biệt.</p> */}
                                                <textarea
                                                    type="text"
                                                    placeholder="Listing title"
                                                    {...formik.getFieldProps('title')}
                                                    style={{ resize: 'none', minHeight: '120px', marginBottom: '5px' }}
                                                />
                                                <label className='custom_form_label' style={{ color: formik.errors.title ? 'red' : '' }}>{formik.values.title.length}/50</label>
                                            </div>

                                            <div className="col-md-12 mt-3">
                                                <label className='custom_form_label'>Mô tả:</label>
                                                {/* <p>Chia sẻ với khách hàng một vài thông tin ngắn gọn và nổi bật về chỗ nghỉ này của bạn.</p> */}

                                                <CKEditor

                                                    editor={ClassicEditor}
                                                    data={description == null ? '' : `${description}`}
                                                    onReady={editor => {
                                                        console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
                                                        console.log({ event, editor, data });
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <FooterHost
                                    loading={loading}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    hiddenBackButton={false}
                                    isHandleClick={true}
                                    now={percent}
                                />

                            </form>
                        )}
                    </Formik>
                </div>
                <RightSide />
            </div>
        </CommonAddListing>
    );
}

export default AddName;

const RightSide = ((props) => {
    return (
        <div className='col-4 k-right-side'>
            <div className='k-property-content'>
                <h5>Title</h5>
                <p>Hãy thu hút khách hàng bằng cách đặt tiêu đề chỗ nghỉ của bạn trở nên đặc biệt.</p>
            </div>
            <div className='k-property-content' style={{ top: '280px' }}>
                <h5>Description</h5>
                <p>Chia sẻ với khách hàng một vài thông tin ngắn gọn và nổi bật về chỗ nghỉ này của bạn.</p>
            </div>
        </div>
    )
})