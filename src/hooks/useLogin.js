import  { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const login = async ({username,password}) => {
        const success = handleInputErrors({username,password})
        if(!success) return
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5500/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({username,password}),
                credentials: "include" 
            })
            const data = await response.json()
            if(data.error){
                throw new Error(data.error);
            }else if(data.Error){
                if(data.Error.includes('users.findOne()')){
                    throw new Error('Server Timeout')
                }
                throw new Error(data.Error);
            }
            localStorage.setItem('auth-cred',JSON.stringify(data))
            setAuthUser(data);
            toast.success("Login Successfully Done")
        } catch (error) {
            toast.error(error.message)
            throw new Error(error)
        }finally{
            setLoading(false)
        }
    }
    return { login, loading }
}

export default useLogin

function handleInputErrors({ username, password }) {
    // console.log(username , password);
    
    if (!username || !password ) {
        toast.error('Please fill all the fields');
        return false;
    } else if (username.length < 3) {
        toast.error('Invalid password or username');
        return false;
    } else if (password.length < 8) {
        toast.error('Invalid password or username');
        return false;
    } else {
        return true;
    }
}
