import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import './styles.scss';

function NotFoundPage(props) {
    return (
        <>
            <Header />
            {/* <img style={{ width: 700, height: 700, margin: '0 auto', display: 'block'}} src="/image/404page.png"></img> */}
            <div id="wrapper-not-found-page">
                {/* content*/}
                <div className="content">
                    {/*  section  */}
                    <section className="parallax-section small-par" data-scrollax-parent="true" style={{ marginTop: 0 }}>
                        <div className="bg" data-bg="https://www.youtube.com/watch?v=zq0TuNqV0Ew&t=469s" data-scrollax="properties: { translateY: '30%' }" style={{}} />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                                <div className="bubbles">
                                    <h2>404</h2>
                                </div>
                                <p>We're sorry, but the Page you were looking for, couldn't be found.</p>
                                <div className="clearfix" />
                                <Link to="/" className="btn color2-bg" style={{ color: '#fff' }}>Back to Home Page<i className="far fa-home-alt" /></Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    );
}

export default NotFoundPage;

const bgStyle = {
    backgroundImage: 'url(https://www.youtube.com/watch?v=zq0TuNqV0Ew&t=469s)',
    transform: 'translateZ(0px) translateY(-3.14685%)',
}