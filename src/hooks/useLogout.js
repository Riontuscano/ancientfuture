import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogout = () => {
    const [loading, setloading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const logout = async () => {
        setloading(true)
        try {
            const response = await fetch('http://localhost:5500/api/auth/logout', {
                method: 'GET',
            })
            
            const data = await response.json()
            if (data.success) {
            localStorage.removeItem("auth-cred")
            setAuthUser(null)
            toast.success('Logged out successfully')
            }else{
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        }finally{
            setloading(false)
        }
    }
    return {logout, loading}
}

export default useLogout