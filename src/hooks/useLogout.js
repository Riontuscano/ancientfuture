import React, { useState } from 'react'
import toast from 'react-hot-toast'


const API = import.meta.env.VITE_API_URL
const useLogout = () => {
    const [loading, setloading] = useState(false)
    const logout = async () => {
        setloading(true)
        try {
            const response = await fetch(`${API}/api/auth/logout`, {
                method: 'GET',
            })
            
            const data = await response.json()
            if (data.success) {
            localStorage.removeItem("auth-cred")
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