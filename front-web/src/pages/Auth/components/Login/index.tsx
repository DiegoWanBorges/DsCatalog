import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import CardAuth from '../Card';
import './styles.scss'
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';

type FormData ={
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>(); 
    const onSubmit = (data: FormData) =>{
        console.log(data);
        makeLogin(data);
    }

    

    return (
        <CardAuth title="LOGIN">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control imput-base margin-bottom-30"
                    placeholder="Email"
                    name="username"
                    ref={register}
                />
                <input
                    type="password"
                    className="form-control imput-base"
                    placeholder="Senha"
                    name="password"
                    ref={register}
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