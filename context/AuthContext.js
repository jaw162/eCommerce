import { createContext, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { NEXT_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        checkIfLoggedIn()
    }, [])

    const login = async (e, { username: identifier, password }) => {
        e.preventDefault()
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'identifier': identifier,
                'password': password
            })
        })

        const data = await res.json()

        if (res.ok) {
          setUser(data.user)
          router.push('/')
        } else {
          setError(data.error.message)
          setTimeout(() => setError(null), 10000)
        }
    }

    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })

        if (res.ok) {
            setUser(null)
        }
    }

    const checkIfLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`)

        const { user: userInfo } = await res.json()

        if (res.ok) {
            setUser(userInfo)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext