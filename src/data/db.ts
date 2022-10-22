import { pizza1 } from "../assets";

export interface IPizza {
    id: string;
    picture: string;
    name: string;
    desc: string;
    count: number;
    price: number;
}

const menu: IPizza[] = [
    {
        picture: pizza1,
        name: 'Neapolitan Pizza',
        desc: 'Best Sell No.1',
        price: 14,
    },
    {
        picture: pizza1,
        name: 'Chicago Pizza',
        desc: 'Best Sell in Chicago',
        price: 8,
    },
    {
        picture: pizza1,
        name: 'New York-Style',
        desc: 'Best Sell in NYC',
        price: 12,
    },
    {
        picture: pizza1,
        name: 'Sicilian Pizza',
        desc: 'Best Sell in Sicilian',
        price: 18,
    },
    {
        picture: pizza1,
        name: 'St. Louis Pizza',
        desc: 'Best Sell in St. Louis!',
        price: 23,
    },
    {
        picture: pizza1,
        name: 'Detroit Pizza',
        desc: 'Best Sell in Detroit!',
        price: 9,
    },
    {
        picture: pizza1,
        name: 'Greek Pizza',
        desc: 'Best Sell in Greek!',
        price: 29,
    },
    {
        picture: pizza1,
        name: 'GongBaoChicken Pizza',
        desc: 'Best Sell in Chengdu!',
        price: 28,
    },
    {
        picture: pizza1,
        name: 'MapoTouFu Pizza',
        desc: 'Best Sell in Chongqing!',
        price: 15,
    },
    {
        picture: pizza1,
        name: 'Daoxiaomian Pizza',
        desc: 'Best Sell in Shanxi!',
        price: 6,
    },
    {
        picture: pizza1,
        name: 'Changfen Pizza',
        desc: 'Best Sell in Guangdong!',
        price: 8,
    },
    {
        picture: pizza1,
        name: 'Banfen Pizza',
        desc: 'Best Sell in Jiangxi!',
        price: 23,
    }
].map((item, index) => ({
    ...item,
    id: `${index + 1}`,
    count: 0
}))

export default menu;