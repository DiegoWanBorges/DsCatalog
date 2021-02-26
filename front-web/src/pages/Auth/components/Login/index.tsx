import ButtonIcon from 'core/components/ButtonIcon';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CardAuth from '../Card';
import './styles.scss'
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}
type LocationState = {
    from :string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();
    let { from } = location.state || { from: {pathname:"/admin"}};
    
    const onSubmit = (data: FormData) => {
        makeLogin(data)
                  .then(response=> {
                    setHasError(false);
                    saveSessionData(response.data);
                    history.replace(from);
                  })
                  .catch(()=>{
                      setHasError(true);
                  })

        ;
    }
    return (
        <CardAuth title="LOGIN">

            {
                hasError && (
                    <div className="alert alert-danger mt-5">
                        Usuário ou senha inválido!
                    </div>
                )
            }
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="margin-bottom-30">  
                <input
                    type="email"
                    className={`form-control imput-base ${errors.username ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    name="username"
                    ref={register({
                        required: "Campo obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                      })}
                    />
                    {errors.username && (
                    <div className="invalid-feedback d-block">
                            {errors.username.message}
                    </div>
                    )}
                </div>
                
                <div className="margin-bottom-30">
                <input
                    type="password"
                    className={`form-control imput-base ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Senha"
                    name="password"
                    ref={register({ required: "Campo obrigatório"})}
                    />
                    {errors.password && (
                    <div className="invalid-feedback d-block">
                            {errors.password.message}
                    </div>
                    )}
                </div>
                
                <Link to="/auth/recover" className="login-link-recover">
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

                    <Link to="/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>


            </form>
        </CardAuth>


    )
}
export default Login;