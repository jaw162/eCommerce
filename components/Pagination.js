import { useEffect, useState, useLayoutEffect } from "react"
import styles from '../styles/Pagination.module.css'
import ProductCard from "./ProductCard"
import { useRouter } from 'next/router'
import { getPositionFromStorage } from "../utils/rememberScrollPosition"

export default function Pagination({ array, perPage }) {
  const totalPages = Math.ceil(array.length / perPage)

  const router = useRouter()

  const [currentPage, setPage] = useState(1)
  const [items, setItems] = useState([])

  useLayoutEffect(() => {
    const pageNumber = sessionStorage.getItem('page')
    if (pageNumber) {
      setPage(Number(pageNumber))
    }
  }, [])
  
  useLayoutEffect(() => {
    const nextPage = array.slice(0, (perPage * currentPage))
    setItems(nextPage)
    sessionStorage.setItem('page', currentPage)
  }, [currentPage, array, perPage])

  useEffect(() => {
    if (getPositionFromStorage()) window.scrollTo(0, getPositionFromStorage())
  }, [items])

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