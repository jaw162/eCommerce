import styles from '../styles/ProductsView.module.css'
import DownArrow from '../public/icons/down-arrow.svg'
import ProductsContext from '../context/ProductsContext'
import { useContext, useState, useEffect } from 'react'
import Pagination from './Pagination'

export default function ProductsView() {
  const { setActive, activeSort, items } = useContext(ProductsContext)

  const [isClicked, setClicked] = useState(false)
  
  const [perPage, setPerPage] = useState(5)

  const style = { backgroundColor: 'darkgray' }

  useEffect(() => {
    const twoColumns = window.matchMedia('(min-width: 520px)').matches
    if (twoColumns) {
      setPerPage(6)
    }
    const threeColumns = window.matchMedia('(min-width: 809px)').matches
    if (threeColumns) {
      setPerPage(9)
    }
    const fourColumns = window.matchMedia('(min-width: 1050px)').matches
    if (fourColumns) {
      setPerPage(12)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles['products-header']}>
            <p>{items.length} results</p>
            <div 
              className={styles['sort-btn']}
              onClick={() => setClicked(!isClicked)}
            >
              <p>Sort</p>
              <div className={isClicked ? `${styles.transform} ${styles.svg}` : styles.svg}>
                <DownArrow />
              </div>
            </div>
            <div className={isClicked ? 
              `${styles.options} ${styles.show}` :
              styles.options}>
              <button 
                onClick={() => setActive('sortAToZ')}
                style={activeSort === 'sortAToZ' ? style : {}}
              >A-Z</button>
              <button 
                onClick={() => setActive('sortZToA')}
                style={activeSort === 'sortZToA' ? style : {}}
              >Z-A</button>
              <button 
                onClick={() => setActive('sortHToL')}
                style={activeSort === 'sortHToL' ? style : {}}
              >Price H-L</button>
              <button 
                onClick={() => setActive('sortLToH')}
                style={activeSort === 'sortLToH' ? style : {}}
              >Price L-H</button>
            </div>
        </div>
        <Pagination array={items} perPage={perPage} />
      </div>
    </div>
  )
}