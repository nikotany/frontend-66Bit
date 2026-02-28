import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeApi, Gender, Position, Technology, type Employee } from "~/api-client";

const employeeApi = new EmployeeApi();

interface GetEmployeesParams {
    page?: number;
    count?: number;
    name?: string;
    gender?: Gender[];
    position?: Position[];
    stack?: Technology[];
    append?: boolean;
}

const sanitizeEmployeesParams = (params: GetEmployeesParams): GetEmployeesParams => {
    const trimmedName = params.name?.trim();

    return {
        page: params.page,
        count: params.count,
        name: trimmedName || undefined,
        gender: params.gender?.length ? params.gender : undefined,
        position: params.position?.length ? params.position : undefined,
        stack: params.stack?.length ? params.stack : undefined,
        append: params.append,
    };
}


interface EmployeeState{
    employeeList: Employee[];
    currentEmployee: Employee | null;
    status: string;
    error: string | null;
    filters: GetEmployeesParams;
    currentPage: number;
    hasMore: boolean;
}

const initialState: EmployeeState = {
    employeeList: [],
    currentEmployee: null,
    status: 'idle',
    error: null,
    filters: {
        page: 1,
        count: 10,
    },
    currentPage: 1,
    hasMore: true
}

export const getEmployees = createAsyncThunk(
    'employees/getList',
    async (params: GetEmployeesParams, {rejectWithValue}) => {
        try{
            const sanitizedParams = sanitizeEmployeesParams(params)
            const {page, count, name, gender, position, stack} = sanitizedParams;
            return (await employeeApi.apiEmployeeGet(page, count, name, gender, position, stack)).data

        }catch(error: unknown){
            if (error instanceof Error)
                console.error(error.message)
            return rejectWithValue(`Ошибка при получении списка сотрудников ${error}`)
        }
    }
)

export const getEmployeeById = createAsyncThunk(
    'employee/getById',
    async(id: number, {rejectWithValue}) => {
        try{
           return (await employeeApi.apiEmployeeIdGet(id)).data
        }catch(error: unknown){
            if(error instanceof Error)
                console.error(error.message)
            return rejectWithValue(`Ошибка при получении данных сотрудника по id ${error}`)
        }
    }
)

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(getEmployees.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const isAppend = action.meta.arg?.append;
                
                if (isAppend) {
                    // Фильтруем дубликаты по ID
                    const existingIds = new Set(state.employeeList.map(emp => emp.id));
                    const newEmployees = action.payload.filter(emp => !existingIds.has(emp.id));
                    state.employeeList = [...state.employeeList, ...newEmployees];
                    state.currentPage += 1;
                } else {
                    state.employeeList = action.payload;
                    state.currentPage = 1;
                }
                
                state.hasMore = action.payload.length >= (state.filters.count || 10);
                
                if (action.meta.arg) {
                    const { append, ...filterParams } = sanitizeEmployeesParams(action.meta.arg);
                    state.filters = { ...state.filters, ...filterParams };
                }
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getEmployeeById.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEmployeeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentEmployee = action.payload;
            })
            .addCase(getEmployeeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    },
})

export default employeesSlice.reducer;