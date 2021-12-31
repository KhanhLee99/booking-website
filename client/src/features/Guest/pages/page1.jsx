import React, { useEffect } from "react";
import A from "../components/A";
import B from "../components/B";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../app/reducer/guestSlice";
import testApi from "../../../api/testApi";
import Header from "../../../components/Header";

function Page1(props) {
    const guests = useSelector(state => state.abc.current);
    const dispatch = useDispatch();

    const handleLogout = () => {
        // await dispatch(logout().then(() => {
        //     console.log('current user after logout: ', guests);
        // }));
        dispatch(logout());
        console.log('current user after logout haha: ', guests);
    }

    useEffect(() => {
        console.log('current user: ', guests);
        const fetchData = async () => {
            try {
                const response = await testApi.getList();
                console.log(response.data.data);
            } catch (error) {
                console.log('failed to fetch product list: ', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <button onClick={() => handleLogout()}>logout</button>
            <Header/>
        </>
    );
}

export default Page1;