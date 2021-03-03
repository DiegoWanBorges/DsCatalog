import history from 'core/utils/history';
import UserCard from '../Card';
import './styles.scss'

const UserList = () => {
    const handCreate = () => {
        history.push("/admin/users/create");
    }
    return (
        <div className="admin-user-list">
            <button
                className="btn btn-primary btn-lg"
                onClick={handCreate}
            >
                ADCIONAR
            </button>
            <div className="admin-list-container">
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </div>
    )
}

export default UserList;