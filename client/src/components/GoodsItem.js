import React from 'react'
import { Card, Col } from 'react-bootstrap';
import star from '../assets/star.png';
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import { GOODS_ROUTE } from '../utils/consts';
import "../styles/GoodsItem.css"


const GoodsItem = ({goods})  => {
    const navigate = useNavigate()
    console.log(navigate)

     return (
        <Col md={3} className="mt-4 goods-col" onClick={() => navigate(GOODS_ROUTE + '/' + goods.id)}>
            <Card className="goods-card">
                <Image className="goods-image" src={process.env.REACT_APP_API_URL + goods.img} />
                <div className="d-flex justify-content-between align-items-center px-2 pt-2">
                    <div className="goods-rating">
                        {goods.rating}
                        <Image width={16} height={16} src={star} />
                    </div>
                </div>
                <div className="goods-name">{goods.name}</div>
            </Card>
        </Col>
    );
};

export default GoodsItem;