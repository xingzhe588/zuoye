import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggle }) => {
  const sidebarVariants = {
    closed: { x: '100%', opacity: 0 },
    open: { x: 0, opacity: 1 }
  };
  
  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: i => ({ 
      x: 0, 
      opacity: 1,
      transition: { delay: 0.1 * i }
    })
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
          />
          
          <motion.div
            className="fixed top-0 right-0 w-[280px] h-full bg-white dark:bg-gray-900 z-50 shadow-xl"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'tween' }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold">
                  <span className="text-primary dark:text-white">Cherry</span>
                  <span className="text-secondary">Fox</span>
                </div>
                <button 
                  className="text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
                  onClick={toggle}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <nav>
                <ul className="space-y-4">
                  <li>
                    <motion.a 
                      href="#about" 
                      className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      onClick={toggle}
                      variants={linkVariants}
                      custom={0}
                    >
                      关于美食
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#features" 
                      className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      onClick={toggle}
                      variants={linkVariants}
                      custom={1}
                    >
                      特色
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#services" 
                      className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      onClick={toggle}
                      variants={linkVariants}
                      custom={2}
                    >
                      看点
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#pricing" 
                      className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      onClick={toggle}
                      variants={linkVariants}
                      custom={3}
                    >
                      类型
                    </motion.a>
                  </li>
                  <li>
                    <motion.a 
                      href="#faq" 
                      className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      onClick={toggle}
                      variants={linkVariants}
                      custom={4}
                    >
                      介绍
                    </motion.a>
                  </li>
                </ul>
              </nav>
              
              <div className="mt-10">
                <button className="w-full btn">登录</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 