import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { loginUser } from './login_controller'

const LoginPage = () => {
    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation(loginUser, {
        onError: (error, variables, context) => {
            // console.log(error)
            // console.log(variables)
            // console.log(context)
            // alert('Error')
            // enqueueSnackbar('Some error encountered. Please try Again.', { variant: 'error' })
        },
        onSuccess: (data, variables, context) => {
            // console.log(data)
            if (data.body && data.body.user && data.body.user.type === 'ADMIN') {
                localStorage.setItem('auth-data', JSON.stringify(data.body.user))
                navigate('/home')
            }
            else {
                // alert('Unauthorized')
            }
        },
    })

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleLoginClick = () => {
        // navigate('/viewer')
        let data = { username, password }
        // console.log(data)
        mutate(data)
    }

    // if (localStorage.getItem('auth-data')) {
    //     return <Navigate to='/home' />
    // }

    return (
        <div className="main-container-two">
            <div className='login-main-container'>
                {
                    isLoading && <p style={{ textAlign: 'center' }}> Loading..</p>
                }
                <p className='logo'>
                    <span className='best'>Best</span><span className='bet'>bet</span>
                </p>

                <input onChange={e => {
                    setUsername(e.target.value)
                }} placeholder='Username' className='input-field' type="text" />
                <input onChange={e => {
                    setPassword(e.target.value)
                }} placeholder='Password' className='input-field' type="password" />
                <button disabled={isLoading} onClick={handleLoginClick} className='submit-btn' >Log In</button>
            </div>
        </div>

    )
}

export default LoginPage