import EmployeesTable from '~/components/EmployeesTable'
import FilterPanel from '~/components/FilterPanel'

const ListUsers = () => {
  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 z-20 bg-white'>
        <FilterPanel/>
      </div>
      <div className='flex-1 overflow-y-auto layout-shell'>
        <EmployeesTable />
      </div>
    </div>
  )
}

export default ListUsers
