import React from 'react'
import useUser from '../../lib/useUser';

const chao = () => {
    const user = useUser("/login" );
    if (!user || !user.isAuthenticated) {
        return null;
    }
    return (
        <div>
            <h1>Chao</h1>
        </div>
    )
}

export default chao
