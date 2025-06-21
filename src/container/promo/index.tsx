import React from 'react';

import './index.css';
import { Link } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';


import JDM from '/src/assets/images/JDM_pack.png';

const Promo = (): React.ReactElement => {
  return(
    <div className='promo-page-first'>
        <div className="promo-app">
        <header className="promo-app-header">
            <div className="promo-icons">
                <div className="promo-icon">
                    <img src={JDM} alt="NFT with Pixel Mans" />
                    <p>JDM pack</p>
                </div>
            </div>
            <div className='promo-answer-collections'>
                <p>Акции: </p>
            </div>
        </header>
        </div>
    </div>
    );
};

export default Promo;