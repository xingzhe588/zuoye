import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    title: 'Восемь кухонь Китая',
    description: 'Сычуаньская, Шаньдунская, Гуандунская, Цзянсуская, Чжэцзянская, Фуцзяньская, Хунаньская, Аньхойская — каждая со своими вкусами и стилем, классическое наследие китайской гастрономии.',
    features: ['Шаньдун: солёно-соевые ароматы', 'Сычуань: острое и ароматное', 'Гуандун: лёгкое и изысканное', 'Цзянсу: сладкое и деликатное'],
    icon: 'fa-utensils'
  },
  {
    title: 'Сезонное питание',
    description: 'Китайская кухня тесно связана с временами года, ингредиенты и приготовление подчинены времени, отражая традиционную мудрость гармонии человека и природы.',
    features: ['Весной ростки — для энергии', 'Летом дыни — охлаждают жар', 'Осенью фрукты — увлажняют лёгкие', 'Зимой — тонизирующее питание'],
    icon: 'fa-seedling'
  },
  {
    title: 'Пищевой этикет',
    description: 'Еда несёт в себе традиции и культуру — от рассадки за столом до правил подачи, важный мост между обществом и семьёй.',
    features: ['Старшие начинают первыми', 'Блюда не вращаются, вращается чаша', 'Добавка — знак уважения', 'Праздничные застолья выражают чувства'],
    icon: 'fa-handshake'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Достоинства китайской кухни</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            От кухонь до сезонов и этикета — китайская гастрономия это не только вкус, но и культурное наследие.
          </p>
        </motion.div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-primary dark:bg-gray-900 p-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <i className={`fas ${service.icon} text-white`}></i>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fas fa-check text-secondary mr-2"></i>
                      <span className="dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* <button className="mt-8 w-full py-3 bg-primary dark:bg-gray-900 text-white font-medium rounded-md hover:bg-secondary dark:hover:bg-purple-700 transition-colors duration-300">
                  Подробнее
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
