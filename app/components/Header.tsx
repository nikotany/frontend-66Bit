import Logo from '../assets/logo.svg?react'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
    return(
        <div className="bg-[#FFFFFF] min-w-[272px] 2xl:w-[1560px] shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] xl:shadow-custom relative z-50 flex justify-between layout-shell items-center">
            <div className='py-[16px] lg:pt-[25px] lg:pb-[24px]'>
                <Logo className='w-[51.5%] lg:w-full'/>
            </div>
            <div className="flex gap-12 items-center">
                <div className="hidden min-[1100px]:flex gap-16 items-center">
                    <a href="tel:+7 343 290 84 76" className="text-[18px] cursor-pointer">+7 343 290 84 76</a>
                    <a href="mailto:info@66bit.ru" className="text-[18px] cursor-pointer">info@66bit.ru</a>
                </div>
                <ThemeSwitch/>
            </div>
        </div>
    )
}

export default Header