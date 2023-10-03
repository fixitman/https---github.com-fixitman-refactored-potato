import { Navigate, Outlet } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'



const UserRequired = () => {

    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(!Boolean(user))

    useEffect(() => {
        if (loading)  {
            axios.get('/auth/getUser')
                .then((response) => {
                    setUser(response.data.user)
                    setLoading(false)
                })
        }
    }, [setUser])

    if (loading) {
        return (
            <h1>LOADING...</h1>
        )
    }

    if (!user) {
        console.log('redirecting to login page', user)
        return (
            <Navigate to='/login' />
        )
    }

    return (
        <Outlet />
    )

}

export default UserRequired