import Logo2 from '../public/logo2.svg'
import ShopBag from '../public/shopping-bag2.svg'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'
import BasketContext from '../context/ShoppingBasket'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Cross from '../public/icons/cross.svg'
import GitLogo from '../public/gitLogo.svg'
import ShoppingBasketCard from './ShoppingBasketCard'
import { useScrollingUp } from '../utils/isScrollingUp'
import { resetPosition } from '../utils/rememberScrollPosition'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const { items, total, setOpen, basketOpen } = useContext(BasketContext)

  const [searchField, setSearchField] = useState('')

  const isScrollingUp = useScrollingUp()

  const router = useRouter()

  return (
    <header className={`${styles.header} ${isScrollingUp ? styles.sticky : ''}`}>
      <div className={styles.wrap}>
        <div className={styles['header-first-section']}>
          <a 
            className={styles['git-link']}
            href='https://github.com/jaw162/eCommerce'
          >
            <GitLogo />
            <p>github.com/jaw162/eCommerce</p>
          </a>
          {user ?
          <a className={styles['sign-in']}>
            <p className={styles['welcome-message']}>Welcome {user.username}</p><p className={styles['log-out-btn']} onClick={() => logout()}>Log Out</p>
          </a> :
          <Link href='/login'>
            <a className={styles['sign-in']}>
              Sign In
            </a>
          </Link> }
        </div>
        <div className={styles['container-main']}>
          <Logo2 onClick={() => {
              resetPosition()
              router.push('/')
            }} />
          <form 
            onSubmit={(e) => {
                e.preventDefault()
                router.push(`/search?term=${searchField}`)
            }}
            className={styles['search-box']}
          >
            <input 
              type='search' 
              placeholder='Search'
              onChange={(e) => setSearchField(e.target.value)}
            />
            <button type='submit'></button>
          </form>
          <ShopBag 
            onClick={() => setOpen(true)}
          />
          {total.quantity > 0 && <span className={styles['display-quantity']}>{total.quantity}</span>}
          <aside></aside>
        </div>
        <div className={`${styles['shopping-basket']} ${basketOpen ? styles.show : ''}`}>
          <div className={styles['basket-heading']}>
            <h3>Your Basket</h3>
            <Cross 
              onClick={() => setOpen(false)}
              className={styles.cross}
            />
          </div>
          {items.map(product => (
            <ShoppingBasketCard key={product.id} product={product} />
            )
          )}
          <div className={styles['total-display']}>
            <p>Total</p><p>£{total.price}</p>
          </div>
          <div 
            className={`${styles['shopping-basket-overlay']} ${basketOpen ? styles[`darken-background`] : styles[`lighten-background`]}`}
            onClick={() => setOpen(false)}
          ></div>
        </div>
      </div>
    </header>
  )
}