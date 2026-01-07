import React from 'react';

const MiddleAlign = ({children}) => {
    return (
        <div className='lg:mx-auto lg:max-w-7xl'>
            {children}
        </div>
    );
};

export default MiddleAlign;