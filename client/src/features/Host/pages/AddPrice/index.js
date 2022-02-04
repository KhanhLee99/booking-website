import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import FooterHost from '../../components/FooterHost';
import hostApi from '../../../../api/hostApi';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loading from '../../../../components/Loading/Loading';
import CommonAddListing from '../../../../components/CommonAddListing/CommonAddListing';
import TabAddListing from '../../components/TabAddListing/TabAddListing';

AddPrice.propTypes = {

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

function AddPrice(props) {

    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(100 / 3);

    const handleNext = async (values) => {
        try {
            // console.log(values);
            const params = {
                price_per_night_base: values.price_base,
                price_per_night_weekend: values.price_weekend,
                discount_weekly: values.discount_week,
                discount_monthly: values.discount_month,
                is_public: 0
            }
            setLoading(true);
            await hostApi.updateListing(params, id);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }
    }

    const handleBack = () => {
        history.push(`/become-host/${id}/title`);
    }
    useEffect(() => {
        setPercent(100 / 2);
    }, []);
    return (
        <CommonAddListing>
            <TabAddListing
                id={id}
                pricing={true}
            />
            <div className='row'>
                {loading && <Loading />}
                <div className='col-8'>
                    <Formik
                        initialValues={{ price_base: '', price_weekend: '', discount_week: '', discount_month: '' }}
                        validationSchema={Yup.object({
                            price_base: Yup.string()
                                .required('Required'),
                            price_weekend: Yup.string()
                                .required('Required'),

                            discount_week: Yup.string()
                                .required('Required'),
                            discount_month: Yup.string()
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            handleNext(values);
                        }}
                    >
                        {formik => {
                            const { values, errors, touched, isSubmitting } = formik;
                            console.log({ values, errors, touched })
                            return (
                                <form onSubmit={formik.handleSubmit}>
                                    <div id="add-listing">
                                        <h3 className='h3_title'>Chính sách giá</h3>
                                        <div className="add-listing-section">
                                            <div className="row with-forms">
                                                <div className="col-md-12">
                                                    <label className='custom_form_label'>Tiền tệ</label>

                                                    <select className="k-dropdown" disabled>
                                                        <option>VND</option>
                                                        <option>USA</option>
                                                    </select>

                                                    <label className='custom_form_label'>Phí sử dụng nền tảng</label>
                                                    {/* <h5 className="margin-top-30 margin-bottom-10">Phí sử dụng nền tảng</h5> */}
                                                    <p>Với mỗi lượt đặt chỗ thành công, hệ thống sẽ thu phí dịch vụ 3% trên doanh thu từ chỗ nghỉ.</p>

                                                    <label className='custom_form_label'>Giá cơ bản</label>

                                                    <label className='custom_form_label'>THỨ 2 - THỨ 5</label>

                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            {...formik.getFieldProps('price_base')}
                                                            style={custom_form_input}
                                                            className='custom_form_input'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className='custom_form_label'>Bạn sẽ nhận 155,307 ₫/đêm</label>
                                                    </div>

                                                    <label className='custom_form_label'>THỨ 6 - CHỦ NHẬT</label>

                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            {...formik.getFieldProps('price_weekend')}
                                                            style={custom_form_input}
                                                            className='custom_form_input'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className='custom_form_label'>Bạn sẽ nhận 155,307 ₫/đêm</label>
                                                    </div>

                                                    <label className='custom_form_label'>Giá dài hạn</label>

                                                    <div className="col-md-6">
                                                        <label className='custom_form_label'>GIẢM GIÁ THEO TUẦN</label>
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            {...formik.getFieldProps('discount_week')}
                                                            style={custom_form_input}
                                                            className='custom_form_input'
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className='custom_form_label'>GIẢM GIÁ THEO THÁNG</label>
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            {...formik.getFieldProps('discount_month')}
                                                            style={custom_form_input}
                                                            className='custom_form_input'
                                                        />
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
                                        isHandleClick={true}
                                        now={percent}
                                    />
                                </form>)
                        }}
                    </Formik>
                </div>
                <RightSide />
            </div>
        </CommonAddListing>
    );
}

export default AddPrice;

function RightSide(props) {
    const { type } = props;
    return (
        <div className='col-4 k-right-side'>
            <div className='k-property-content'>
                <h5>Text</h5>
                <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recent</p>
            </div>
        </div>
    )
}