import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StorageConsts } from '../constants';
import { IPizza } from '../data/db';
import type { RootState, AppDispatch } from '../store';
import { getMenuData, seletedItems, setSelectedFromLocalStorage } from '../store/menuSlice';
import { getLocalStorage, setLocalStorage } from '../utils';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useInitAndCheckData = (isOrderPage?: boolean) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [storageData, setStorageData] = useState<Array<IPizza>>([]);
    const selected = useAppSelector(seletedItems);
    useEffect(() => {
        dispatch(getMenuData());
        const storageData = getLocalStorage(StorageConsts.SELECTED_ITEMS);
        if (storageData) {
            setStorageData(storageData);
            dispatch(
                setSelectedFromLocalStorage({
                    data: storageData,
                })
            );
        }
    }, []);

    useEffect(() => {
        if (selected.length) {
            setLocalStorage(StorageConsts.SELECTED_ITEMS, selected);
        } else {
            setLocalStorage(StorageConsts.SELECTED_ITEMS, []);
        }
    }, [selected]);


    return {
        storageData,
        selected
    };
}
