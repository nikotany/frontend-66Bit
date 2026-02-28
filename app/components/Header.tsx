import Logo from '../assets/logo.svg?react'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
    return(
        <div className="bg-[#FFFFFF] shadow-custom relative z-50 flex justify-between layout-shell">
            <div className='pt-6.25 pb-6'>
                <Logo className='xs:w-[0.515]'/>
            </div>
            <div className="3xl:flex gap-12">
                <div className="hidden xs:hidden 3xl:flex gap-16 items-center ">
                    <a href="tel:+7 343 290 84 76" className="text-[18px] cursor-pointer">+7 343 290 84 76</a>
                    <a href="mailto:info@66bit.ru" className="text-[18px] cursor-pointer">info@66bit.ru</a>
                </div>
                <ThemeSwitch/>
            </div>
        </div>
    )
}

export default Header