import { useState } from 'react';
import styles from './Additem.module.css';

function AddItem(props)
{
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const AddItemButtonPressed = (searchParameters) =>
    {
        props.addItem({ name: name, price: price, type: type, brand: brand })
        setName("");
        setPrice(0);
        setType("");
        setBrand("");
    };

    return (
        <div className="contrainer">
            <div className="row">
                <h2  className={styles.blue}>Add item</h2>
            </div>
            <div className="row">
                <label  htmlFor="name-field">Name:</label>
                <input className="form-control" id="name-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="row">
                <label  htmlFor="price-field">Price</label>
                <input className="form-control" id="price-field" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="row">
                <label  htmlFor="type-field">Type:</label>
                <input className="form-control" id="type-field" type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="row">
                <label  htmlFor="brand-field">Brand:</label>
                <input className="form-control" id="brand-field" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="row mt-3">
                <button className="btn btn-primary" type="button" onClick={AddItemButtonPressed}>Add Item</button>
            </div>
        </div>
    )
}

export default AddItem;