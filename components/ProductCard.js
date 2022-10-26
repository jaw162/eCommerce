import Image from 'next/image'
import Link from  'next/link'
import styles from '../styles/ProductCard.module.css'
import SkelProductCard from './SkelProductCard'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { attributes: productInfo } = product
  const { formats: image } = product.attributes.Image.data[0].attributes

  const [finishedLoading, setFinished] = useState(false)

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className={styles.container}>
          <div className={styles.image}>
            <Image 
              src={image.medium.url}
              alt={productInfo.name}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              onLoad={() => setFinished(true)}
              unoptimized
            />
          </div>
          <div className={styles.info}>  
            <p>{productInfo.Name}</p>
            <p>£{productInfo.Price}</p>
          </div>
        {finishedLoading ? null : <SkelProductCard />}
      </a>
    </Link>
  )
}