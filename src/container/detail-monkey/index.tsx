import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const DetailPageMonkey = (): React.ReactElement => {
  // const { id } = useParams();
  return (
    <div className="detail-block">
      <div className="detail-my-class"></div>
      <div className="detail-block-1">
        <div className="detail-icons">
          <div className="detail-monkeypng"></div>
          </div>
        <div className="detail-details">
          <div className="detail-detail">Детали</div>
          <div className="detail-string">
            <div className="detail-padd">Создатель:</div>
            <div className="detail-padd">8PC</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">Владелец:</div>
            <div className="detail-padd">8PC</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">Сеть:</div>
            <div className="detail-padd">BNB Chain</div>
          </div>
          <div className="detail-string">
            <div className="detail-padd">ID токена:</div>
            <div className="detail-padd">1300000000815</div>
          </div>
        </div>
      </div>
      <div className="detail-block-2">
        <div className="detail-profile-description">
          <div className="detail-cyberpunk">Cyberpunk edition</div>
          <div className="detail-bibop">The Daddy Monkey</div>
          <div className="detail-price">Цена:</div>
          <div className="detail-bibop">13 &#8381;</div>
          <div className="detail-price">Предложения</div>
          <table className="detail-table">
            <tr>
              <th>Из</th>
              <th>Срок действия</th>
              <th>Цена предложения</th>
            </tr>
            <tr>
              <td>Anonymous_25</td>
              <td>In 4 Days</td>
              <td>1.3 &#8381;</td>
            </tr>
            <tr>
              <td>Paradise</td>
              <td>In 1 Days</td>
              <td>1.44 &#8381;</td>
            </tr>
          </table>
        </div>
        <div className="detail-buttons">
        <Link className='main-fix-link-buy' to={'*'}>
          <button className = "detail-button">Купить сейчас</button>
        </Link>
        <Link className='main-fix-link-buy' to={'*'}>
          <button className = "detail-button">Предложить цену</button>
        </Link>
        </div>
      </div> 
    </div>
  );
};

export default DetailPageMonkey;