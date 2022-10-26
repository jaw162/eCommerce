/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from "../../config"

export default async (req, res) => {
    if (req.method === 'PUT') {

        if (req.headers.cookie) {

            const { body, heading, product, rating } = req.body
            
            const strapiRes = await fetch(`${API_URL}/api/reviews/${req.body.reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.headers.cookie.substring(6)}`
                },
                body: JSON.stringify({
                    data: {
                        'rating': rating,
                        'body': body,
                        'heading': heading,
                        'product': product
                    }
                })
            })

            if (strapiRes.ok) {
                res.status(200).json({ message: 'Success' })
            } else {
                res.status(400).json({ message: 'Something went wrong' })
            }

        } else {
            res.status(403).json({ message: `You're not allowed to do this` })
        }

    } else {
        res.setHeader('Allow', 'PUT')
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}