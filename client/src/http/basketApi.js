import { $authHost } from "./index";

export const addToBasket = async (goodsId) => {
    console.log("🔼 Отправляем товар в корзину, goodsId:", goodsId);
    if (!goodsId) throw new Error("goodsId is undefined");
    const { data } = await $authHost.post('api/basket/add', { goodsId });
    return data;
};

export const getBasket = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { basket_goods: [] }; 
    try {
        const response = await $authHost.get('api/basket', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return { basket_goods: [] };
    }
};


export const removeFromBasket = async (goodsId) => {
    const { data } = await $authHost.delete(`api/basket/${goodsId}`);
    return data;
};