import { useLocation, useNavigate } from 'react-router';
import ChevronRight from '../assets/ChevronRight.svg?react'
import { useAppSelector } from '~/store/hooks';


const Navigation = () => {
    const navItems = ['Главная', 'Список сотрудников']
    const location = useLocation()
    const navigate = useNavigate()

    const isUserPage = location.pathname.includes('/employee/')

    const name = useAppSelector(state => state.employees.currentEmployee?.name)

    const allItems = (isUserPage && name) ? [...navItems, name] : navItems

    const handleItemClick = (item: string) => {
        if (item === 'Список сотрудников') {
            navigate('/')
        }
    }

    return(
        <div className='flex gap-4 py-[28px] bg-[#FFFFFF] layout-shell'>
            {allItems.map((item, index) => (
                <div key={index} className='flex gap-4 outline-none'>
                    {index > 0 && index < allItems.length && 
                    <span>
                        <ChevronRight/>
                    </span>}
                    <button 
                        className={`text-[18px] text-[#B0B0B0] font-medium tracking-[0.02rem] ${
                            (item === 'Список сотрудников') ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Navigation