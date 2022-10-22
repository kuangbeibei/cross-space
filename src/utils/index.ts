import { IStorageConsts } from "../constants"

export const setLocalStorage = (name: IStorageConsts, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value))
}

export const getLocalStorage = (name: IStorageConsts) => {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : null
}

export const clearLocalStorage = () => {
    localStorage.clear();
}