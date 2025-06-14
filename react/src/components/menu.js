import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [likedFoods, setLikedFoods] = useState(new Set());
  const navigate = useNavigate();

  const fetchFoods = () => {
    axios.get('http://127.0.0.1:10520/api/user/getFoods')
      .then(res => {
        setFoods(res.data);
        setFilteredFoods(res.data);
      })
      .catch(err => console.error('Не удалось получить меню', err));
  };

  const fetchLikedFoods = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const res = await axios.get(`http://127.0.0.1:10520/api/user/getLikedFoods?email=${user.email}`);
        const likedIds = new Set(res.data.map(food => food.id));
        setLikedFoods(likedIds);
      }
    } catch (err) {
      console.error('Не удалось получить избранные блюда', err);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchLikedFoods();
  }, []);

  useEffect(() => {
    const filtered = foods.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [searchTerm, foods]);

  const handleLike = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }
      if (likedFoods.has(id)) {
        alert('您已经喜欢过这道菜了');
        return;
      }
      const response = await axios.post('http://127.0.0.1:10520/api/user/likeFood', { 
        id,
        email: user.email 
      });
      if (response.data.success) {
        setLikedFoods(prev => new Set([...prev, id]));
        fetchFoods();
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('您已经喜欢过这道菜了');
      } else {
        console.error('Ошибка при попытке поставить лайк', err);
      }
    }
  };

  const handleCardClick = (id) => {
    navigate(`/food/${id}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary dark:text-white mb-12">Меню китайской кухни</h2>
        
        {/* 搜索栏 */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск блюд..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map(food => (
            <div
              key={food.id}
              onClick={() => handleCardClick(food.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border dark:border-gray-700 cursor-pointer transition hover:shadow-xl"
            >
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{food.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{food.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">👍 {food.likes} человек оценили</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(food.id);
                    }}
                    disabled={likedFoods.has(food.id)}
                    className={`text-sm ${likedFoods.has(food.id) ? 'text-gray-400 cursor-not-allowed' : 'text-secondary hover:underline'}`}
                  >
                    {likedFoods.has(food.id) ? '已喜欢' : 'Нравится'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
