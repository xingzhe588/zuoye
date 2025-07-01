import React from 'react';

import './index.css';
import { getNavigationValue } from '@brojs/cli';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = (): React.ReactElement => {
    const { t } = useTranslation();
    
    return (
        <div className="notfound-page">
            <div className="notfound-rect">
                <div className="error-content">
                    <h1>{t('not_found')}</h1>
                    <h2>{t('page_not_found')}</h2>
                    <p>{t('page_not_exist')}</p>
                    <Link to={getNavigationValue('project-monday.main')}>
                        <button>{t('back_to_main')}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
    
};

export default NotFoundPage;