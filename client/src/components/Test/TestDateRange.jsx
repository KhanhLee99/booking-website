import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';



TestDateRange.propTypes = {

};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function TestDateRange(props) {
    const [dates, setDates] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        return tooEarly || tooLate;
    };
    return (
        <Space direction="vertical" size={12}>
            <RangePicker
                disabledDate={disabledDate}
                disabled={[false, false]}
            />
        </Space>

    );
}

export default TestDateRange;