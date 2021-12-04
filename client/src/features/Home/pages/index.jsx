import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import HeroSingle from '../components/HeroSingle';
import LoginPopup from '../../../components/LoginPopup';

Home.propTypes = {

};

function Home(props) {
    return (
        <>
            <div id="page">
                <Header />
            </div>
            <main>
                <HeroSingle />
            </main>
            <LoginPopup />
        </>
    );
}

export default Home;