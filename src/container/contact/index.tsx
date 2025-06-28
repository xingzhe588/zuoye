import React from 'react';

import './index.css';
import { useTranslation } from 'react-i18next';

const Contacts = (): React.ReactElement => {
    const { t } = useTranslation();
    
    return (
        <div className='contact-page-first'>
            <div className='contact-first-borders'>
                
                <div>
                    <div className='contact-rectangle'>
                        <div className='contact-img-1'> </div>
                    </div>
                        <div className='contact-border'>
                            <div className='contact-name'> Син Чжэ (邢哲) </div>
                            <div className='contact-pos-right'> {t('project_leader')} </div>
                            <div className='contact-pos-left'>{t('phone')} +86 138 0013 8000</div>
                            <div className='contact-pos-left'>{t('comment_leader')}</div>
                        </div>
                </div>
                <div>
                    <div className='contact-rectangle'>
                        <div className='contact-img-2'> </div>
                    </div>
                        <div className='contact-border'>
                            <div className='contact-name'> Ци Дяньюй (齐殿宇) </div>
                            <div className='contact-pos-right'> {t('lead_developer')} </div>
                            <div className='contact-pos-left'>{t('phone')} +86 139 0013 9000</div>
                            <div className='contact-pos-left'>{t('comment_lead')}</div>
                        </div>
                </div>
                
            </div>
        </div>
    );
};

export default Contacts;