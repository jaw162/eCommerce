import styles from '../styles/ProductsView.module.css'
import DownArrow from '../public/icons/down-arrow.svg'
import { useState, useEffect } from 'react'
import sortFn from '../utils/sortingFunctions'
import Pagination from './Pagination'

export default function ProductsView({ products, allItemsLength }) {

  const [isClicked, setClicked] = useState(false)
  
  const [perPage, setPerPage] = useState(5)

  const [activeSort, setSortStatus] = useState('')

  const style = { backgroundColor: 'darkgray' }
  
  const [items, setItems] = useState([])

  const setActive = (sort) => {
    setItems(sortFn[sort](products))
    setSortStatus(sort)
  }

  useEffect(() => {
    setItems(products)
    setSortStatus('')
  }, [products])

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
        <div className={styles['products-header']}>
            <p>{allItemsLength} results</p>
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
  )
}