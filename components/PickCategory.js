import styles from '../styles/PickCategory.module.css'
import CameraIcon from '../public/icons/device-camera-image.svg'
import ComputerIcon from '../public/icons/device-computer.svg'
import AudioIcon from '../public/icons/device-earphone-headphone.svg'
import LaptopIcon from '../public/icons/device-laptop-notebook.svg'
import MicIcon from '../public/icons/device-microphone-voice.svg'
import MouseIcon from '../public/icons/device-mouse-cursor.svg'
import DownArrow from '../public/icons/down-arrow.svg'
import Phone from '../public/icons/device-smartphone.svg'
import ProductsContext from '../context/ProductsContext'
import { useContext, useState } from 'react'

export default function PickCategory() {
  const { applyFilters, clearFilters, applied, setApplied } = useContext(ProductsContext)

  const [clicked, setClicked] = useState(false)

  const handleCategoryClick = (category) => {
    setApplied({ ...applied, [category]: !applied[category] })      
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
          <div className={styles.header}>
              <p>All Products</p>
              <h2>What type of product are you looking for?</h2>
          </div>
          <div className={styles['categories-container']}>

              <div 
                className={`${styles.categories} ${clicked ? styles['categories-expand'] : ''}`}
              >
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Computer')}
                    style={applied.Computer ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <ComputerIcon />
                      <p>Computers</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Laptop')}
                    style={applied.Laptop ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <LaptopIcon />
                      <p>Laptops</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Mobile')}
                    style={applied.Mobile ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <Phone />
                      <p>Mobile</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Audio')}
                    style={applied.Audio ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <AudioIcon />
                      <p>Audio</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Recording')}
                    style={applied.Recording ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <MicIcon />
                      <p>Recording</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Accessories')}
                    style={applied.Accessories ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <MouseIcon />
                      <p>Accessories</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => handleCategoryClick('Photography')}
                    style={applied.Photography ? { backgroundColor: 'rgba(0, 106, 245, .5)' } : {} }
                  >
                      <CameraIcon />
                      <p>Photography</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => applyFilters(applied)}
                  >
                      <p>Apply</p>
                  </div>
                  <div 
                    className={styles.category}
                    onClick={() => clearFilters()}
                  >
                      <p>Clear</p>
                  </div>
              </div>

              <div 
                className={`${styles['view-more']}
                ${clicked ? styles.transform : ''}`}
                onClick={() => setClicked(!clicked)}
              >
                  <DownArrow />
              </div>
          </div>
        </div>
    </div>
  )
}