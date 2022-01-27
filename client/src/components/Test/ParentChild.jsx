import React from 'react';
import PropTypes from 'prop-types';

function Parent({ children }) {
    function doSomething(value) {
        console.log("doSomething called by child with value:", value);
    }

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { doSomething });
        }
        return child;
    });

    return <div>{childrenWithProps}</div>
}

export default Parent;

const Child = ({ doSomething, value }) => (
    <button onClick={() => doSomething(value)}>Click Me</button>
);

export function ParentChild(props) {
    return (
        <Parent>
            <Child value={1} />
            <Child value={2} />
        </Parent>
    )
}