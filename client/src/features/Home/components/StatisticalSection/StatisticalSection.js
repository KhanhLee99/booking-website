import React from 'react';
import PropTypes from 'prop-types';
import './StatisticalSection.scss';

StatisticalSection.propTypes = {

};

function StatisticalSection(props) {
    return (
        <section className="parallax-section small-par" data-scrollax-parent="true">
            <div className="bg par-elem " data-bg="images/bg/1.jpg" data-scrollax="properties: { translateY: '30%' }" />
            <div className="overlay  op7" />
            <div className="container">
                <div className=" single-facts single-facts_2 fl-wrap">
                    <StatisticalItem />
                    <StatisticalItem />
                    <StatisticalItem />
                    <StatisticalItem />
                </div>
            </div>
        </section>
    );
}

export default StatisticalSection;

function StatisticalItem(props) {
    return (
        <div className="inline-facts-wrap">
            <div className="inline-facts">
                <div className="milestone-counter">
                    <div className="stats animaper">
                        <div className="num" data-content={0} data-num={732}>732</div>
                    </div>
                </div>
                <h6>New Listing Every Week</h6>
            </div>
        </div>
    )
}