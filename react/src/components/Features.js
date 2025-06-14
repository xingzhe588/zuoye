import React from 'react';
import { motion } from 'framer-motion';

const featuresList = [
  {
    icon: 'fa-utensils', // 饭碗图标，代表“多样菜系”
    title: 'Разнообразие кухонь 🍜',
    description: 'От восьми главных школ до местных вкусов — китайская кухня охватывает множество стилей, удовлетворяя вкусы разных регионов.'
  },
  {
    icon: 'fa-leaf', // 绿叶图标，代表“食材新鲜与自然”
    title: 'Отбор ингредиентов 🥬',
    description: 'Китайская кухня уделяет внимание сезонности, происхождению и питательному балансу ингредиентов.'
  },
  {
    icon: 'fa-fire', // 火焰图标，更直观地表示“烹饪火候”
    title: 'Кулинарное мастерство 🔥',
    description: 'Жарка, тушение, варка, приготовление на пару — богатые методы создают разнообразные кулинарные формы.'
  },
  {
    icon: 'fa-landmark', // 古建筑图标，代表“文化遗产”
    title: 'Культурное наследие 📖',
    description: 'Питание несёт в себе историю, этикет и эстетику, играя важную роль в китайской культуре.'
  },
  {
    icon: 'fa-palette', // 调色板图标，象征色香味形
    title: 'Цвет, аромат, вкус и форма 🌈',
    description: 'Изысканные цвета, насыщенные ароматы, разнообразные текстуры и эстетичная подача — четыре принципа китайской гастрономии.'
  },
  {
    icon: 'fa-lightbulb', // 灯泡图标，代表“创新与融合”
    title: 'Традиции и инновации 🌏',
    description: 'От традиционных рецептов до фьюжн-блюд, китайская кухня постоянно обновляется и выходит на мировую сцену.'
  }
];


const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section id="features" className="py-20 dark:bg-gray-900">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Очарование китайской кухни</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Изучите многогранные особенности китайской гастрономии
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuresList.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-gray-700/30 rounded-full flex items-center justify-center mb-6">
                <i className={`fas ${feature.icon} text-primary dark:text-secondary text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
