import { NEXT_URL } from "../config"
import { review } from "./placeholderText"

export const postReview = async (e, { rating, body, heading }, productId) => {
    e.preventDefault()

    const strapiRes = await fetch(`${NEXT_URL}/api/postReview`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'rating': rating,
            'body': body,
            'heading': heading,
            'product': productId
        })
    })

    const data = await strapiRes.json()

    return data
    
}

export const updateReview = async ({ rating, body, heading }, productId, reviewId) => {

    const strapiRes = await fetch(`${NEXT_URL}/api/editReview`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'rating': rating,
            'body': body,
            'heading': heading,
            'product': productId,
            'reviewId': reviewId
        })
    })

    const data = await strapiRes.json()

    return data
    
}

export const removeReview = async (reviewId) => {

    const strapiRes = await fetch(`${NEXT_URL}/api/delete/${reviewId}`, {

        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await strapiRes.json()

    return data
    
}