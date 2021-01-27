import React from 'react'
import useUser from "../../lib/useUser";

const hola = () => {
    const user = useUser("/login" );
    if (!user || !user.isAuthenticated) {
        return null;
    }
    return (
        <div>
            <h1>Hola</h1>
        </div>
    )
}

export default hola
