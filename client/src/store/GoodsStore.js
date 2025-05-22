import {makeAutoObservable} from "mobx";

export default class GoodsStore {
    constructor() {
        this._types = [
            { id: 1, name: 'Бутсы'},
            { id: 2, name: 'Мячи'},
            { id: 3, name: 'Аксессуары'},
           
        ]
        this._brands = [
            {id: 1, name: "Nike"},
            {id: 2, name: "Adidas"},
            {id: 3, name: "Puma"}
            

        ]
        this._goods = [
            {id: 1, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 2, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 3, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 4, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 5, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 6, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            {id: 7, name: "Бутсы Nike Phantom GX Elite", price: 550, rating: 5, img: 'https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'},
            
            
            
        ]
        this._selectedType = {}
        this._selectedBrand = {}
         makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setGoods(goods) {
        this._goods = goods
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }
     get brands() {
        return this._brands
    }
     get goods() {
        return this._goods
    }
      get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    
    
    
}
