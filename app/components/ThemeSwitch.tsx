import { useEffect, useState } from 'react'
import Moon from '../assets/Moon.svg?react'
import Sun from '../assets/Sun.svg?react'

const ThemeSwitch = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (globalThis.window !== undefined) {
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        if (globalThis.window !== undefined && mounted) {
            const root = document.documentElement
            if (theme === 'dark') {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }
            localStorage.setItem('theme', theme)
        }
    }, [theme, mounted])

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
    }

    if (!mounted) {
        return (
            <button className='cursor-pointer w-6 h-6'></button>
        )
    }

    return(
        <button
            onClick={toggleTheme}
            className='cursor-pointer'
        >
            {theme === 'light' ? (
                <Moon className='w-[85.45%] lg:[w-full]' />
            ) : (
                <Sun className='w-[85.45%]'/>
            )}
        </button>
    )
}

export default ThemeSwitch