import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import HeroSingle from '../components/HeroSingle';
import LoginPopup from '../../../components/LoginPopup';
import { useSelector } from 'react-redux';

Home.propTypes = {

};

function Home(props) {
    const [triggerPopup, setTriggerPopup] = useState(false);
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;

    return (
        <>
            <div id="page">
                <Header
                    loggedInUser={loggedInUser}
                    isLoggedIn={isLoggedIn}
                    setTriggerPopup={setTriggerPopup}
                />
            </div>
            <main>
                <HeroSingle />
            </main>
            <LoginPopup
                trigger={triggerPopup}
                setTriggerPopup={setTriggerPopup}
            />
        </>
    );
}

export default Home;