import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { getEmployeeById } from '~/store/slices/employeesSlice'

const EmployeeData = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {employeeId} = useParams<{employeeId: string}>()
    const employeeData = useAppSelector(state => state.employees.currentEmployee)
    const status = useAppSelector(state => state.employees.status)
    const error = useAppSelector(state => state.employees.error)

    useEffect(() => {
        if (employeeId) {
            dispatch(getEmployeeById(Number(employeeId)))
        }
    }, [dispatch, employeeId])

    if (status === 'loading') {
        return (
            <div className='flex justify-center items-center'>
                <div className="text-center py-20 text-[18px] text-[#B0B0B0] font-medium">
                    Загрузка...
                </div>
            </div>
        )
    }

    if (status === 'failed' && error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-8'>
                <h2 className='text-[32px] font-semibold text-[#292929]'>Ошибка загрузки данных</h2>
                <div className='flex gap-4'>
                    <button
                        onClick={() => dispatch(getEmployeeById(Number(employeeId)))}
                        className='px-6 py-3 bg-[#155DA4] text-white text-[16px] font-medium rounded-[5px] hover:bg-[#0f4a87] transition-colors cursor-pointer'
                    >
                        Попробовать снова
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className='px-6 py-3 border border-[#155DA4] text-[#155DA4] text-[16px] font-medium rounded-[5px] hover:bg-[#f5f5f5] transition-colors cursor-pointer'
                    >
                        Вернуться к списку
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'succeeded' && !employeeData) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-8'>
                <div className='text-[64px]'>👤</div>
                <h2 className='text-[32px] font-semibold text-[#292929]'>Сотрудник не найден</h2>
                <p className='text-[18px] text-[#B0B0B0] text-center max-w-md'>
                    К сожалению, сотрудник с ID {employeeId} не найден в системе
                </p>
                <button
                    onClick={() => navigate('/')}
                    className='px-6 py-3 bg-[#155DA4] text-white text-[16px] font-medium rounded-[5px] hover:bg-[#0f4a87] transition-colors cursor-pointer'
                >
                    Вернуться к списку сотрудников
                </button>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-10] mt-4'>
            <div className='border-b border-b-[#F2F2F2] mt-4 pb-10 flex gap-[42px]'>
                <img src={employeeData?.photo} alt={employeeData?.name} className='w-[163px] h-[163px] object-cover rounded-full'/>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='font-bold text-[40px]'>{employeeData?.name}</h1>
                        <span className='text-[24px] font-medium'>{employeeData?.position}</span>
                    </div>
                    <div className='flex gap-4 flex-wrap'>
                        {employeeData?.stack.map((tech, index) => (
                            <div className='bg-[#F2F2F2] py-2.5 rounded-[5px] text-[16px] px-4.5' key={`${tech}-${index}`}>{tech}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <h2 className='font-semibold text-[32px]'>Основная информация</h2>
                <div className='flex gap-11'>
                    <div className='flex flex-col gap-6'>
                        <span className='text-[24px] font-medium'>Контактный телефон:</span>
                        <span className='text-[24px] font-medium'>Дата рождения:</span>
                        <span className='text-[24px] font-medium'>Дата устройства:</span>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <span className='text-[24px] font-normal'>{employeeData?.phone}</span>
                        <span className='text-[24px] font-normal'>{employeeData?.birthdate}</span>
                        <span className='text-[24px] font-normal'>{employeeData?.dateOfEmployment}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeData
