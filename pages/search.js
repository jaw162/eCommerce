import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { API_URL } from "../config"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import styles from '../styles/Search.module.css'
import Link from 'next/link'

export default function SearchPage({ products }) {
  const router = useRouter()
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (router.query.term) {
      setFiltered(products
        .filter(product => (
          product.attributes.Name.toLowerCase().includes(router.query.term.toLowerCase())
        ))
        .map(product => (
          <ProductCard key={product.id} product={product} />
        )))
    }
  }, [router.query.term, products])

  const Unavailable = () => {
    return (
      <div className={styles['message-box']}>
        <h3>Sorry, we couldn&apos;t find &quot;{router.query.term}&quot;</h3>
        <Link href='/'><a>Back to home?</a></Link>
      </div>
    )
  }
  
  return (
    <Layout>
      <div className={styles.wrap}>
        {filtered.length === 0 ? <Unavailable /> : filtered}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/products?populate=*`)
    const { data: products } = await res.json()
    
    return {
      props: { products: products },
      revalidate: 62,
    }
  }