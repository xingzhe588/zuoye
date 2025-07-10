import React from 'react';
import Image_Cat from '/src/assets/images/labubu.png';
import './index.css';
import { Link } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import { useTranslation } from 'react-i18next';

const MainPage = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="main-page">
      {/* 粒子点阵装饰 */}
      <div className="main-particles-decor">
        {Array.from({ length: 40 }).map((_, i) => {
          // 粒子大小和颜色分配（增强对比度）
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
          // 中部两侧粒子特殊定位
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
      {/* 顶部渐变分割线 */}
      <div className="main-gradient-divider"></div>
      {/* 页面角落发光点 */}
      <div className="main-corner-glow main-corner-glow-tl"></div>
      <div className="main-corner-glow main-corner-glow-br"></div>
      <div className="main-page-container">
        <div className="main-title-block">
          <div className="main-title-part">
            <div className='main-nft-market'>
              <span>{t('ai_art')}</span>
            </div>
            <div className='main-with-discounts'>
              <span>{t('revolution')}</span>
            </div>
            <div className="main-labubu-mobile">
              <img src={Image_Cat} alt="Cat" className="main-cat-logo-mobile" />
            </div>
            <div className='main-two-buttoms'>
              <div className="main-button-buy-nft-wrapper">
                <Link className='main-fix-link-buy' to={getNavigationValue('project-monday.create-nft')}>
                  <div className="main-button-buy-nft">
                    <span>{t('generate_art')}</span>
                  </div>
                </Link>
              </div>
              <div className="main-button-galery-wrapper">
                <Link className='main-fix-link' to={getNavigationValue('project-monday.collection')}>
                  <div className="main-button-galery">
                    <span>{t('explore')}</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className='main-text-about-nft'>
              <span>{t('main_page_description')}</span>
            </div>
          </div>
          <div className="main-logo">
            <img src={Image_Cat} alt="Cat" className="main-cat-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
