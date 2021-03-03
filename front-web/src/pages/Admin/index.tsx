import PrivateRoute from 'core/components/Routes/PrivateRoutes'
import React from 'react'
import {  Switch } from 'react-router-dom'
import Categories from './Components/Categories'
import NavBarAdmin from './Components/NavBar'
import Products from './Components/Products'
import Users from './Components/Users'
import './styles.scss'

const Admin = () => (
    <div className="admin-container">
        <NavBarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products" >
                    <Products/>
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <Categories/>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']} >
                    <Users/>
                </PrivateRoute>                
            </Switch>
        </div>
    </div>
);

export default Admin;
