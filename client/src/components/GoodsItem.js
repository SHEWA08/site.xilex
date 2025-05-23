import React from 'react'
import { Card, Col } from 'react-bootstrap';
import star from '../assets/star.png';
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import { GOODS_ROUTE } from '../utils/consts';


const GoodsItem = ({goods})  => {
    const navigate = useNavigate()
    console.log(navigate)

    return (
        <Col md={3} className={"mt-4"} onClick={() => navigate(GOODS_ROUTE + '/' + goods.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={goods.img}/>
                <div className={" text-black-50 mt-1 d-flex justify-content-between align-items-center"}>
                    <div>Nike...</div>
                    <div className="d-flex align-items-center">
                        <div>{goods.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                 <div>{goods.name}</div>
            </Card>
        </Col>
    );
};

export default GoodsItem;