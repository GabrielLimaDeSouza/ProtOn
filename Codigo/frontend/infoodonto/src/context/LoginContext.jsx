import { createContext, useState } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const loginUser = user => {
        setCurrentUser(user)
        localStorage.setItem("user", JSON.stringify({ id: user._id, userType: user.userType }))
    }

    const logoutUser = () => {
        setCurrentUser(null)
    }

    return (
        <LoginContext.Provider value={{ currentUser, loginUser, logoutUser }}>
            { children }
        </LoginContext.Provider>
    )
}