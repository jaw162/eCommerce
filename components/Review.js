import styles from '../styles/Reviews.module.css'
import Rating from './Rating'
import Edit from '../public/icons/edit.svg'
import Bin from '../public/icons/bin.svg'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import EditReview from './EditReview'
import { removeReview } from '../utils/reviewService'
import { toast } from 'react-toastify'

export default function Review({ review, product }) {
  const { user } = useContext(AuthContext)

  const { attributes: info } = review

  const [editModalOpen, setOpen] = useState(false)

  if (user) {
    const sameUser = user.id === info.user.data.id

    const deleteReview = (e) => {
      e.preventDefault()
      removeReview(review.id)
        .then(data => toast(data.message, {toastId: 'DeleteSuccess'}))
    }
    
    return (
      <div className={styles['review-container']}>
        <EditReview 
          product={product}
          show={editModalOpen}
          click={setOpen}
          reviewToEdit={review}
        />
        <div className={styles['by-and-date']}>
          <p 
            className={styles.author}
            style={sameUser ? { color: 'blue' } : {}}
          >{sameUser ? 'You' : info.user.data.attributes.username}
          </p>            
          <p className={styles.date}>{info.createdAt.slice(0, 10)}</p>
          {sameUser ? (
            <div
              className={styles['post-options']}
            >
              <div onClick={() => setOpen(true)}>
                <Edit style={{color: '#FFF'}} />
              </div>
              <div onClick={(e) => deleteReview(e)}>
                <Bin />
              </div>
            </div>
          ) : null}
        </div>
        <Rating rating={info.rating} />
        <h3>{info.heading}</h3>
        <p>{info.body}</p>
      </div>
    )
  } else {
    return (
      <div className={styles['review-container']}>
        <div className={styles['by-and-date']}>
          <p 
            className={styles.author}
          >{info.user?.data.attributes.username}
          </p>            
          <p className={styles.date}>{info.createdAt.slice(0, 10)}</p>
        </div>
        <Rating rating={info.rating} />
        <h3>{info.heading}</h3>
        <p>{info.body}</p>
      </div>
    )
  }
}