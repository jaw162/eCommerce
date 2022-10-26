import { useEffect, useState } from 'react'

export const useScrollingUp = () => {
    let prevScroll
    
    if (typeof window !== 'undefined') {
        prevScroll = window.pageYOffset
    }

    const [scrollingUp, setScrollingUp] = useState(false)

    const handleScroll = () => {
        const currScroll = window.pageYOffset;
        const isScrolled = prevScroll > currScroll;
        setScrollingUp(isScrolled)
        prevScroll = currScroll
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return scrollingUp
};