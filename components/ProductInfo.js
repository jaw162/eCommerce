import { useState } from "react"
import { placeholderText, overviewTab } from "../utils/placeholderText"
import styles from '../styles/ProductInfo.module.css'

export default function ProductInfo() {
  
  const [tab, setTab] = useState({ active: 'Overview' })

  const style = { display: 'block' }
  
  const moveTo = (tab) => {
    setTab({ active: tab })
  }

  return (
    <div className={styles['product-info-container']}>
      <div className={styles.buttons}>
        <button
          onClick={() => moveTo('Overview')}
          className={tab.active === 'Overview' ? styles.active : ''}
        >Overview</button>
        <button
          onClick={() => moveTo('Specs')}
          className={tab.active === 'Specs' ? styles.active : ''}
        >Specs</button>
        <button
          onClick={() => moveTo('Returns')}
          className={tab.active === 'Returns' ? styles.active : ''}
        >Returns</button>
      </div>
      <div className={styles['details-container']}>
        <div className={styles.details} >
          <article 
            className={styles.info}
            style={tab.active === 'Overview' ? style : {}}
          >
            {overviewTab}
          </article>
          <article 
            className={styles.info}
            style={tab.active === 'Specs' ? style : {}}
          >
            {placeholderText}
          </article>
          <article 
            className={styles.info}
            style={tab.active === 'Returns' ? style : {}}
          >
            {placeholderText}
          </article>
        </div>
      </div>
    </div>
  )
}