import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">История китайской кухни</h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Откройте для себя культуру и эмоции за вкусами
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Почему мы делимся едой</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Китайская кухня — это не только вкусовое наслаждение, но и отражение истории и культурного наследия. Мы стремимся делиться историями и фотографиями, чтобы больше людей узнало о прелестях восьми великих кулинарных традиций Китая и нашло аутентичные вкусы на улицах и в переулках.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Поделиться культурой, стоящей за каждым блюдом, и запечатлеть каждый кулинарный момент — вот цель нашего проекта.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-gray-700/30 flex items-center justify-center mr-4">
                  <i className="fas fa-lightbulb text-primary dark:text-secondary"></i>
                </div>
                <span className="font-medium dark:text-white">📖 Культурное наследие</span>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-gray-700/30 flex items-center justify-center mr-4">
                  <i className="fas fa-users text-primary dark:text-secondary"></i>
                </div>
                <span className="font-medium dark:text-white">🥢 Делимся вкусами</span>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-gray-700/30 flex items-center justify-center mr-4">
                  <i className="fas fa-heart text-primary dark:text-secondary"></i>
                </div>
                <span className="font-medium dark:text-white">❤️ Любовь и традиции</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl blur-lg -z-10"></div>

            <div className="w-full h-auto rounded-lg shadow-xl bg-white dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-secondary/20 dark:bg-purple-500/20 flex items-center justify-center mb-4">
                  <i className="fas fa-landmark text-secondary dark:text-purple-400 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Краткая история китайской кухни</h3>

                <div className="w-full max-w-md">
                  <div className="relative border-l-2 border-primary/20 dark:border-gray-600/40 pl-8 pb-8">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
                    <h4 className="text-lg font-semibold text-primary dark:text-white">Древность – династии Цинь и Хань</h4>
                    <p className="text-gray-600 dark:text-gray-300">Овладение огнём, начало эпохи приготовленной пищи, внимание к сезону и гармонии.</p>
                  </div>

                  <div className="relative border-l-2 border-primary/20 dark:border-gray-600/40 pl-8 pb-8">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
                    <h4 className="text-lg font-semibold text-primary dark:text-white">Династии Тан-Сун – Мин-Цин</h4>
                    <p className="text-gray-600 dark:text-gray-300">Беспрецедентный расцвет кулинарной культуры, формирование восьми кулинарных школ, проникновение в повседневную жизнь.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
                    <h4 className="text-lg font-semibold text-primary dark:text-white">Современность</h4>
                    <p className="text-gray-600 dark:text-gray-300">Сочетание традиций и инноваций, выход на мировую арену.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/20 dark:bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-hourglass-half text-secondary dark:text-purple-400 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold dark:text-white">3000 лет</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">традиций гастрономии</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
