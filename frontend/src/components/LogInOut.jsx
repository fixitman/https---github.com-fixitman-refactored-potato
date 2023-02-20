import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LogInOut = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        axios.post('auth/logout')
            .then(() => {
                console.log('logged out')
                //navigate('/')
            })
    }

    const login = () => {
        navigate('/login')
    }

    if (user) {
        return (
            <button className="logInOut" onClick={logout}>Log Out</button>
        )
    } else {
        return (
            <button className="logInOut" onClick={login}>Log In</button>
        )
    }


}

export default LogInOut