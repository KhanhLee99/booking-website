import React from 'react';
import PropTypes from 'prop-types';
import HostingSkeletonItem from './HostingSkeletonItem';

HostingSkeleton.propTypes = {
    
};

function HostingSkeleton(props) {
    return (
        <>
           <HostingSkeletonItem /> 
           <HostingSkeletonItem /> 
           <HostingSkeletonItem /> 
           <HostingSkeletonItem /> 
           <HostingSkeletonItem /> 
        </>
    );
}

export default HostingSkeleton;