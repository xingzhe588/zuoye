import React from 'react';
import Image_Cat from '/src/assets/images/labubu.png';
import './index.css';
import { Link } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';

const MainPage = (): React.ReactElement => (
  <div className="main-page">
    <div className="main-page-container">
      <div className="main-title-block">
        <div className="main-title-part">
          <div className='main-nft-market'>
            <span>AI ART</span>
          </div>
          <div className='main-with-discounts'>
            <span>REVOLUTION</span>
          </div>
          <div className='main-two-buttoms'>
            <div className="main-button-buy-nft-wrapper">
              <Link className='main-fix-link-buy' to={getNavigationValue('project-monday.create-nft')}>
                <div className="main-button-buy-nft">
                  <span>Generate Art</span>
                </div>
              </Link>
            </div>
            <div className="main-button-galery-wrapper">
              <Link className='main-fix-link' to={getNavigationValue('project-monday.collection')}>
                <div className="main-button-galery">
                  <span>Explore</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='main-text-about-nft'>
            <span>ArtVision is a revolutionary platform that uses AI to create unique <br />
              digital art pieces. Explore our gallery of AI-generated masterpieces <br />
              or create your own custom artwork with our state-of-the-art technology.</span>
          </div>
        </div>
        <div className="main-logo">
          <img src={Image_Cat} alt="Cat" className="main-cat-logo" />
        </div>
      </div>
    </div>
  </div>
);

export default MainPage;
