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
            <div className="col-6  pt-2">
                <h3 className="user-card-name-admin pt-3 ">
                    {user.firstName +" "+ user.lastName}
                </h3>
                <small className="user-card-email-admin" >{user.email}</small>
            </div>
            

            <div className="col-3 pt-4 pr-5 ">
                <Link
                    to={`/admin/users/${user.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                    EDITAR
                </Link>
            </div>

            <div className="col-3 pt-4 pr-5 ">
                <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                    onClick={() => onRemove(user.id)}
                >
                    EXCLUIR
                    </button>
            </div>
        </div>
    )
}

export default UserCard;