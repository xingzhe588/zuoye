import React from 'react';

import './index.css';
import { getNavigationValue } from '@brojs/cli';
import { Link } from 'react-router-dom';

const NotFoundPage = (): React.ReactElement => {
    return (
        <div className="notfound-page">
            <div className="notfound-rect">
                <div className="error-content">
                    <h1>404</h1>
                    <h2>Страница не найдена</h2>
                    <p>Извините, запрашиваемая страница не существует.</p>
                    <Link to={getNavigationValue('project-monday.main')}>
                        <button>Вернуться на главную</button>
                    </Link>
                </div>
            </div>
        </div>
    );
    
};

export default NotFoundPage;