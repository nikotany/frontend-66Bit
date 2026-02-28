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

    // Не рендерим иконку до монтирования, чтобы избежать hydration mismatch
    if (!mounted) {
        return (
            <button className='cursor-pointer w-6 h-6'>
                {/* Пустая кнопка с фиксированным размером */}
            </button>
        )
    }

    return(
        <button
            onClick={toggleTheme}
            className='cursor-pointer'
        >
            {theme === 'light' ? (
                <Moon className='xs:h-[0.8545]' />
            ) : (
                <Sun className='xs:h-[0.8545]'/>
            )}
        </button>
    )
}

export default ThemeSwitch