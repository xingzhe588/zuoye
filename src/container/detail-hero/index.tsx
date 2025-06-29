import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';

import './index.css';

const DetailPageHero = (): React.ReactElement => {
  // const { id } = useParams();
  return (
    <div className="detail-block">
      <div className="detail-my-class"></div>
      <div className="detail-block-1">
        <div className="detail-icons">
          <div className='detail-heropng'></div>
          </div>
        <div className="detail-details">
          <div className="detail-detail">Детали</div>
          <div className="detail-string">
            <div className="detail-padd">Создатель:</div>
            <div className="detail-padd">GrandMenu</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">Владелец:</div>
            <div className="detail-padd">Kolobok2.0</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">Сеть:</div>
            <div className="detail-padd">BNB Chain</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">ID токена:</div>
            <div className="detail-padd">1300000000835</div>
          </div>
        </div>
      </div>
      <div className="detail-block-2">
        <div className="detail-profile-description">
          <div className="detail-cyberpunk">Теннисная серия</div>
          <div className="detail-bibop">Чемпион Уимблдона</div>
          <div className="detail-price">Цена:</div>
          <div className="detail-bibop">18 ₽</div>
          <div className="detail-price">История ставок</div>
          <table className="detail-table">
            <tr>
              <th>Из</th>
              <th>Срок действия</th>
              <th>Цена предложения</th>
            </tr>
            <tr>
              <td>Binana</td>
              <td>In 3 Days</td>
              <td>1.9 &#8381;</td>
            </tr>
          </table>
        </div>
        <div className="detail-buttons">
          <Link className='main-fix-link-buy' to={getNavigationValue('project-monday.buy')}>
            <button className = "detail-button">Купить сейчас</button>
          </Link>
          <Link className='main-fix-link-buy' to={getNavigationValue('project-monday.bid')}>
            <button className = "detail-button">Сделать ставку</button>
          </Link>
        </div>
      </div> 
    </div>
  );
};

export default DetailPageHero;