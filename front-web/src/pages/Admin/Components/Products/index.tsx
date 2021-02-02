import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProductForm from './Form'
import ProductList from './List'
import './styles.scss'

const Products = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <ProductList />
                </Route>
                <Route path="/admin/products/create">
                    <ProductForm/>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1>Conteudo 3 - Edit</h1>
                </Route>
            </Switch>
        </div>
    )
}
export default Products