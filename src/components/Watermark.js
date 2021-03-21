import React from 'react';

const Watermark = ({ content, size }) => {
  return (
    <div className='flex justify-center absolute bottom-0 left-0 h-full w-full'>
      <div className='text-emerald-700 absolute bottom-0 text-opacity-20'
        style={{
          fontSize: `${size}vw`,
          lineHeight: `${size - 5}vw`,
          zIndex: '-1',
        }}>
          {content}
        </div>
    </div>
  );
};

export default Watermark;