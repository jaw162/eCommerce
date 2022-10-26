import { createContext, useState, useEffect } from "react"

const BasketContext = createContext()

export const BasketProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState({ price: 0, quantity: 0 })
    const [basketOpen, setOpen] = useState(false)

    useEffect(() => {
        setTotal((prev) => ({ ...prev, price: calculateTotal() }))
        setTotal((prev) => ({ ...prev, quantity: calculateTotalProducts() }))
    }, [items])

    useEffect(() => {
        if  (typeof window !== 'undefined') {
            let products = JSON.parse(window.localStorage.getItem('basket'))
            if (products) {    
                setItems(products)
            }
        }
    }, [])

    const addItem = (product) => {
        let formattedProduct = createBasketProduct(product)
        let updated = items.concat(formattedProduct)
        setItems(updated)
        window.localStorage.setItem('basket', JSON.stringify(updated))
    }

    const increaseQuantity = (productId) => {
        const updated = items.map(item => {
            if (item.id === productId) {
                return {...item, quantity: item.quantity + 1}
            } else {
                return item
            }
        })
        setItems(updated)
        window.localStorage.setItem('basket', JSON.stringify(updated))
    }

    const decreaseQuantity = (productId) => {
        const product = items.find(item => item.id === productId)
        if (product.quantity === 1) return

        const updated = items.map(item => {
            if (item.id === productId) {
                return {...item, quantity: item.quantity - 1}
            } else {
                return item
            }
        })
        setItems(updated)
        window.localStorage.setItem('basket', JSON.stringify(updated))
    }

    const createBasketProduct = (product) => {
        const productInfo = {
            id: product.id,
            name: product.attributes.Name,
            price: product.attributes.Price,
            image: product.attributes.Image.data[1].attributes.formats.thumbnail.url,
            quantity: 1
        }
        return productInfo
    }

    const calculateTotal = () => {
        const total = items.reduce((a, b) => (
            a + (b.price * b.quantity)
        ), 0)

        return total.toFixed(2)
    }

    const calculateTotalProducts = () => {
        const total = items.reduce((a, b) => (
            a + b.quantity
        ), 0)

        return total
    }

    const removeItem = (productId) => {
        let updated = items.filter(item => item.id !== productId)
        setItems(updated)
        window.localStorage.setItem('basket', JSON.stringify(updated))
    }

    return (
        <BasketContext.Provider value={{ items, addItem, increaseQuantity, decreaseQuantity, total, removeItem, setOpen, basketOpen }}>
            {children}
        </BasketContext.Provider>
    )
}

export default BasketContext