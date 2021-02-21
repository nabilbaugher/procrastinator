import React from 'react';

const Watermark = ({ content, size }) => {
  return (
    <>
      <div style={{ textAlign: 'justify' }} />
      <div style={{
          display: 'inline-block',
          width: '100%',
          fontSize: `${size}vmin`,
          lineHeight: `${size}vmin`,
          // fontSize: '60vmin',
          // lineHeight: '60vmin',
          color: '#f1f1f1',
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