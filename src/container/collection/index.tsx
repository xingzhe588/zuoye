import React, { useState } from 'react';

import './index.css';
import { useTranslation } from 'react-i18next';

import PixelMen from '/src/assets/images/PixelMan.png';
import HarmonyJapan from '/src/assets/images/HarmonyJapan.png';
import NatureCity from '/src/assets/images/NatureCity.png';

const Collection = (): React.ReactElement => {
  const { t } = useTranslation();
  
  const collections = [
    {
      id: '001',
      name: t('pixel_man'),
      author: 'Александр',
      price: '12 000 ₽',
      category: t('pixel_art'),
      img: PixelMen
    },
    {
      id: '002',
      name: t('harmony_japan'),
      author: 'Мария',
      price: '18 500 ₽',
      category: t('japanese_style'),
      img: HarmonyJapan
    },
    {
      id: '003',
      name: t('nature_city'),
      author: 'Дмитрий',
      price: '15 000 ₽',
      category: t('city_and_nature'),
      img: NatureCity
    }
  ];

  const categories = [t('all'), t('pixel_art'), t('japanese_style'), t('city_and_nature')];
  
  const [selectedCategory, setSelectedCategory] = useState(t('all'));
  const filtered = selectedCategory === t('all') ? collections : collections.filter(item => item.category === selectedCategory);

  return(
    <div className='collection-page-first'>
      <div className="collection-category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`collection-category-btn${selectedCategory === cat ? ' active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="collection-app">
        <header className="collection-app-header">
          <div className="collection-icons">
            {filtered.map(item => (
              <div className="collection-icon" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="collection-info">
                  <div className="collection-name">{item.name}</div>
                  <div className="collection-meta">
                    <span>{t('author')} {item.author}</span>
                    <span>{t('number')} {item.id}</span>
                    <span>{t('price')} {item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Collection;