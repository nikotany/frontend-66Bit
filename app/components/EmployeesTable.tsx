import { useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router"
import type { Employee } from "~/api-client"
import { useAppDispatch, useAppSelector } from "~/store/hooks"
import { getEmployees } from "~/store/slices/employeesSlice"
import { formatDate } from "~/utils/utils"

const EmployeesTable = () => {
    const dispatch = useAppDispatch()
    const {employeeList, currentPage, hasMore, status, error, filters} = useAppSelector((state) => state.employees)
    const navigate = useNavigate()
    const observerRef = useRef<IntersectionObserver | null>(null)
    const lastEmployeeRef = useRef<HTMLTableRowElement | null>(null)

    const loadMore = useCallback(() => {
        if (status === 'loading' || !hasMore) return
        
        dispatch(getEmployees({
            ...filters,
            page: currentPage + 1,
            count: 10,
            append: true
        }))
    }, [dispatch, currentPage, hasMore, status, filters])

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && status !== 'loading') {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        if (lastEmployeeRef.current) {
            observerRef.current.observe(lastEmployeeRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [employeeList, hasMore, status, loadMore])

    const hadnleRowTableClick = (employeeId: number) => {
        navigate(`/employee/${employeeId}`)
    }

    if (status === 'failed' && error) {
        return (
            <div className='mt-8'>
                <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <h2 className='text-[24px] font-semibold text-[#292929]'>Ошибка загрузки данных</h2>
                    <button
                        onClick={() => dispatch(getEmployees({ page: 1, count: 10 }))}
                        className='mt-4 px-6 py-2 bg-[#155DA4] text-white text-[16px] font-medium rounded-[5px] hover:bg-[#0f4a87] transition-colors cursor-pointer'
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        )
    }

    if (status === 'succeeded' && employeeList.length === 0) {
        return (
            <div>
                <p className='text-[18px] text-[#B0B0B0] text-center mt-25'>
                    По выбранным фильтрам не найдено ни одного сотрудника. Попробуйте изменить параметры поиска.
                </p>
            </div>
        )
    }

    if (status === 'loading' && employeeList.length === 0) {
        return (
            <div className='mt-8'>
                <div className="text-center py-20 text-[18px] text-[#B0B0B0] font-medium">
                    Загрузка...
                </div>
            </div>
        )
    }

    return (
        <div className='mt-[20px] lg:mt-1'>
            <div className='overflow-x-auto lg:overflow-x-visible'>
            <table className='w-full min-w-max lg:min-w-full' style={{ borderCollapse: 'collapse' }}>
                <thead >
                    <tr className="text-left">
                        <th className="py-[4px] lg:py-7 border-b border-b-[#F2F2F2] font-medium text-[10px] lg:text-[20px] text-[#B0B0B0] w-[100px] lg:w-auto max-w-[100px] lg:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">ФИО</th>
                        <th className="py-[4px] lg:py-7 border-b border-b-[#F2F2F2] font-medium text-[10px] lg:text-[20px] text-[#B0B0B0] w-[100px] lg:w-auto max-w-[100px] lg:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">Должность</th>
                        <th className="py-[4px] lg:py-7 border-b border-b-[#F2F2F2] font-medium text-[10px] lg:text-[20px] text-[#B0B0B0] w-[100px] lg:w-auto max-w-[100px] lg:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">Телефон</th>
                        <th className="py-[4px] lg:py-7 border-b border-b-[#F2F2F2] font-medium text-[10px] lg:text-[20px] text-[#B0B0B0] w-[100px] lg:w-auto max-w-[100px] lg:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">Дата рождения</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((employee: Employee, index) => (
                        <tr 
                            key={employee.id} 
                            onClick={() => hadnleRowTableClick(employee.id)} 
                            className='text-left hover:bg-[#F2F2F2] cursor-pointer'
                            ref={index === employeeList.length - 1 ? lastEmployeeRef : null}
                        >
                            <td className="py-[12px] pr-[28px] lg:pr-0 lg:py-[28px] border-b border-b-[#F2F2F2] text-[12px] lg:text-[20px] max-w-[120px] lg:max-w-none">{employee.name}</td>
                            <td className="py-[12px] pr-[28px] lg:pr-0 lg:py-[28px] border-b border-b-[#F2F2F2] text-[12px] lg:text-[20px] max-w-[120px] lg:max-w-none ">{employee.position}</td>
                            <td className="py-[12px] pr-[28px] lg:pr-0 lg:py-[28px] border-b border-b-[#F2F2F2] text-[12px] lg:text-[20px] max-w-[120px] lg:max-w-none text-nowrap">{employee.phone}</td>
                            <td className="py-[12px] pr-[28px] lg:pr-0 lg:py-[28px] border-b border-b-[#F2F2F2] text-[12px] lg:text-[20px] max-w-[120px] lg:max-w-none overflow-hidden text-ellipsis">{formatDate(employee.birthdate || '')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {status === 'loading' && employeeList.length > 0 && (
                <div className="text-center py-8 text-[18px] text-[#292929] font-medium">
                    Загрузка...
                </div>
            )}
        </div>
    )
}

export default EmployeesTable
