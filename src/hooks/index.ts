import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StorageConsts } from '../constants';
import { IPizza } from '../data/db';
import type { RootState, AppDispatch } from '../store';
import { getMenuData, selectedFlag, seletedItems, setSelectedFromLocalStorage } from '../store/menuSlice';
import { getLocalStorage, setLocalStorage } from '../utils';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useInitAndCheckData = (isOrderPage?: boolean) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [storageData, setStorageData] = useState<Array<IPizza>>([]);
    const selected = useAppSelector(seletedItems);

    useEffect(() => {
        // 一进页面请求数据
        dispatch(getMenuData());
        // 从localStorage中获取是否有已选菜品
        const storageData = getLocalStorage(StorageConsts.SELECTED_ITEMS);
        if (storageData && storageData.length) {
            setStorageData(storageData);
            dispatch(
                setSelectedFromLocalStorage({
                    data: storageData,
                })
            );
        }
    }, []);

    useEffect(() => {
        setLocalStorage(StorageConsts.SELECTED_ITEMS, selected.length ? selected : null);
        Promise.resolve().then(() => {
            if (getLocalStorage(StorageConsts.SELECTED_ITEMS) === null && isOrderPage) {
                navigate('/')
            }
        })
    }, [selected]);

    return {
        storageData,
        selected
    };
}
