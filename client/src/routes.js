import Admin from "./pages/Admin"
import { ADMIN_ROUTE, BASKET_ROUTE, GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import Auth from "./pages/Auth"
import Shop from "./pages/Shop"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GOODS_ROUTE + '/:id',
        Component: GoodsPage
    },
    
]