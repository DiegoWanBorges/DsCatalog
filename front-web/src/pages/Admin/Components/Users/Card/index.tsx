import { Link } from "react-router-dom";
import './styles.scss'

const UserCard = () => {
    return (
        <div className="card-base user-card-admin " >
            <div className="col-6  pt-2">
                <h3 className="user-card-name-admin pt-3 ">
                    Nome do Usuário
                </h3>
                <small className="user-card-email-admin" >maria@gmail.com</small>
            </div>
            

            <div className="col-3 pt-4 pr-5 ">
                <Link
                    to={`/admin/users/1`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit">
                    EDITAR
                </Link>
            </div>

            <div className="col-3 pt-4 pr-5 ">
                <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                >
                    EXCLUIR
                    </button>
            </div>
        </div>
    )
}

export default UserCard;