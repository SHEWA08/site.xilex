import React, { useContext, useState, useEffect } from 'react';
import  Modal  from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Col, Row } from "react-bootstrap"
import { Context } from '../../index';
import {createGoods, fetchBrands, fetchTypes, fetchGoods } from "../../http/goodsApi"
import { observer } from 'mobx-react-lite';


const CreateGoods = observer(({show, onHide}) => {
    const {goods} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => goods.setTypes(data))
        fetchBrands().then(data => goods.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addGoods = async () => {
    try {

        if (!name.trim()) {
            throw new Error("Введите название товара");
        }
        
        if (!price ||  isNaN (price) || Number (price) <= 0) {
            throw new Error("Введите корректную цену (положительное число)");
        }

        if (!file) {
            throw new Error("Выберите изображение компьютера");
        }

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("price", String(price));
        formData.append("img", file);
        formData.append("brandId", goods.selectedBrand.id);
        formData.append("typeId", goods.selectedType.id);
        
        
        

        const validInfo = info.filter(i => i.title.trim() && i.description.trim());
        if (validInfo.length > 0) {
            formData.append("info", JSON.stringify(
                validInfo.map(({title, description}) => ({
                    title: title.trim(),
                    description: description.trim()
                }))
            ));
        }

        await createGoods(formData);
        onHide();

        const data = await fetchGoods();
        goods.setGoods(data.rows);

    } catch (error) {

    }
};

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{goods.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.types.map(type =>
                        <Dropdown.Item 
                            onClick={() => goods.setSelectedType(type)} 
                            key={type.id}
                        >
                            {type.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{goods.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.brands.map(brand =>
                        <Dropdown.Item 
                            onClick={() => goods.setSelectedBrand(brand)} 
                            key={brand.id}
                        >
                            {brand.name}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-3"
                    placeholder="Введите название товара"
                />
                 <Form.Control
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="mt-3"
                    placeholder="Введите стоимость товара"
                    type="number"
                />
                 <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                />
                <hr/>
                <Button
                    variant={'outline-dark'}
                    onClick={addInfo}
                >
                    Добавить новое свойство 
                </Button>
                {info.map(i => 
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number) }
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number) }
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button 
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    
                )}
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
         <Button variant="outline-success" onClick={addGoods}>Добавить</Button>
      </Modal.Footer>
    </Modal>

     
    );
});

export default CreateGoods;