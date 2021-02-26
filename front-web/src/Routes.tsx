import history from 'core/utils/history';
import Auth from 'pages/Auth';
import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './core/components/NavBar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';

const Routes = () => (
    <Router history={history}>
    <NavBar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog /> 
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth/>
            </Route>
            <Redirect from="/admin" to="/admin/products" exact/>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>
);

export default Routes;
