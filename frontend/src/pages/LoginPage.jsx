import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../UserContext'



const LoginPage = () => {
    const navigate = useNavigate()
    const initialData = { username: "", password: "" }
    const [data, setData] = useState(initialData)
    const [errorMessage, setErrorMessage] = useState("")
    const {setUser} = useContext(UserContext)

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: data.username,
                password: data.password
            }

        }).then((response) => {
            setUser(response.data)            
            setData(initialData)
            navigate('/')
        }).catch(handleError)

    }

    const handleError = (error) => {
        if (error.response) {
            console.log(error.response)
            switch (error.response.status) {
                case 400:
                    setErrorMessage('Invalid username or password')
                    break;
                case 401:
                    setErrorMessage('Incorrect username or password')
                    break;
                default:
                    setErrorMessage('Server Error')
            }
        }
    }


    return (
        <>
            <h2>loginPage</h2>
            <div className='formWrapper'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">username      </label>
                    <input type="text" name='username' id='username' value={data.username} onChange={handleInputChange} />

                    <label htmlFor="password">password      </label>
                    <input type="password" name='password' id='password' value={data.password} onChange={handleInputChange} />
                    
                    <button>login</button>
                </form>
            </div>
            <div className="errorMessage" display={errorMessage.length > 0 ? 'block' : 'none'}>{errorMessage}</div>
        </>
    )
}

export default LoginPage