import React from 'react'
import Link from 'next/link'
import useUser from "../lib/useUser";

const otro = () => {
    const user = useUser("/login" );
    if (!user || !user.isAuthenticated) {
        return null;
    }
    return (
        <div>
            <h1>Otro</h1>
            <Link href="/">Dashboard</Link>
        </div>
    )
}

export default otro
