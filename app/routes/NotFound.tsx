import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-8 layout-shell'>
      <h1 className='text-[80px] font-bold text-[#155DA4]'>404</h1>
      <h2 className='text-[32px] font-semibold text-[#292929]'>Страница не найдена</h2>
      <p className='text-[18px] text-[#B0B0B0] text-center'>
        К сожалению, запрашиваемая страница не существует или была удалена
      </p>
      <button
        onClick={() => navigate('/')}
        className='mt-4 px-8 py-3 bg-[#155DA4] text-white text-[18px] font-medium rounded-[5px] hover:bg-[#0f4a87] transition-colors cursor-pointer'
      >
        Вернуться на главную
      </button>
    </div>
  )
}

export default NotFound
