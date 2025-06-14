import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Navbar = ({ toggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // 从 localStorage 获取用户信息
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex justify-between items-center">
        {/* 左侧 Logo 可添加 */}

        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/#about" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">О кухне</Link>
          <Link to="/#features" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">Особенности</Link>
          <Link to="/#services" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">Достопримечательности</Link>
          <Link to="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">Категории</Link>
          <Link to="/#faq" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">Частые вопросы</Link>
          <Link to="/menu" className="text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors">Меню</Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <div className="hidden lg:block">
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {user.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="btn">Войти</button>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-primary dark:text-white"
            onClick={toggle}
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
