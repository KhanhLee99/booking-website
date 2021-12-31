import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import FooterHost from '../../components/FooterHost';
import hostApi from '../../../../api/hostApi';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

AddPrice.propTypes = {

};

function AddPrice(props) {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

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

    }
    return (
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
                                                        <h3><i className="sl sl-icon-doc" />Chính sách giá</h3>
                                                    </div>
                                                    {/* Title */}

                                                    <div className="row with-forms">
                                                        <div className="col-md-12">
                                                            <h5>Tiền tệ</h5>
                                                            <select className="k-dropdown" disabled>
                                                                <option>VND</option>
                                                                <option>USA</option>
                                                            </select>
                                                        </div>

                                                        <h5 className="margin-top-30 margin-bottom-10">Phí sử dụng nền tảng</h5>
                                                        <p>Với mỗi lượt đặt chỗ thành công, hệ thống sẽ thu phí dịch vụ 3% trên doanh thu từ chỗ nghỉ.</p>
                                                    </div>



                                                    {/* Row / End */}
                                                </div>
                                            </div>

                                            <div id="add-listing">
                                                {/* Section */}
                                                <div className="add-listing-section">
                                                    {/* Headline */}
                                                    <div className="add-listing-headline">
                                                        <h3><i className="sl sl-icon-doc" />Thiết lập giá</h3>
                                                    </div>
                                                    {/* Title */}

                                                    <div className="row with-forms">
                                                        <div className="col-md-12">
                                                            <h5>Giá cơ bản</h5>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <h5>THỨ 2 - THỨ 5</h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <input
                                                                type="text"
                                                                placeholder=""
                                                                {...formik.getFieldProps('price_base')}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h5>Bạn sẽ nhận 155,307 ₫/đêm</h5>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <h5>THỨ 6 - CHỦ NHẬT</h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <input
                                                                type="text"
                                                                placeholder=""
                                                                {...formik.getFieldProps('price_weekend')}

                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h5>Bạn sẽ nhận 155,307 ₫/đêm</h5>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <h5>Giá dài hạn</h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h5>GIẢM GIÁ THEO TUẦN</h5>
                                                            <input
                                                                type="text"
                                                                placeholder=""
                                                                {...formik.getFieldProps('discount_week')}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <h5>GIẢM GIÁ THEO THÁNG</h5>
                                                            <input
                                                                type="text"
                                                                placeholder=""
                                                                {...formik.getFieldProps('discount_month')}
                                                            />
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
                    </form>)
            }}
        </Formik>

    );
}

export default AddPrice;