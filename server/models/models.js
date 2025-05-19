const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type:DataTypes.STRING, unique: true,},
    password: {type:DataTypes.STRING, defaultValue: "USER"},
    role:{type:DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define( 'basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketGoods = sequelize.define( 'basket_goods', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Goods = sequelize.define( 'goods', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, unique: true, allowNull: false},
    price: {type:DataTypes.INTEGER, allowNull: false},
    rating: {type:DataTypes.INTEGER, defaultValue: 0},
    size: {type:DataTypes.INTEGER, allowNull: false},
    img: {type:DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define( 'type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define( 'brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define( 'rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate:{type:DataTypes.INTEGER, allowNull: false},
})

const GoodsInfo = sequelize.define( 'goods_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type:DataTypes.STRING, allowNull: false},
    description: {type:DataTypes.STRING, allowNull: false},
    
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketGoods)
BasketGoods.belongsTo(Basket)


Type.hasMany(Goods)
Goods.belongsTo(Type)

Brand.hasMany(Goods)
Goods.belongsTo(Brand)

Goods.hasMany(Rating)
Rating.belongsTo(Goods)

Goods.hasMany(BasketGoods)
BasketGoods.belongsTo(Goods)

Goods.hasMany(GoodsInfo)
GoodsInfo.belongsTo(Goods)



module.exports = {
    User,
    Basket,
    BasketGoods,
    Goods,
    Type,
    Brand,
    Rating,
    GoodsInfo
}