import React from 'react'
import { useHistory } from 'react-router-dom'
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

        </div>
    )
}

export default ProductList