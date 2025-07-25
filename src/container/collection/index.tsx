import React, { useState, useEffect } from 'react';

import './index.css';
import { useTranslation } from 'react-i18next';

import PixelMen from '/src/assets/images/PixelMan.png';
import HarmonyJapan from '/src/assets/images/HarmonyJapan.png';
import NatureCity from '/src/assets/images/NatureCity.png';

const Collection = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  
  const collections = [
    {
      id: '001',
      name: t('pixel_man'),
      author: 'Александр',
      price: '12 000 ₽',
      category: 'pixel_art',
      img: PixelMen
    },
    {
      id: '002',
      name: t('harmony_japan'),
      author: 'Мария',
      price: '18 500 ₽',
      category: 'japanese_style',
      img: HarmonyJapan
    },
    {
      id: '003',
      name: t('nature_city'),
      author: 'Дмитрий',
      price: '15 000 ₽',
      category: 'city_and_nature',
      img: NatureCity
    }
  ];

  const categoryKeys = ['all', 'pixel_art', 'japanese_style', 'city_and_nature'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const filtered = selectedCategory === 'all'
    ? collections
    : collections.filter(item => item.category === selectedCategory);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paged = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (main) main.focus();
  }, []);
  return(
    <main className='collection-page-first' tabIndex={-1} id="main-content">
      {/* 背景装饰元素 */}
      <div className="collection-bg-decor">
        <div className="collection-bg-blur collection-bg-blur1"></div>
        <div className="collection-bg-blur collection-bg-blur2"></div>
        <div className="collection-bg-blur collection-bg-blur3"></div>
        <div className="collection-bg-particle p1"></div>
        <div className="collection-bg-particle p2"></div>
        <div className="collection-bg-particle p3"></div>
        <div className="collection-bg-particle p4"></div>
        <div className="collection-bg-particle p5"></div>
      </div>
      <nav className="collection-category-bar" role="tablist" aria-label={t('category') || 'Category'}>
        {categoryKeys.map(key => (
          <button
            key={key}
            className={`collection-category-btn${selectedCategory === key ? ' active' : ''}`}
            onClick={() => {
              setSelectedCategory(key);
              setCurrentPage(1);
            }}
            role="tab"
            aria-selected={selectedCategory === key}
            aria-label={`筛选：${t(key)}`}
            tabIndex={0}
          >
            {t(key)}
          </button>
        ))}
      </nav>
      <div className="collection-app">
        <header className="collection-app-header">
          <div className="collection-icons">
            {paged.map(item => (
              <div
                className="collection-icon"
                key={item.id}
                tabIndex={0}
                role="button"
                aria-label={`查看作品：${item.name}`}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
              >
                <img src={item.img} alt={`像素艺术作品：${item.name}`} />
                <div className="collection-info">
                  <h2 className="collection-name">{item.name}</h2>
                  <div className="collection-meta">
                    <span>{t('author')} {item.author}</span>
                    <span className="collection-id">{t('number')} {item.id}</span>
                    <span>{t('price')} {item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>
        {/* 分页选项 */}
        <div className="collection-pagination" style={{margin: '32px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label={t('prev') || 'Previous page'}
            style={{padding: '6px 16px', borderRadius: 8, border: 'none', background: '#e0e7ef', color: '#232946', fontWeight: 700, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}
          >{t('prev')}</button>
          {Array.from({length: totalPages}).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i+1)}
              aria-label={`第${i+1}页`}
              style={{padding: '6px 12px', borderRadius: 8, border: 'none', background: currentPage === i+1 ? '#1ef1f1' : '#e0e7ef', color: currentPage === i+1 ? '#232946' : '#23294688', fontWeight: 800, margin: '0 2px', cursor: 'pointer'}}
            >{i+1}</button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label={t('next') || 'Next page'}
            style={{padding: '6px 16px', borderRadius: 8, border: 'none', background: '#e0e7ef', color: '#232946', fontWeight: 700, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'}}
          >{t('next')}</button>
        </div>
      </div>
    </main>
  );
};

export default Collection;