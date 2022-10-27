import Layout from '../../components/Layout'
import ProductInfo from '../../components/ProductInfo'
import { API_URL } from '../../config/index'
import { useEffect, useState, useContext } from 'react'
import BasketContext from '../../context/ShoppingBasket'
import styles from '../../styles/ProductPage.module.css'
import Review from '../../components/Review'
import Rating from '../../components/Rating'
import WriteReview from '../../components/WriteReview'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useWindowDimensions } from '../../utils/windowDimensions'

export default function ProductPage({ product, reviews, averageRating }) {
  const router = useRouter()
  const { width } = useWindowDimensions()

  const { addItem, items, setOpen } = useContext(BasketContext)
  const { user } = useContext(AuthContext)

  const { attributes: item } = product
  const image = product.attributes.Image.data

  const [wideViewport, setIsWide] = useState(false)
  const [showWriteReview, setShown] = useState(false)

  useEffect(() => {
    const isWide = window.matchMedia('(min-width: 809px)').matches
    if (wideViewport !== isWide) {
      setIsWide(isWide)
    }
  }, [width, wideViewport])

  const alreadyAdded = items.some(item => item.id === product.id)

  const productImage = {
    backgroundImage: `url(${image[1].attributes.formats.large.url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  return (
    <Layout
      title={`${item.Name} | Tech eCommerce`}
    >
      <div className={styles.wrap}>
        <ToastContainer />
        <div className={styles['hero-container']}>
          <div 
            className={styles['image-container']} 
            style={productImage}
          >
            <aside></aside>
          </div>
          <div className={styles['text-box']}>
            <div className={styles.info}>
              <h1>{item.Name}</h1>
              <p>£{item.Price}</p>
              {averageRating ? 
                (
                <div className={styles['average-rating']}>
                  <Rating rating={averageRating} /><p>from {reviews.length} reviews</p>
                </div>
                ) :
                <p>No reviews yet..</p>}
              <a 
                className={styles.btn}
                onClick={alreadyAdded ? () => setOpen(true) : () => addItem(product)}
              >{alreadyAdded ? 'Go To Basket' : 'Add To Bag'}</a>
            </div>
            {wideViewport ? <ProductInfo /> : null}
          </div>
        </div>
            {wideViewport ? null : <ProductInfo />}
        <div className={styles['review-section']}>
          <div className={styles['review-header']}>
            <h2>Reviews</h2>
            {averageRating ? (
              <div>
                <div className={styles['average-rating-display']}>
                  <p className={styles.rating}>{`${averageRating.toFixed(1)}`}</p><p>out of 5</p>
                </div>
                <p>{`Based on ${reviews.length} reviews`}</p>
              </div>
            ) :
            <p>No reviews yet...</p>
            }
            <button
              onClick={user ? () => setShown(true) : () => router.push('/login')}
              className={styles['review-button']}
            >
              Write a review
            </button>
          </div>
          <div className={styles.reviews}>
            {reviews.map(review => (
              <Review 
                key={review.id} 
                review={review} 
                product={product}
              />
            ))}
            </div>
        </div>
        <WriteReview 
          product={product}
          show={showWriteReview}
          click={setShown}
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/products`)
    const { data: products } = await res.json()
  
    const paths = products.map(product => {
      return {
        params: { slug: product.attributes.slug }
      }
    })
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export async function getStaticProps({ params: { slug } }) {
    
    const res = await fetch(`${API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`)
    const { data } = await res.json()
    const product = data[0]

    const reviewsRes = await fetch(`${API_URL}/api/reviews?populate=*&filters[product][id][$eq]=${product.id}`)
    const { data: reviews } = await reviewsRes.json()

    const averageRating = reviews.reduce((a, b) => (
      a + b.attributes.rating
    ), 0) / reviews.length
  
    return {
      props: {
        product,
        reviews,
        averageRating
      },
      revalidate: 62,
    }
  }