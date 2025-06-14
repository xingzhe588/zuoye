import React from 'react';
import { motion } from 'framer-motion';

const culturalLevels = [
  {
    name: 'Повседневное питание',
    description: 'Три приёма пищи в день несут в себе настоящий дух домашнего уюта.',
    features: [
      { text: 'Домашняя кухня', included: true },
      { text: 'Каши, лапша, закуски', included: true },
      { text: 'Доступные ингредиенты', included: true },
      { text: 'Формат застолья', included: false },
      { text: 'Сезонные ограничения', included: false },
    ],
  },
  {
    name: 'Сезонные вкусы',
    description: 'Питание в соответствии с 24 сезонами отражает гармонию человека и природы.',
    features: [
      { text: 'Питание по сезонам', included: true },
      { text: 'Оздоровление и питание', included: true },
      { text: 'Сезонные блюда разных регионов', included: true },
      { text: 'Богатые традиции', included: true },
      { text: 'Застольный характер', included: false },
    ],
  },
  {
    name: 'Культура застолий',
    description: 'Отражает этикет, статус и торжественность, несёт глубокую культурную основу.',
    features: [
      { text: 'Этикет на банкетах', included: true },
      { text: 'Знаменитые блюда регионов', included: true },
      { text: 'Богатое меню', included: true },
      { text: 'Продуманные сочетания', included: true },
      { text: 'Носитель культуры', included: true },
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 dark:bg-gray-900">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Три уровня китайской гастрономической культуры</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            От повседневного питания до сезонных вкусов и торжественных застолий — познайте разнообразие китайской кулинарии.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {culturalLevels.map((level, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary dark:bg-gray-800 text-white p-8 rounded-t-lg">
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <p className="text-gray-200 dark:text-gray-300 mb-4">{level.description}</p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-8 rounded-b-lg border-t-0 border border-gray-200 dark:border-gray-600">
                <ul className="space-y-4">
                  {level.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className={`fas ${feature.included ? 'fa-check text-green-500' : 'fa-times text-red-500'} mr-3`}></i>
                      <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
