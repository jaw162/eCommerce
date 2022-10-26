import styles from '../styles/BasketCard.module.css'
import BasketContext from '../context/ShoppingBasket'
import { useContext } from 'react'
import Cross from '../public/icons/cross.svg'

export default function ShoppingBasketCard({ product }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useContext(BasketContext)

  const imageBackground = {
    backgroundImage: `url(${product.image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className={styles.container}>
        <div 
          className={styles['image-container']}
          style={imageBackground}
        >
        </div>
        <div className={styles['info-container']}>
            <div className={styles['info-header']}>
              <h3>{product.name}</h3>
              <Cross 
                onClick={() => removeItem(product.id)}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <p>£{product.price}</p>
            <div className={styles['quantity']}>
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <aside>{product.quantity}</aside>
                <button onClick={() => increaseQuantity(product.id)}>+</button>
            </div>
        </div>
    </div>
  )
}