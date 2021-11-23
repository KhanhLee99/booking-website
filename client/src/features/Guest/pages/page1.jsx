import React from "react";
import A from "../components/A";
import B from "../components/B";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../guestSlice";

function Page1(props) {
    const guests = useSelector(state => state.abc);
    const dispatch = useDispatch();

    const handleClick = () => {
        const action = addGuest('1');
        dispatch(action);
        console.log(guests);
    }

    return (
        <>
            <button onClick={() => handleClick()}>click</button>
            <A/>
            <B/>
        </>
    );
}

export default Page1;