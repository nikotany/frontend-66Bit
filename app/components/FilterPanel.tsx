import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import DropdownFilter from './ui/DropdownFilter'
import { EMPLOYEES_GENDER, EMPLOYEES_POSITION, EMPLOYEES_STACK } from '~/constans/filterConstans'
import Button from './ui/Button';
import Cancel from '../assets/cancel.svg?react';
import { useAppDispatch } from '~/store/hooks';
import { getEmployees } from '~/store/slices/employeesSlice';
import type { Gender, Position, Technology } from '~/api-client';

interface FilterState {
    position: string[];
    gender: string[];
    stack: string[];
}

const FILTERS_STORAGE_KEY = 'employeeFilters';

const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const [, setSearchParams] = useSearchParams()
    const [openFilter, setOpenFilter] = useState<string | null>(null)
    const [filters, setFilters] = useState<FilterState>({
        position: [],
        gender: [],
        stack: []
    })
    const [name, setName] = useState<string>('')
    const [isInitialized, setIsInitialized] = useState(false)

    // Функция для восстановления и применения сохраненных фильтров
    const applyLoadedFilters = (parsed: { position?: string[]; gender?: string[]; stack?: string[]; name?: string }) => {
        setFilters({
            position: parsed.position || [],
            gender: parsed.gender || [],
            stack: parsed.stack || []
        })
        setName(parsed.name || '')
        
        const params = {
            page: 1,
            count: 10,
            name: parsed.name || undefined,
            gender: parsed.gender?.length ? (parsed.gender as Gender[]) : undefined,
            position: parsed.position?.length ? (parsed.position as Position[]) : undefined,
            stack: parsed.stack?.length ? (parsed.stack as Technology[]) : undefined,
        }
        
        dispatch(getEmployees(params))
        
        // Обновляем URL
        const urlParams = new URLSearchParams()
        if (parsed.name) urlParams.set('name', parsed.name)
        if (parsed.position?.length) urlParams.set('position', parsed.position.join(','))
        if (parsed.gender?.length) urlParams.set('gender', parsed.gender.join(','))
        if (parsed.stack?.length) urlParams.set('stack', parsed.stack.join(','))
        setSearchParams(urlParams, { replace: true })
    }

    // Восстановление фильтров из LocalStorage при монтировании
    useEffect(() => {
        const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY)
        
        if (savedFilters) {
            try {
                const parsed = JSON.parse(savedFilters)
                applyLoadedFilters(parsed)
            } catch (error) {
                console.error('Ошибка при загрузке фильтров:', error)
                dispatch(getEmployees({page: 1, count: 10}))
            }
        } else {
            // Если нет сохраненных фильтров, загружаем начальный список
            dispatch(getEmployees({page: 1, count: 10}))
        }
        
        setIsInitialized(true)
    }, [])

    // Сохранение фильтров при изменении (БЕЗ запроса данных)
    useEffect(() => {
        if (!isInitialized) return
        
        const filtersToSave = {
            position: filters.position,
            gender: filters.gender,
            stack: filters.stack,
            name: name
        }
        
        localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filtersToSave))
        
        // Обновляем URL
        const urlParams = new URLSearchParams()
        if (name) urlParams.set('name', name)
        if (filters.position.length) urlParams.set('position', filters.position.join(','))
        if (filters.gender.length) urlParams.set('gender', filters.gender.join(','))
        if (filters.stack.length) urlParams.set('stack', filters.stack.join(','))
        setSearchParams(urlParams, { replace: true })
    }, [filters, name, isInitialized, setSearchParams])

    const handleFilterToggle = (filterName: string) => {
        setOpenFilter(prevValue => prevValue === filterName ? null : filterName)
    }

    const handleFilterChange = (filterType: keyof FilterState, values: string[]) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: values
        }))
    }

    const getLabel = (value: string) => {
        const allOptions = [...EMPLOYEES_POSITION, ...EMPLOYEES_GENDER, ...EMPLOYEES_STACK]
        const found = allOptions.find(option => option.value === value)
        return found ? found.label : value
    }

    const handleFind = () => {
        const params = {
            page: 1,
            count: 10,
            name: name?.trim() || undefined,
            gender: filters.gender.length ? (filters.gender as unknown as Gender[]) : undefined,
            position: filters.position.length ? (filters.position as unknown as Position[]) : undefined,
            stack: filters.stack.length ? (filters.stack as unknown as Technology[]) : undefined,
        }

        dispatch(getEmployees(params))
    }

    const handleFilterClick = (filterType: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].filter(item => item !== value)
        }))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleFind()
        }
    }

    return (
        <div className='flex flex-col gap-7 bg-[#FFFFFF]'>
            <div className='flex justify-between pt-4 items-center'>
                <h1 className='text-[40px] font-bold'>Список сотрудников</h1>
                <div className='flex gap-8'>
                    <DropdownFilter 
                        titleFilter='Должность' 
                        options={EMPLOYEES_POSITION} 
                        isOpen={openFilter === 'position'} 
                        onToggle={() => handleFilterToggle('position')}
                        selectedValues={filters.position}
                        onFilterChange={(values) => handleFilterChange('position', values)}/>
                    <DropdownFilter 
                        titleFilter='Пол' 
                        options={EMPLOYEES_GENDER} 
                        isOpen={openFilter === 'gender'}
                        onToggle={() => handleFilterToggle('gender')}
                        selectedValues={filters.gender}
                        onFilterChange={(values) => handleFilterChange('gender', values)}/>
                    <DropdownFilter 
                        titleFilter='Стек технологий' 
                        options={EMPLOYEES_STACK} 
                        isOpen={openFilter === 'stack'}
                        onToggle={() => handleFilterToggle('stack')}
                        selectedValues={filters.stack}
                        onFilterChange={(values) => handleFilterChange('stack', values)}/>
                </div>
            </div>
            <div>
                <input 
                className='w-full border-[0.5px] border-[#B0B0B0] rounded-[5px] p-2.5 cursor-pointer focus:border-[#155DA4] focus:placeholder:text-[#818181] outline-none '
                type="text"
                placeholder='Поиск'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown} />
            </div>
            <div className='bg-[#F2F2F2] py-[13px] flex justify-between items-center'>
                <div className='flex gap-[40px] items-center'>
                    <div className='text-sm font-medium'>Выбранные фильтры:</div>
                    <div className='flex flex-wrap gap-[23px]'>
                        {Object.keys(filters).map((key) => {
                            const values = filters[key as keyof FilterState]
                            return values.map((v) => (
                                <button onClick={() => handleFilterClick(key as keyof FilterState, v)} key={`${key}-${v}`} className='flex gap-2.5 items-center p-2.5 bg-[#FFFFFF] rounded-[5px] text-[16px] cursor-pointer'>
                                    {<Cancel />}
                                    {getLabel(v)}
                                </button>
                            ))
                        })}
                    </div>
                </div>
                <Button content='Найти' onClick={handleFind} />
            </div>
        </div>
    )
}

export default FilterPanel
