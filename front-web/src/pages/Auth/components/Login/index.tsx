import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import CardAuth from '../Card';
import './styles.scss'

const Login = () => {
    return (
        <CardAuth title="LOGIN">
            <form className="login-form">
                <input
                    type="email"
                    className="form-control imput-base margin-bottom-30"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="form-control imput-base"
                    placeholder="Senha"
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon
                        text="LOGAR"
                    />
                </div>

                <div className="text-center">
                    <span className="login-not-register">
                        Não tem Cadastro?
                    </span>

                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>


            </form>
        </CardAuth>


    )
}
export default Login;