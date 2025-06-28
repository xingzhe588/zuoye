import React, { useState } from 'react';

import './index.css';

import PixelMen from '/src/assets/images/PixelMan.png';
import HarmonyJapan from '/src/assets/images/HarmonyJapan.png';
import NatureCity from '/src/assets/images/NatureCity.png';

const collections = [
  {
    id: '001',
    name: 'Пиксельный человек',
    author: 'Александр',
    price: '12 000 ₽',
    category: 'Пиксель-арт',
    img: PixelMen
  },
  {
    id: '002',
    name: 'Гармония Японии',
    author: 'Мария',
    price: '18 500 ₽',
    category: 'Японский стиль',
    img: HarmonyJapan
  },
  {
    id: '003',
    name: 'Город природы',
    author: 'Дмитрий',
    price: '15 000 ₽',
    category: 'Город и природа',
    img: NatureCity
  }
];

const categories = ['Все', 'Пиксель-арт', 'Японский стиль', 'Город и природа'];

const Collection = (): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const filtered = selectedCategory === 'Все' ? collections : collections.filter(item => item.category === selectedCategory);

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
                    <span>Автор: {item.author}</span>
                    <span>№ {item.id}</span>
                    <span>Цена: {item.price}</span>
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