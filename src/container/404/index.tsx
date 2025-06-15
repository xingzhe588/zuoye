import React from 'react';

import './index.css';

const NotFoundPage = (): React.ReactElement => {
    return (
        <div className="notfound-page">
            <div className="notfound-rect">
                <div className="notfound-message">
                    <div className="notfound-message-head">Ops...</div>
                    <div className="notfound-message-text"> К сожалению в данный момент страница не доступна. 
                        Приносим свои извинения.</div>
                </div>
            </div>
        </div>
    );
    
};

export default NotFoundPage;