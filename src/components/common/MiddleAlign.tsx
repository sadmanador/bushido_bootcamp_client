import React, { ReactNode } from 'react';

interface MiddleAlignProps {
    children: ReactNode;
}

const MiddleAlign: React.FC<MiddleAlignProps> = ({ children }) => {
    return (
        <div className='lg:mx-auto lg:max-w-7xl'>
            {children}
        </div>
    );
};

export default MiddleAlign;