import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBarAdmin from './Components/NavBar'
import Products from './Components/Products'
import './styles.scss'

const Admin = () => (
    <div className="admin-container">
        <NavBarAdmin />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products/>
                </Route>
                <Route path="/admin/categories">
                    <h1>Conteudo 2</h1>
                </Route>
                <Route path="/admin/users">
                    <h1>Conteudo 3</h1>
                </Route>                
            </Switch>
        </div>
    </div>
);

export default Admin;
