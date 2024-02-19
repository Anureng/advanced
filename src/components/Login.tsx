import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const AddLogin = async () => {
        try {
            const data = await axios.post('https://dummyjson.com/auth/login', {
                username: username,
                password: password,
            })
            const accessToken = data.data.token;
            const expirationTimestamp = (Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60).toString();

            // Store the access token and expiration timestamp in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('expirationTimestamp', expirationTimestamp);
            console.log(data.data.token);

            navigate("/")
            // window.location.reload()
            // sessionStorage.setItem('accessToken', data.data.token)
        } catch (error) {
            console.log(error);
            alert("Invalid UserName And Password")
            setUsername('')
            setPassword('')
        }
    }
    return (
        <div className='h-screen flex items-center justify-center flex-col'>
            {/* <button onClick={AddLogin}>Login</button> */}
            <div className='w-96 flex space-y-5 rounded-xl border-black flex-col items-center justify-center p-4 border'>

                <p className='text-2xl'>Enter Name and Password</p>
                <div className='space-y-3'>
                    <p className='text-2xl font-semibold'>User Name</p>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className='border rounded-xl p-1 border-gray-900 text- font-light text-gray-800 focus:outline-none' type="text" placeholder='Enter UserName...' />
                </div>
                <div className='space-y-3'>
                    <p className='text-2xl font-semibold'>Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='border rounded-xl p-1 border-gray-900 text- font-light text-gray-800 focus:outline-none' placeholder='Enter Password...' />
                </div>

                <button onClick={AddLogin} className='bg-blue-400 text-white px-2  rounded-xl  py-1'>Log In</button>
            </div>
            {/* 
            username: 'kminchelle',
                password: '0lelplR', */}
        </div>
    )
}

export default Login
