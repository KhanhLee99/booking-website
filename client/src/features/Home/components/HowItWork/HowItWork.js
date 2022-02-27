import React from 'react';
import PropTypes from 'prop-types';
import './HowItWork.scss';

HowItWork.propTypes = {

};

function HowItWork(props) {
    return (
        <section data-scrollax-parent="true" className='gray-bg particles-wrapper' style={{ textAlign: 'center' }}>
            <div className="container">
                <div className="section-title">
                    <h2>How it works</h2>
                    <div className="section-subtitle">Discover &amp; Connect </div>
                    <span className="section-separator" />
                    <p>Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit
                        risus at metus.</p>
                </div>
                <div className="process-wrap fl-wrap">
                    <ul className="no-list-style">
                        <Item
                            title={'Find Interesting Place'}
                            icon={'fal fa-map-marker-alt'}
                            number={'01'}
                        />
                        <Item
                            title={'Contact a Few Owners'}
                            icon={'fal fa-mail-bulk'}
                            number={'02'}
                        />
                        <Item
                            title={'Make a Listing'}
                            icon={'fal fa-layer-plus'}
                            number={'03'}
                        />
                        {/* <li>
                            <div className="process-item">
                                <span className="process-count">01 </span>
                                <div className="time-line-icon"><i className="fal fa-map-marker-alt" /></div>
                                <h4> Find Interesting Place</h4>
                                <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus
                                    tellus ut, convallis eros sollicitudin turpis.</p>
                            </div>
                            <span className="pr-dec" />
                        </li>
                        <li>
                            <div className="process-item">
                                <span className="process-count">02</span>
                                <div className="time-line-icon"><i className="fal fa-mail-bulk" /></div>
                                <h4> Contact a Few Owners</h4>
                                <p>Faucibus ante, in porttitor tellus blandit et. Phasellus tincidunt metus
                                    lectus sollicitudin feugiat pharetra consectetur.</p>
                            </div>
                            <span className="pr-dec" />
                        </li>
                        <li>
                            <div className="process-item">
                                <span className="process-count">03</span>
                                <div className="time-line-icon"><i className="fal fa-layer-plus" /></div>
                                <h4> Make a Listing</h4>
                                <p>Maecenas pulvinar, risus in facilisis dignissim, quam nisi hendrerit nulla,
                                    id vestibulum metus nullam viverra porta.</p>
                            </div>
                        </li> */}
                    </ul>
                    {/* <div className="process-end"><i className="fal fa-check" /></div> */}
                </div>
            </div>
        </section>

    );
}

export default HowItWork;

function Item(props) {
    const { title, icon, number } = props;
    return (
        <li>
            <div className="process-item">
                <span className="process-count">{number}</span>
                <div className="time-line-icon"><i className={icon} /></div>
                <h4>{title}</h4>
                <p>Maecenas pulvinar, risus in facilisis dignissim, quam nisi hendrerit nulla,
                    id vestibulum metus nullam viverra porta.</p>
            </div>
        </li>
    )
}