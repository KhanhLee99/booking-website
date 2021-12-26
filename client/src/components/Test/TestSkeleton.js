import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

TestSkeleton.propTypes = {

};

function TestSkeleton(props) {
    return (
        // <div>
        //     <Skeleton /> // Simple, single-line loading skeleton
        //     <Skeleton count={5} /> // Five-line loading skeleton
        // </div>
        <SkeletonTheme baseColor="#202020" highlightColor="#f5f5f5">
            <p>
                <Skeleton count={3} />
            </p>
        </SkeletonTheme>
    );
}

export default TestSkeleton;