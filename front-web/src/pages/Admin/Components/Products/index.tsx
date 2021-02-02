import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './styles.scss'

const Products = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <h1>Conteudo 1 - Exibir</h1>
                </Route>
                <Route path="/admin/products/create">
                    <h1>Conteudo 2 - Create</h1>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1>Conteudo 3 - Edit</h1>
                </Route>
            </Switch>
        </div>
    )
}
export default Products