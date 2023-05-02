import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"

import { api, createSession, getUser } from '../services/api'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")
        const recoveredToken = localStorage.getItem("token")

        if(recoveredUser && recoveredToken) {
            (async () => {
                const { data } = await getUser(JSON.parse(recoveredUser)._id)
                setUser(data)
                setLoading(false)
            })()
            
            api.defaults.headers.Authorization = `Bearer ${ recoveredToken }`
        } else
            setLoading(false)
    }, [])

    const login = async (email, senha) => {
        try {
            const { data } = await createSession(email, senha)
    
            const loggedUser = data.user
            const token = data.token
    
            localStorage.setItem("user", JSON.stringify(loggedUser))
            localStorage.setItem("token", token)
    
            api.defaults.headers.Authorization = `Bearer ${ token }`
    
            const user = await getUser(loggedUser._id)
            setUser(user.data)
    
            if(user.data.type == 'dentista') {
                navigate('buscar-paciente')
            } else 
                navigate(`/home-${ user.data.type }`)
        } catch(err) {
            const { status, data } = err.response
            return { status, msg: data.msg }
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null

        setUser(null)
        navigate('/login')
    }

    return (
        <LoginContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            { children }
        </LoginContext.Provider>
    )
}