import './styles.scss'

import { ReactComponent as AuthImage } from 'core/assets/images/login.svg'
const Auth = () =>{
    return (
        <div className="auth-container">
            <div className="auth-info">
                <h1 className="auth-info-title">
                    Divulgue seus produtos <br/> no DS Catalog
                </h1>
                <p className="auth-info-subtitle">
                    Faça parte do nosso catálogo de divulgação e <br/> aumente a venda dos seus produtos.
                </p>

                <AuthImage/>

            </div>
            <div className="auth-content">
                <h1>Formulario de login</h1>
            </div>
        </div>
    );
}

export default Auth;