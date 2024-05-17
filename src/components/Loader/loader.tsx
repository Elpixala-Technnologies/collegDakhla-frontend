import React from 'react';

const Spinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    position: 'relative',
    width: '50px',
    height: '50px',
  };

  const divStyle = (rotation: number, delay: number): React.CSSProperties => ({
    position: 'absolute',
    width: '15%',
    height: '45%',
    backgroundColor: '#BDBDBD',
    transformOrigin: '50% 50%',
    transform: `rotate(${rotation}deg) translateY(150%)`,
    animation: `spinner-animation 1s ${delay}s infinite ease`,
  });

  const keyframes = `
    @keyframes spinner-animation {
      0%, 100% {
        transform: rotate(var(--rotation)) translateY(150%);
      }
      50% {
        transform: rotate(var(--rotation)) translateY(225%);
      }
    }
  `;

  const divs = Array.from({ length: 10 }).map((_, i) => {
    const delay = (i + 1) * 0.1;
    const rotation = (i + 1) * 36;
    return <div key={i} style={{ ...divStyle(rotation, delay), '--rotation': `${rotation}deg` } as React.CSSProperties}></div>;
  });

  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle}>{divs}</div>
    </>
  );
};

export default Spinner;
