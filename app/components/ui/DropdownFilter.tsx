import Button from "./Button";
import ListOpen from '../../assets/ListOpen.svg?react'
import ListClose from '../../assets/ListClose.svg?react'
import { useEffect, useRef } from "react";

type DropdownFilterProps = {
    titleFilter: string;
    options: Array<{value: string, label: string}>;
    isOpen: boolean;
    onToggle: () => void;
    selectedValues: string[];
    onFilterChange: (values: string[]) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({titleFilter, options, isOpen, selectedValues, onFilterChange, onToggle}) => {

    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleCheckboxChange = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value]
        onFilterChange(newSelectedValues)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                if (isOpen) {
                    onToggle()
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onToggle])

    return (
        <div className="relative" ref={dropdownRef}>
            <Button className={`${isOpen ? 'font-medium text-[12px] lg:text-[20px] text-[#155DA4]' : 'text-[12px] lg:text-[20px] text-[#292929]'} cursor-pointer`} onClick={onToggle} content={titleFilter} isImg image={isOpen ? <ListOpen className="filter-icon text-[#155DA4] dark:text-[#F5F5F5]"/> : <ListClose className="filter-icon text-[#155DA4] dark:text-[#F5F5F5]"/>}/>

            {isOpen && (
                <div className={`absolute top-full bg-[#FFFFFF] left-0 lg:right-0 mt-[7px] lg:mt-[8px] p-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]  border-t border-t-[#155DA4] z-50 flex flex-col gap-[12px] lg:gap-[16px] w-fit`}>
                    {options.map((option) => {
                        const isChecked = selectedValues.includes(option.value)
                        
                        return (
                            <label 
                                key={option.value} 
                                className="flex items-center cursor-pointer justify-between gap-[38px]"
                            >
                                <span className="text-[12px] font-normal lg:text-[16px] text-nowrap">{option.label}</span>
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox-custom"
                                        checked={isChecked}
                                        onChange={() => handleCheckboxChange(option.value)}
                                    />
                                </div>
                            </label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DropdownFilter
