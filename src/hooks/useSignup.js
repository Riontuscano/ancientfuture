import  { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loadings, setloadings] = useState(false)
    const {setAuthUser} = useAuthContext()

    const signUp = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullname, username, email, password, confirmPassword, gender });
        if(!success) return false
        setloadings(true)
        try {
            const response = await fetch('http://localhost:5500/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ fullname, username,email, password ,confirmPassword , gender }),
                credentials: "include" 
            })
            const data = await response.json()
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem('auth-cred',JSON.stringify(data))
            setAuthUser(data);
            toast.success("Signup Successfully Done")
        } catch (error) {
            throw new Error(error)
        }finally{
            setloadings(false)
        }
    }
    return { signUp, loadings }
}

export default useSignup

function handleInputErrors({ fullname, username ,email, password, confirmPassword, gender }) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!fullname || !username || !password || !confirmPassword || !gender || !email) {
        toast.error('Please fill all the fields');
        return false;
    } else if (username.length < 3) {
        toast.error('Username Too Short');
        return false;
    } else if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    } else if (!emailRegex.test(email)) {
        toast.error('Enter a valid email');
        return false;
    } else if (password.length < 8) {
        toast.error('Password should be at least 8 characters long');
        return false;
    } else {
        return true;
    }
}