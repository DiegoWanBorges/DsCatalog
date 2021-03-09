import { User } from "core/types/User";
import { Link } from "react-router-dom";
import './styles.scss'

type Props={
    user:User;
    onRemove: (productId:number) =>void;
}

const UserCard = ({ user,onRemove }:Props) => {
    return (
        <div className="card-base user-card-admin " >
            <div className="">
                <h3 className="user-card-name-admin">
                    {user.firstName +" "+ user.lastName}
                </h3>
                <small className="user-card-email-admin" >{user.email}</small>
            </div>
            
            
            <div className="btn-container-user">
                <Link
                    to={`/admin/users/${user.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-user ">
                    EDITAR
                </Link>

                <button
                    type="button"
                    className="btn btn-outline-danger btn-user"
                    onClick={() => onRemove(user.id)}
                >
                    EXCLUIR
                    </button>
            </div>
        </div>
    )
}

export default UserCard;