import styles from '../styles/Footer.module.css'
import { useState } from 'react'

export default function Footer() {

  const [email, setEmail] = useState('')

  return (
    <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles['sign-up']}>
            <h3>Sign up for exclusive offers and to be notified of the latest product drops</h3>
            
            <div className={styles['large-field']}>
              <input 
                type="text" 
                name="email"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
                <label 
                  className={email ? `${styles.placeholder} ${styles.hide}` : styles.placeholder}
                >Email Address
                </label>
            </div>
          </div>
          <div className={styles['info-links']}>
            <div className={styles.links}>
              <ul>
                <h4>SUPPORT</h4>
                <li>Help</li>
                <li>Track Order</li>
                <li>Returns</li>
              </ul>
            </div>
            <div className={styles.links}>
              <ul>
                <h4>COMPANY</h4>
                <li>About</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}