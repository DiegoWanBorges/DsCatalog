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
                <Route path="/admin/products/:productId">
                    <ProductForm/>
                </Route>
            </Switch>
        </div>
    )
}
export default Products