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
                            <div className='contact-name'> Крылов Михаил </div>
                            <div className='contact-pos-right'> backend-dev + frontend-dev </div>
                            <div className='contact-pos-left'> Комментарий: </div>
                        </div>
                </div>
                <div>
                    <div className='contact-rectangle'>
                        <div className='contact-img-2'> </div>
                    </div>
                        <div className='contact-border'>
                            <div className='contact-name'> Сергеев Ярослав </div>
                            <div className='contact-pos-right'> frontend-dev </div>
                            <div className='contact-pos-left'> Комментарий: </div>
                            <div className='contact-pos-right'> Спаси и сохрани стенд... </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;