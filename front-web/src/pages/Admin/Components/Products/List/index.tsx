import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import './styles.scss'


const ProductList = () => {

    const history = useHistory();

    const handCreate = () =>{
        history.push("/admin/products/create");
    }

    return (
        <div className="admin-product-list">
            <button
                className="btn btn-primary btn-lg"
                onClick={handCreate}
            >
                ADCIONAR
            </button>
            <div className="admin-list-container">
                <Card/>
                <Card/>
                <Card/>
            </div>

        </div>
    )
}

export default ProductList