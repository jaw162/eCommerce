import styles from '../styles/WriteReview.module.css'
import Cross from '../public/icons/cross.svg'
import { useState } from 'react'
import { postReview } from '../utils/reviewService'
import { toast } from 'react-toastify'

export default function WriteReview({ product, show, click }) {
  
  const [review, setReview] = useState({
    rating: null,
    heading: '',
    body: '',
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setReview({...review, [name]: value})
  }

  const post = (e) => {
    e.preventDefault()
    if (!review.rating || !review.heading || !review.body) {
      toast.error(`All fields must not be empty`, {toastId: 'PostFailure'})
      return
    }
    postReview(e, review, product.id)
      .then(data => toast.success(data.message, {toastId: 'PostSuccess'}))

    setReview({ rating: null, heading: '', body: '' })
    click(false)
  }

  return (
    <div className={`${styles.container} ${show ? styles.show : styles.hide}`}>
        <form className={styles['form-container']}>
            <div className={styles.heading}>
                <h2>Write a review for {product.attributes.Name}</h2>
                <div
                  className={styles.cross}
                  onClick={(e) => {
                    e.stopPropagation()
                    click(false)
                  }}
                >
                  <Cross />
                </div>
            </div>
            <h3>Rating</h3>
            <div 
              className={styles.rating}
            >
                {[...Array(5)].map((star, index) => {
                  index += 1
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= review.rating ? styles.on : styles.off}
                      onClick={() => setReview({ ...review, rating: index })}
                    >
                      <span className={styles.star}>&#9733;</span>
                    </button>
                  )
                })}
            </div>
            <h3>Review Title</h3>
            <div className={styles['title-box']}>
                <input 
                  maxLength='20'
                  name='heading'
                  onChange={(e) => handleChange(e)}
                />
            </div>
            <h3>Review</h3>
            <div className={styles['body-box']}>
                <textarea 
                  col='1' 
                  wrap='hard' 
                  maxLength='250'
                  value={review.body}
                  onChange={(e) => handleChange(e)}
                  name='body'
                />
            </div>
            <button 
              type='submit'
              className={styles.btn}
              onClick={(e) => post(e)}
            >Post Review</button>
        </form>
    </div>
  )
}