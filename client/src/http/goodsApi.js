import { $authHost, $host } from ".";
import {jwtDecode} from "jwt-decode";

export const createType =  async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes =  async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand =  async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands =  async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createGoods =  async (goods) => {
    const {data} = await $authHost.post('api/goods', goods)
    return data
}

export const fetchGoods =  async (typeId, brandId, page, limit =5) => {
    const {data} = await $host.get('api/goods', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchOneGoods =  async (id) => {
    const {data} = await $host.get('api/goods/' + id)
    return data
}