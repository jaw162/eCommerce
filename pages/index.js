import Layout from "../components/Layout"
import PickCategory from "../components/PickCategory"
import ProductsView from "../components/ProductsView"
import { ProductsProvider } from "../context/ProductsContext"
import { API_URL } from '../config/index'

export default function Home({ products }) {
  return (
    <Layout>
      <ProductsProvider products={products}>
        <PickCategory />
        <ProductsView />
      </ProductsProvider>
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