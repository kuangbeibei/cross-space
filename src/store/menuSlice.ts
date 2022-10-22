import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fechMenu } from '../api';
import menuData, { IPizza } from "../data/db";

export const getMenuData = createAsyncThunk(
    'menu/fetchMenu',
    async () => {
        const response = await fechMenu(menuData);
        return response.data;
    }
);

enum IStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    FAILED = 'failed',
}

export interface IMenuState {
    value: IPizza[];
    status: IStatus;
    selected: IPizza[];
    hasSelected: boolean
}

const initialState: IMenuState = {
    value: [],
    status: IStatus.IDLE,
    selected: [],
    hasSelected: false
};

const findItem = (menu: IPizza[], action: PayloadAction<{
    id: string,
}>) => {
    return menu.findIndex((pizza: IPizza) => pizza.id === action.payload.id);
};

// 判断用户输入的是否是数字
const isNumber = (num: any) => {
    return Object.prototype.toString.call(num) === '[object Number]' ? num : 0
}

const verifyNumber = (count: any) => {
    if (isNumber(count)) {
        if (count > 10) count = 10;
        if (count < 0) count = 0;
    } else {
        count = 0
    };
    return count;
}

const checkIfSelected = (menu: IPizza[]) => {
    return !!menu.find((item: IPizza) => item.count > 0);
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addByOne: (state, action: PayloadAction<{
            id: string,
        }>) => {
            const idx = findItem(state.value, action);
            const { count } = (state.value)[idx];
            (state.value)[idx].count = count >= 10 ? count : count + 1;
            state.hasSelected = checkIfSelected(state.value);
        },
        minusByOne: (state, action: PayloadAction<{
            id: string,
        }>) => {
            const idx = findItem(state.value, action);
            const { count } = (state.value)[idx];
            (state.value)[idx].count = count > 0 ? count - 1 : count;
            state.hasSelected = checkIfSelected(state.value);
        },
        setCountByAmount: (state, action: PayloadAction<{
            id: string,
            count: number
        }>) => {
            const idx = findItem(state.value, action);
            const count = verifyNumber(action.payload.count);
            (state.value)[idx].count = count;
            state.hasSelected = checkIfSelected(state.value);
        },
        setSelectedItems: (state) => {
            state.selected = state.value.reduce((accu: IPizza[], cur: IPizza) => {
                if (cur.count > 0) {
                    accu.push(cur);
                }
                return accu;
            }, []);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenuData.pending, (state) => {
                state.status = IStatus.LOADING;
            })
            .addCase(getMenuData.fulfilled, (state, action) => {
                state.status = IStatus.IDLE;
                state.value = action.payload;
            })
            .addCase(getMenuData.rejected, (state) => {
                state.status = IStatus.FAILED;
            });
    },
});

export const menuAll = (state: RootState) => state.menu.value;
export const selectedFlag = (state: RootState) => state.menu.hasSelected;
export const seletedItems = (state: RootState) => state.menu.selected;

export const { addByOne, minusByOne, setCountByAmount, setSelectedItems } = menuSlice.actions;

export default menuSlice.reducer;