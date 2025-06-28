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
      <div className="main-page-container">
        <div className="main-title-block">
          <div className="main-title-part">
            <div className='main-nft-market'>
              <span>{t('ai_art')}</span>
            </div>
            <div className='main-with-discounts'>
              <span>{t('revolution')}</span>
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
