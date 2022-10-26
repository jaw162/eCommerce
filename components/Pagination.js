import { useEffect, useState } from "react"
import styles from '../styles/Pagination.module.css'
import ProductCard from "./ProductCard"

export default function Pagination({ array, perPage }) {

  const TOTAL_PAGES = Math.ceil(array.length / perPage)

  const [currentPage, setPage] = useState(1)
  const [items, setItems] = useState([])
  
  useEffect(() => {
    const nextPage = array.slice(0, (perPage * currentPage))
    setItems(nextPage)
  }, [currentPage])

  useEffect(() => {
    setPage(1)
    const initial = array.slice(0, (perPage * currentPage))
    setItems(initial)
  }, [array])

  return (
    <div className={styles.container}>
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
        {currentPage < TOTAL_PAGES && 
        <button 
          onClick={() => setPage(currentPage + 1)}
          className={styles.btn}
        >View More</button>}
    </div>
  )
}