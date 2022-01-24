import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading/Loading';
import BestCity from '../components/BestCity/BestCity';

Home.propTypes = {

};

function Home(props) {
    const loggedInUser = useSelector((state) => state.userSlice.current);
    const isLoggedIn = !!loggedInUser.id;
    const [loading, setLoading] = useState(false);

    const cities = [
        { name: 'Hà Nội', id: 1, thumb_url: 'https://cdn.luxstay.com/home/location/location_1_1559373089.png' },
        { name: 'Nha Trang', id: 2, thumb_url: 'https://i.ytimg.com/vi/dLQe4qEfVJw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVXufbLIXUKZ2teIzQPqbQhrXgRA' },
        { name: 'Vũng Tàu', id: 3, thumb_url: 'https://i.ytimg.com/vi/dLQe4qEfVJw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVXufbLIXUKZ2teIzQPqbQhrXgRA' },
        { name: 'Đà Lạt', id: 4, thumb_url: 'https://cdn.luxstay.com/home/location/location_4_1559786177.png' },
        { name: 'Đà Nẵng', id: 5, thumb_url: 'https://cdn.luxstay.com/home/location/location_5_1559786196.png' },
        { name: 'Hội An', id: 6, thumb_url: 'https://cdn.luxstay.com/home/location/location_5_1559786196.png' },
    ]

    return (
        <div>
            {loading && <Loading />}
            <div id="page">
                <Header
                    loggedInUser={loggedInUser}
                    isLoggedIn={isLoggedIn}
                />
            </div>
            <main>
                <BestCity
                    cities={cities}
                />
            </main>
        </div>
    );
}

export default Home;