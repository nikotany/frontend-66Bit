import { useLocation, useNavigate } from 'react-router';
import ChevronRight from '../assets/ChevronRight.svg?react'
import { useAppSelector } from '~/store/hooks';


const Navigation = () => {
    const navItems = ['Главная', 'Список сотрудников']
    const location = useLocation()
    const navigate = useNavigate()

    const isUserPage = location.pathname.includes('/employee/')
    const isMainPage = location.pathname === '/'

    const name = useAppSelector(state => state.employees.currentEmployee?.name)

    const getMobileItems = () => {
        if (isMainPage) return navItems
        if (isUserPage && name) return ['Список сотрудников', name]
        return navItems
    }

    const mobileItems = getMobileItems()
    const desktopItems = (isUserPage && name) ? [...navItems, name] : navItems

    const handleItemClick = (item: string) => {
        if (item === 'Список сотрудников') {
            navigate('/')
        }
    }

    return(
        <div className='flex gap-[12px] lg:gap-[16px] py-[15px] lg:py-[28px] bg-[#FFFFFF] layout-shell items-center'>
            {mobileItems.map((item, index) => (
                <>
                    {index > 0 && 
                    <span key={`mobile-chevron-${index}`} className='flex-shrink-0 lg:hidden'>
                        <ChevronRight className='w-[12px]'/>
                    </span>}
                    <button 
                        key={`mobile-${item}-${index}`}
                        className={`lg:hidden text-[12px] text-[#B0B0B0] font-medium tracking-[0.02rem] outline-none ${
                            item === name ? 'overflow-hidden text-ellipsis whitespace-nowrap' : 'whitespace-nowrap'
                        } ${
                            (item === 'Список сотрудников') ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </button>
                </>
            ))}
            {desktopItems.map((item, index) => (
                <>
                    {index > 0 && 
                    <span key={`desktop-chevron-${index}`} className='hidden lg:flex'>
                        <ChevronRight/>
                    </span>}
                    <button 
                        key={`desktop-${item}-${index}`}
                        className={`hidden lg:block text-[18px] text-[#B0B0B0] font-medium tracking-[0.02rem] outline-none ${
                            item === name ? 'overflow-hidden text-ellipsis whitespace-nowrap' : 'whitespace-nowrap'
                        } ${
                            (item === 'Список сотрудников') ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </button>
                </>
            ))}
        </div>
    )
}

export default Navigation