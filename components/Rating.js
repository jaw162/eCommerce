import Star from '../public/star.svg'
import { useEffect, useState } from 'react'

export default function AverageRating({ rating }) {

  const starWidth = 12
  const roundedDownAverage = Math.floor(rating)

  const [stars, setStars] = useState()

  useEffect(() => {
    const array = Array.from(Array(roundedDownAverage), (x, i) => i + 1)
    const starsSvgs = array.map(n => (
        <Star key={n} />
    ))
    
    if (rating % 1 !== 0) {
        setStars(starsSvgs.concat(<Star key={rating} width={starWidth * (rating - roundedDownAverage)}></Star>))
        return
    }

    setStars(starsSvgs)
  }, [rating, roundedDownAverage])

  return (
    <div>
        {stars}
    </div>
  )
}