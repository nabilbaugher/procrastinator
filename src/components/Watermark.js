import React from 'react';

const Watermark = ({ content, size }) => {
  return (
    <>
      <div style={{ textAlign: 'justify' }} />
      <div className='watermark' style={{
          display: 'inline-block',
          width: '100%',
          fontSize: `${size}vmin`,
          lineHeight: `${size}vmin`,
          position: 'absolute',
          bottom: '0',
          left: '0',
          zIndex: '-1',
        }}>
          {content}
        </div>
    </>
  );
};

export default Watermark;