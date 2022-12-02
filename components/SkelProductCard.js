import styles from '../styles/SkelProductCard.module.css'

export default function SkelProductCard() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
          <div className={styles.image}>
          </div>
          <div className={styles['text-container']}>
              <div className={styles.text}>
              </div>
              <div className={styles.text}>
              </div>
          </div>
        </div>
    </div>
  )
}