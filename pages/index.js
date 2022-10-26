import Layout from "../components/Layout"
import PickCategory from "../components/PickCategory"
import { API_URL } from '../config/index'

export default function Home({ products }) {
  return (
    <Layout>
      <PickCategory products={products} />
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