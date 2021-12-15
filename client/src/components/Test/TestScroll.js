import { useRef } from "react";
import './styles.scss';

const ScrollDemo = () => {
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()
    // run this function from an event handler or an effect to execute scroll 

    return (
        <>
            <button className='div-scroll' onClick={executeScroll}> Click to scroll </button>
            <div ref={myRef} >Element to scroll to</div>
        </>
    )
}

export default ScrollDemo;