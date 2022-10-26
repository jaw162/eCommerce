/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {
    if (req.method === 'POST') {
        const { identifier, password } = req.body

        const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'identifier': identifier,
                'password': password
            })
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24,
                sameSite: 'strict',
                path: '/'
            }))

            res.status(200).json(data)
        } else {
            res.status(data.error.status).json(data)
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}