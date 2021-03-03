import { Route, Switch } from 'react-router-dom'
import CategoryForm from './Form'
import CategoryList from './List'
import './styles.scss'

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <CategoryList/>
                </Route>
                <Route path="/admin/categories/:categoryId">
                    <CategoryForm/>
                </Route>
            </Switch>
        </div>
    )
}
export default Categories