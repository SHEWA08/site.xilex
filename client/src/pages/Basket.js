import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import { getBasket, removeFromBasket } from '../http/basketApi';
import { observer } from 'mobx-react-lite';
import { SHOP_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';
import "../styles/Basket.css";


const Basket = observer(() => {
    const { user } = useContext(Context);
    const [basketItems, setBasketItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                const items = data?.basket_goods || [];
                setBasketItems(items);
                calculateTotal(items);
            });
        }
    }, [user.isAuth]);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.goods?.price || 0), 0);
        setTotal(sum);
    };

    const handleRemove = async (id) => {
        await removeFromBasket(id);
        const updatedBasket = await getBasket();
        const items = updatedBasket?.basket_goods || [];
        setBasketItems(items);
        calculateTotal(items);
    };

    return (
        <Container className="epic-cart-container">
            <h1 className="epic-cart-title">ВАША КОРЗИНА</h1>

            {basketItems.length > 0 ? (
                <>
                    {basketItems.map(item => (
                        <div key={item.id} className="epic-cart-item">
                            <Row className="align-items-center">
                                <Col md={4}>
                                    {item.goods?.img ? (
                                        <img
    src={process.env.REACT_APP_API_URL + item.goods.img}
    alt={item.goods.name}
    className="epic-cart-image"
    style={{
        maxWidth: '100px',
        maxHeight: '100px',
        objectFit: 'contain',
        borderRadius: '8px',
        border: '1px solid #ccc'
    }}
/>

                                    ) : (
                                        <div className="epic-cart-image-placeholder">
                                            Нет изображения
                                        </div>
                                    )}
                                </Col>
                                <Col md={4}>
                                    <h5 className="epic-cart-product-name">{item.goods?.name || "Неизвестный товар"}</h5>
                                    <p className="epic-cart-price">{item.goods?.price ?? 0} BYN</p>
                                </Col>
                                <Col md={4}>
                                    <button
                                        className="epic-cart-delete-btn"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    ))}

                    <hr className="epic-cart-divider" />

                    <div className="epic-cart-total">
                        <span>Итого:</span>
                        <span className="epic-cart-total-price">{total} руб.</span>
                    </div>

                    <button className="epic-cart-checkout-btn">
                        Оформить заказ
                    </button>
                </>
            ) : (
                <Card className="epic-empty-cart">
                    <Card.Body>
                        <Card.Title className="epic-empty-title">КОРЗИНА ПУСТА</Card.Title>
                        <Card.Text className="epic-empty-text">
                            Добавьте товары из каталога
                        </Card.Text>
                        <Link to={SHOP_ROUTE} className="epic-empty-btn">
                            Перейти в каталог
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
});

export default Basket;
