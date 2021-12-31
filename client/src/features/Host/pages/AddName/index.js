import React, { useState } from 'react';
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

AddName.propTypes = {

};

const disable_resize = {
    resize: 'none'
}

function AddName(props) {
    const [des, setDes] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const handleNext = async (values) => {
        try {
            console.log(values);
            const params = {
                name: values.title,
                description: des
            }
            setLoading(true);
            await hostApi.updateListing(params, id).then(res => {
                setLoading(false);
                if (res.data.status == 'success') {
                    history.push(`/host/${id}/price`);
                }
            });
        } catch (err) {
            console.log(err.message);
            setLoading(false)
        }
    }

    const handleBack = () => {

    }

    return (
        <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={Yup.object({
                title: Yup.string()
                    // .max(15, 'Must be 15 characters or less')
                    .required('Required'),

                // description: Yup.string()
                //     .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                handleNext(values);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <div className='k-wrap'>
                        <div className='k-header'></div>
                        <div className='k-content'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-8 k-left-side'>
                                        <div id="add-listing">
                                            {/* Section */}
                                            <div className="add-listing-section">
                                                {/* Headline */}
                                                <div className="add-listing-headline">
                                                    <h3><i className="sl sl-icon-doc" />Tiêu đề và mô tả</h3>
                                                </div>
                                                {/* Title */}

                                                <div className="row with-forms">
                                                    <div className="col-md-12">
                                                        <h5>Tên chỗ nghỉ của bạn là:</h5>
                                                        <p>Hãy thu hút khách hàng bằng cách đặt tiêu đề chỗ nghỉ của bạn trở nên đặc biệt.</p>
                                                        <input
                                                            type="text"
                                                            placeholder="Listing title"
                                                            {...formik.getFieldProps('title')}
                                                        />
                                                    </div>

                                                    <div className="col-md-12">
                                                        <h5>Mô tả</h5>
                                                        <p>Chia sẻ với khách hàng một vài thông tin ngắn gọn và nổi bật về chỗ nghỉ này của bạn.</p>
                                                        {/* <textarea
                                                            placeholder='Description'
                                                            style={disable_resize}
                                                            {...formik.getFieldProps('description')}
                                                            value={des}
                                                        /> */}

                                                        <CKEditor

                                                            editor={ClassicEditor}
                                                            // data="<p>Hello from CKEditor 5!</p>"
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setDes(data);
                                                                console.log({ event, editor, data });
                                                            }}
                                                            onBlur={(event, editor) => {
                                                                console.log('Blur.', editor);
                                                            }}
                                                            onFocus={(event, editor) => {
                                                                console.log('Focus.', editor);
                                                            }}
                                                        />



                                                        {/* <Popup trigger={<button> Trigger</button>}
                                                            position="center"
                                                            modal
                                                            nested
                                                            closeOnDocumentClick
                                                            className='popup-content'
                                                        >
                                                            <div><CKEditor

                                                                editor={ClassicEditor}
                                                                // data="<p>Hello from CKEditor 5!</p>"
                                                                onReady={editor => {
                                                                    // You can store the "editor" and use when it is needed.
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    setDes(data);
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
                                                        </Popup> */}
                                                    </div>
                                                </div>



                                                {/* Row / End */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <FooterHost
                            loading={loading}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            hiddenBackButton={false}
                            isHandleClick={false}
                        />

                    </div>
                </form>
            )}


        </Formik>
    );
}

export default AddName;