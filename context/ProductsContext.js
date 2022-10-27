import { createContext, useState, useEffect } from "react"
import sortFn from '../utils/sortingFunctions'

const ProductsContext = createContext()

export const ProductsProvider = ({ children, products }) => {

    const [items, setItems] = useState(products)

    const [activeSort, setSortStatus] = useState('')

    const [applied, setApplied] = useState({
      Computer: false,
      Laptop: false,
      Mobile: false,
      Audio: false,
      Recording: false,
      Accessories: false,
      Photography: false,
    })

    const setActive = (sort) => {
      setItems(sortFn[sort](items))
      setSortStatus(sort)
    }

    useEffect(() => {
        const filters = JSON.parse(sessionStorage.getItem('filters'))
        if (filters) {    
            setApplied(filters)
            applyFilters(filters)
        }
        const sort = JSON.parse(sessionStorage.getItem('sort'))
        if (sort) {    
            setSortStatus(sort)
            setItems((prev) => sortFn[sort](prev))
        }
    }, [])

    useEffect(() => {
        saveToSessionStorage('filters', applied)
    }, [applied])

    useEffect(() => {
        saveToSessionStorage('sort', activeSort)
    }, [activeSort])

    const saveToSessionStorage = (name, values) => {
        sessionStorage.setItem(`${name}`, JSON.stringify(values))
    }

    const applyFilters = (applied) => {
        const allFilters = Object.entries(applied).filter(filter => (
            filter[1] === true
        ))
        if (allFilters.length === 0) {
            setItems(products)
            setSortStatus('')
            return
        }
        const filtered = products.filter(product => (
        allFilters.some(filter => filter[0] === product.attributes.Category)
        ))
        setItems(filtered)
        setSortStatus('')
    }

    const clearFilters = () => {
      const categories = Object.keys(applied)
      categories.forEach(category => (
        setApplied((prev) => ({ ...prev, [category]: false }))
      ))
    }

    return (
        <ProductsContext.Provider value={{ applyFilters, setActive, activeSort, items, clearFilters, applied, setApplied }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext