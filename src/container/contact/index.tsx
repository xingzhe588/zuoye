import React from 'react';

import './index.css';

const Contacts = (): React.ReactElement => {
    return (
        <div className='contact-page-first'>
            <div className='contact-first-borders'>
                
                <div>
                    <div className='contact-rectangle'>
                        <div className='contact-img-1'> </div>
                    </div>
                        <div className='contact-border'>
                            <div className='contact-name'> Син Чжэ (邢哲) </div>
                            <div className='contact-pos-right'> Руководитель проекта, backend/frontend разработчик </div>
                            <div className='contact-pos-left'>Телефон: +86 138 0013 8000</div>
                            <div className='contact-pos-left'>Комментарий: Всегда рад помочь по вопросам сотрудничества и технической поддержки.</div>
                        </div>
                </div>
                <div>
                    <div className='contact-rectangle'>
                        <div className='contact-img-2'> </div>
                    </div>
                        <div className='contact-border'>
                            <div className='contact-name'> Ци Дяньюй (齐殿宇) </div>
                            <div className='contact-pos-right'> Ведущий разработчик, frontend </div>
                            <div className='contact-pos-left'>Телефон: +86 139 0013 9000</div>
                            <div className='contact-pos-left'>Комментарий: По всем вопросам интерфейса и пользовательского опыта обращайтесь ко мне!</div>
                        </div>
                </div>
                
            </div>
        </div>
    );
};

export default Contacts;