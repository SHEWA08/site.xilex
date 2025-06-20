import React, { useEffect, useState, useContext } from 'react';
import { Image, Col, Container, Row, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneGoods } from '../http/goodsApi';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { addToBasket, getBasket, removeFromBasket } from '../http/basketApi';
import "../styles/GoodsPage.css";




const GoodsPage = observer(() => {
  const [goods, setGoods] = useState({ info: [] });
  const [userRating, setUserRating] = useState(0);
  const [isInBasket, setIsInBasket] = useState(false);
  const [basketItemId, setBasketItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const { user } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchOneGoods(id)
      .then(data => setGoods(data))
      .finally(() => setLoading(false));
    
    if (user.isAuth) {
      loadBasketData();
    }
  }, [id, user.isAuth]);

  const loadBasketData = async () => {
    try {
      const basketData = await getBasket();
      const basketItems = Array.isArray(basketData.basket_goods) ? basketData.basket_goods : [];
      const basketItem = basketItems.find(item => item.goodsId === parseInt(id));
      
      setIsInBasket(!!basketItem);
      setBasketItemId(basketItem?.id || null);
    } catch (e) {
      console.error("Ошибка загрузки корзины:", e);
    }
  };

  const showNotification = (message, variant = 'success') => {
    setNotification({ message, variant });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToBasket = async () => {
    try {
      await addToBasket(goods.id);
      await loadBasketData();
      showNotification('Товар добавлен в корзину!');
    } catch (e) {
      console.error("Ошибка добавления в корзину:", e);
      showNotification(e.response?.data?.message || 'Ошибка добавления в корзину', 'danger');
    }
  };
  const handleRemoveFromBasket = async () => {
    if (!basketItemId) return;
    
    try {
      await removeFromBasket(basketItemId);
      await loadBasketData();
      showNotification('Товар удален из корзины');
    } catch (e) {
      console.error("Ошибка удаления:", e);
      showNotification(e.response?.data?.message || 'Ошибка при удалении', 'danger');
    }
  };

  const handleRate = async (rate) => {
    if (!user.isAuth) {
      showNotification('Для оценки необходимо авторизоваться!', 'warning');
      return;
    }
    
    try {
      const numericRate = Number(rate);
      if (isNaN(numericRate) || numericRate < 1 || numericRate > 5) {
        throw new Error('Оценка должна быть от 1 до 5');
      }

      
      const updatedGoods = await fetchOneGoods(id);
      setGoods(updatedGoods);
      setUserRating(numericRate);
      showNotification('Спасибо за вашу оценку!');
    } catch (e) {
      showNotification(e.response?.data?.message ||  e.message, 'danger');
    }
  };
const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        className="rating-star"
        onClick={() => handleRate(star)}
        style={{
          color: star <= (userRating || goods.rating) ? '#ffc107' : '#e4e5e9',
        }}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <Container className="goods-loading-container">
        <div className="goods-loading-spinner"></div>
      </Container>
    );
  }

  return (
  <Container className="goods-page-container">
    {notification && (
      <Alert 
        variant={notification.variant} 
        className="goods-notification"
        onClose={() => setNotification(null)} 
        dismissible
      >
        {notification.message}
      </Alert>
    )}
    
    <Row className="goods-header-row">
      <Col lg={8}>
        <div className="goods-title-wrapper">
          <h1 className="goods-title">{goods.name}</h1>
          <Badge bg="secondary" className="goods-genre-badge">{goods.genre}</Badge>
        </div>
        
        <div className="goods-rating-section">
          <div className="goods-rating-stars">{renderStars()}</div>
          <div className="goods-rating-value">
            Рейтинг: <strong>{goods.rating?.toFixed(1) || 0}</strong>/5
            {userRating > 0 && (
              <span className="user-rating-badge">Ваша оценка: {userRating}</span>
            )}
          </div>
        </div>
      </Col>
    </Row>
    
    <Row className="goods-main-row align-items-start">
      <Col md={8}>
        <Row>
          <Col md={7} className="goods-media-col">
            <div className="goods-image-wrapper">
              <Image 
                src={process.env.REACT_APP_API_URL + goods.img} 
                alt={goods.name}
                className="goods-main-image"
                fluid
              />
            </div>
          </Col>
          
          <Col md={5} className="goods-purchase-col">
            <Card className="goods-purchase-card">
              <Card.Body>
                <div className="goods-price-wrapper">
                  <span className="goods-price">{goods.price} $</span>
                  {goods.discount > 0 && (
                    <span className="goods-discount-badge">-{goods.discount}%</span>
                  )}
                </div>
                
                <div className="goods-actions">
                  {isInBasket ? (
                    <Button 
                      variant="danger" 
                      className="goods-action-btn"
                      onClick={handleRemoveFromBasket}
                    >
                      Убрать из корзины
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      className="goods-action-btn"
                      onClick={handleAddToBasket}
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </div>
              </Card.Body>
              </Card>
          </Col>
        </Row>
        
      
        <Row className="mt-4">
          <Col>
            <Card className="goods-specs-card">
              <Card.Body>
                <Card.Title className="goods-specs-title">Описание</Card.Title>
                <div className="goods-specs-list">
                  {goods.info?.map((info, index) => (
                    <div key={info.id} className="goods-spec-item">
                      <span className="goods-spec-title">{info.title}:</span>
                      <span className="goods-spec-value">{info.description}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);
}); 

export default GoodsPage;