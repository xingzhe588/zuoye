import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqItems = [
  {
    question: 'Какие основные кухни существуют в Китае?',
    answer: 'Восемь главных китайских кухонь включают Шаньдунскую, Сычуаньскую, Гуандунскую, Цзянсускую, Чжэцзянскую, Фуцзяньскую, Хунаньскую и Аньхойскую — каждая представляет региональные гастрономические традиции.'
  },
  {
    question: 'Что означает сезонное питание?',
    answer: 'Сезонное питание — это выбор сезонных продуктов и корректировка рациона в соответствии с 24 сезонами китайского календаря для гармонии с природой и укрепления здоровья.'
  },
  {
    question: 'Какие традиции и этикет существуют в китайской кухне?',
    answer: 'Уважение к старшим, посадка по старшинству, первые блюда подаются старшим, не вставлять палочки в рис — всё это отражает богатую культуру этикета.'
  },
  {
    question: 'Какие блюда имеют особый символизм в праздники?',
    answer: 'Юансяо (шарики из рисовой муки) на Праздник фонарей символизируют единство, лунные пряники на Среднюю осень — воссоединение, а пельмени на Новый год — достаток и удачу.'
  },
  {
    question: 'Как китайская еда отражает региональные различия?',
    answer: 'На севере предпочитают мучные изделия, на юге — рис; прибрежные регионы используют морепродукты, а юго-запад предпочитает острые и кислые вкусы.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Часто задаваемые вопросы</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Ответы на распространённые вопросы о китайской кухне
          </p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className={`w-full p-4 text-left text-lg font-medium rounded-lg flex justify-between items-center ${
                  activeIndex === index
                    ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary'
                    : 'bg-white dark:bg-gray-700 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                onClick={() => toggleItem(index)}
              >
                {item.question}
                <span className="flex-shrink-0 ml-2">
                  {activeIndex === index ? (
                    <i className="fas fa-minus text-secondary"></i>
                  ) : (
                    <i className="fas fa-plus text-primary dark:text-gray-400"></i>
                  )}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-b-lg border-t-0 border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
