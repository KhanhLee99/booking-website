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
                                    <h3 className='h3_title'>Ti??u ????? v?? m?? t???</h3>
                                    <div className="add-listing-section">
                                        <div className="row with-forms">
                                            <div className="col-md-12">
                                                <label className='custom_form_label'>T??n ch??? ngh??? c???a b???n l??:</label>
                                                {/* <p>H??y thu h??t kh??ch h??ng b???ng c??ch ?????t ti??u ????? ch??? ngh??? c???a b???n tr??? n??n ?????c bi???t.</p> */}
                                                <textarea
                                                    type="text"
                                                    placeholder="Listing title"
                                                    {...formik.getFieldProps('title')}
                                                    style={{ resize: 'none', minHeight: '120px', marginBottom: '5px' }}
                                                />
                                                <label className='custom_form_label' style={{ color: formik.errors.title ? 'red' : '' }}>{formik.values.title.length}/50</label>
                                            </div>

                                            <div className="col-md-12 mt-3">
                                                <label className='custom_form_label'>M?? t???:</label>
                                                {/* <p>Chia s??? v???i kh??ch h??ng m???t v??i th??ng tin ng???n g???n v?? n???i b???t v??? ch??? ngh??? n??y c???a b???n.</p> */}

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
                <p>H??y thu h??t kh??ch h??ng b???ng c??ch ?????t ti??u ????? ch??? ngh??? c???a b???n tr??? n??n ?????c bi???t.</p>
            </div>
            <div className='k-property-content' style={{ top: '280px' }}>
                <h5>Description</h5>
                <p>Chia s??? v???i kh??ch h??ng m???t v??i th??ng tin ng???n g???n v?? n???i b???t v??? ch??? ngh??? n??y c???a b???n.</p>
            </div>
        </div>
    )
})