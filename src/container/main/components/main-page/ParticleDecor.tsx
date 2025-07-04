import React from 'react';

const ParticleDecor: React.FC = () => {
  return (
    <div className="main-particles-decor">
      {Array.from({ length: 40 }).map((_, i) => {
        const sizes = [8, 10, 12, 14, 16, 18, 20, 22];
        const colors = [
          'radial-gradient(circle, #00eaff 0%, #1ef1f1 100%)',
          'radial-gradient(circle, #fff 0%, #b3e5fc 100%)',
          'radial-gradient(circle, #a084ee 0%, #7f53ac 100%)',
          'radial-gradient(circle, #1ef1f1 0%, #fff 100%)',
          'radial-gradient(circle, #7f53ac 0%, #fff 100%)',
          'radial-gradient(circle, #fff 0%, #00eaff 100%)',
          'radial-gradient(circle, #00eaff 0%, #fff 100%)',
          'radial-gradient(circle, #fff 0%, #7f53ac 100%)',
        ];
        const size = sizes[i % sizes.length];
        const color = colors[i % colors.length];
        let style: React.CSSProperties = { width: size, height: size, background: color };
        if (i === 32) style = { ...style, top: '40vh', left: '2vw' };
        if (i === 33) style = { ...style, top: '60vh', right: '2vw' };
        if (i === 34) style = { ...style, top: '50vh', left: '5vw' };
        if (i === 35) style = { ...style, top: '50vh', right: '5vw' };
        if (i === 36) style = { ...style, top: '45vh', left: '8vw' };
        if (i === 37) style = { ...style, top: '55vh', right: '8vw' };
        return (
          <span
            key={i}
            className={`main-particle main-particle-${i}`}
            style={style}
          ></span>
        );
      })}
    </div>
  );
};

export default ParticleDecor; 