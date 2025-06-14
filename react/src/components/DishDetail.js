import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// 获取服务器端口
const getServerPort = async () => {
  try {
    // 尝试从 10520 开始，最多尝试 10 个端口
    for (let port = 10520; port < 10530; port++) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/test-image`);
        if (response.ok) {
          return port;
        }
      } catch (e) {
        continue;
      }
    }
    return 10520; // 默认端口
  } catch (e) {
    console.error('获取服务器端口失败:', e);
    return 10520; // 默认端口
  }
};

const DishDetail = () => {
  const { id } = useParams(); // 从 URL 中获取 id
  const [detail, setDetail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverPort, setServerPort] = useState(10520);

  useEffect(() => {
    // 获取服务器端口
    getServerPort().then(port => {
      console.log('使用服务器端口:', port);
      setServerPort(port);
    });
  }, []);

  useEffect(() => {
    if (!serverPort) return;

    setIsLoading(true);
    setImageError(false);
    // 获取菜品基本信息
    axios.get(`http://127.0.0.1:${serverPort}/api/user/getFoods`)
      .then(res => {
        const dish = res.data.find(item => item.id === parseInt(id));
        if (dish) {
          console.log('获取到的菜品信息:', dish); // 调试信息
          setName(dish.name);
          // 确保图片URL是完整的
          const imageUrl = dish.image.startsWith('http') 
            ? dish.image 
            : `http://127.0.0.1:${serverPort}${dish.image}`;
          console.log('构建的图片URL:', imageUrl); // 调试信息
          
          // 预加载图片
          const img = new Image();
          img.onload = () => {
            console.log('图片预加载成功:', imageUrl);
            setImage(imageUrl);
            setImageError(false);
          };
          img.onerror = (e) => {
            console.error('图片预加载失败:', imageUrl, e);
            setImageError(true);
          };
          img.src = imageUrl;
        } else {
          console.error('未找到菜品信息，ID:', id); // 调试信息
        }
      })
      .catch(err => {
        console.error('获取菜品信息失败', err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // 获取菜品详情
    axios.get(`http://127.0.0.1:${serverPort}/api/user/getFoodDetail?id=${id}`)
      .then(res => {
        setDetail(res.data.detail);
      })
      .catch(err => {
        console.error('获取详情失败', err);
      });
  }, [id, serverPort]);

  const handleImageError = (e) => {
    console.error('图片加载失败:', e.target.src); // 调试信息
    setImageError(true);
  };

  // 测试图片URL是否可访问
  useEffect(() => {
    if (image) {
      console.log('开始测试图片URL:', image);
      fetch(image, {
        method: 'HEAD',
        mode: 'cors',
        headers: {
          'Accept': 'image/*'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log('图片URL可访问:', image, 'Content-Type:', response.headers.get('content-type'));
        })
        .catch(error => {
          console.error('图片URL不可访问:', image, error);
          setImageError(true);
        });
    }
  }, [image]);

  return (
    <section className="pt-28 pb-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* 顶部封面图 */}
        <div className="relative w-full h-48 mb-10 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 z-0">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400">图片加载失败</span>
              </div>
            ) : (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover blur-md scale-110"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {isLoading ? (
              <div className="h-40 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : imageError ? (
              <div className="h-40 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">图片加载失败</span>
              </div>
            ) : (
              <img
                src={image}
                alt={name}
                className="h-40 rounded-lg shadow-lg object-contain bg-white/80 p-1"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>

        {/* 菜品介绍 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">{name}</h2>
          {detail ? (
            detail.split('\n').map((line, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">正在加载菜品详情...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DishDetail;
