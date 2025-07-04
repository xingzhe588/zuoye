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
      {/* 主题切换按钮，右上角浮动 */}
      <button
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          zIndex: 10,
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          border: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #1ef1f188',
          transition: 'background 0.2s, color 0.2s',
        }}
        onClick={() => {
          const body = document.body;
          if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
          } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
          }
        }}
      >
        🌓 主题切换
      </button>
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
      {/* 平台亮点区块 */}
      <div className="main-features-block">
        <div className="main-feature-item">
          <span className="main-feature-icon" role="img" aria-label="AI">🤖</span>
          <div className="main-feature-title">AI驱动</div>
          <div className="main-feature-desc">智能算法生成独特艺术作品</div>
        </div>
        <div className="main-feature-item">
          <span className="main-feature-icon" role="img" aria-label="Speed">⚡</span>
          <div className="main-feature-title">高效创作</div>
          <div className="main-feature-desc">一键生成，快速体验创作乐趣</div>
        </div>
        <div className="main-feature-item">
          <span className="main-feature-icon" role="img" aria-label="Device">📱</span>
          <div className="main-feature-title">多端适配</div>
          <div className="main-feature-desc">支持手机、平板和PC，随时随地创作</div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
