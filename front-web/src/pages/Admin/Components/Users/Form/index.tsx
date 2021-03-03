import BaseForm from "../../BaseForm"
import './styles.scss'
const UserForm = () => {
    return (
        <form>
            <BaseForm tittle="CADASTRAR UM USUÁRIO">

                <div className="row">
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control imput-base"
                            placeholder="Nome"
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control imput-base"
                            placeholder="Sobrenome"
                        />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 d-flex">
                        <input
                            type="email"
                            className="form-control imput-base"
                            placeholder="Email"
                        />
                    </div>
                </div>

                <div className="row mt-4" >
                    <div className="col-6 ">
                        <input
                            type="password"
                            className="form-control imput-base"
                            placeholder="Digite sua senha"
                        />
                        <small className="admin-user-form-text-password">
                            A sua senha deve ter pelo menos 8 caracteres e conter pelo menos uma número
                        </small>
                    </div>

                    <div className="col-6">
                        <input
                            type="password"
                            className="form-control imput-base"
                            placeholder="Repita sua senha"
                        />
                    </div>


                </div>
            </BaseForm>
        </form>
    )
}

export default UserForm;