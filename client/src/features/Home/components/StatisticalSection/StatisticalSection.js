import React from 'react';
import PropTypes from 'prop-types';
import './StatisticalSection.scss';
import CountUp from 'react-countup';

StatisticalSection.propTypes = {

};

function StatisticalSection(props) {
    return (
        <section className="parallax-section small-par" data-scrollax-parent="true">
            <div className="bg par-elem " data-bg="images/bg/1.jpg" data-scrollax="properties: { translateY: '30%' }" />
            <div className="overlay  op7" />
            <div className="container">
                <div className=" single-facts single-facts_2 fl-wrap">
                    <StatisticalItem
                        number={1254}
                        title={'New Visiters Every Week'}
                    />
                    <StatisticalItem
                        number={12168}
                        title={'Happy customers every year'}
                    />
                    <StatisticalItem
                        number={2172}
                        title={'New Listing Every Week'}
                    />
                    <StatisticalItem
                        number={132}
                        title={'New Host Every Month'}
                    />
                </div>
            </div>
        </section>
    );
}

export default StatisticalSection;

function StatisticalItem(props) {
    const { number, title } = props;
    return (
        <div className="inline-facts-wrap">
            <div className="inline-facts">
                <div className="milestone-counter">
                    <div className="stats animaper">
                        <div className="num" data-content={0} data-num={732}>
                            <CountUp
                                start={0}
                                end={number}
                                className="num"
                                duration={1}
                            />
                        </div>
                    </div>
                </div>
                <h6>{title}</h6>
            </div>
        </div>
    )
}