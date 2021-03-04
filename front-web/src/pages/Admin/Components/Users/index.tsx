import { Route, Switch } from 'react-router-dom'
import UserForm from './Form'
import UserList from './List'
import './styles.scss'

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <UserList/>
                </Route>
                <Route path="/admin/users/:userId">
                    <UserForm/>
                </Route>
            </Switch>
        </div>
    )
}
export default Users;