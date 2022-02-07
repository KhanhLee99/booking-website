import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import './NoData.scss';

NoData.propTypes = {
    description: PropTypes.string,
};

NoData.defaultProps = {
    description: 'No Data'
}

function NoData(props) {
    const { description } = props;
    return (
        <div className='nodata-box fl-wrap'>
            <Empty
                // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                // imageStyle={{
                //     height: 60,
                // }}
                description={
                    <span style={{
                        color: '#7d93b2',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}>
                        {description}
                    </span>
                }
            />
        </div>
    );
}

export default NoData;