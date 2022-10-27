import { useEffect, useState } from "react"
import styles from '../styles/Pagination.module.css'
import ProductCard from "./ProductCard"

export default function Pagination({ array, perPage }) {
  const totalPages = Math.ceil(array.length / perPage)

  const [currentPage, setPage] = useState(1)
  const [items, setItems] = useState([])

  useEffect(() => {
    const pageNumber = sessionStorage.getItem('page')
    if (pageNumber) {
      setPage(Number(pageNumber))
    }
  }, [])
  
  useEffect(() => {
    const nextPage = array.slice(0, (perPage * currentPage))
    setItems(nextPage)
    sessionStorage.setItem('page', currentPage)
  }, [currentPage, array, perPage])

  return (
    <div className={styles.container}>
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
        {currentPage < totalPages && 
        <button 
          onClick={() => setPage(currentPage + 1)}
          className={styles.btn}
        >View More</button>}
    </div>
  )
}