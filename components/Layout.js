import Header from './Header'
import Footer from './Footer'
import styles from '../styles/LayoutStyling.module.css'
import Head from 'next/head'

export default function Layout({ title, keywords, description, children }) {
  return (    
    <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='keywords' content={keywords} />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Header />
          {children}
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'Tech eCommerce',
  keywords: 'technology mobile laptop computer stylish modern company-name',description: 'Tech eCommerce site made using Nextjs and Strapi headless CMS'
}