import Image from 'next/image'
import Link from  'next/link'
import styles from '../styles/ProductCard.module.css'

export default function ProductCard({ product }) {
  const { attributes: productInfo } = product
  const { formats: image } = product.attributes.Image.data[0].attributes

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
              unoptimized
            />
          </div>
          <div className={styles.info}>  
            <p>{productInfo.Name}</p>
            <p>£{productInfo.Price}</p>
          </div>
      </a>
    </Link>
  )
}