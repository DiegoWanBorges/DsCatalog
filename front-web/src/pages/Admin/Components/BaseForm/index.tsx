import { useHistory } from 'react-router-dom'
import './styles.scss'


type Props ={
    tittle: string;
    children:React.ReactNode;
}

const BaseForm = ({tittle, children}:Props) => {
    const history =useHistory();
    const handleCancel = ()=>{
        history.push("../")
    }


    return (
        <div className="admin-base-form card-base border-radius-20">
            <h1 className="base-form-title">
                {tittle}
            </h1>
            
            {children}

            <div className="base-form-actions">
                <button 
                        className="btn btn-outline-danger border-radius-10 mr-3"
                        onClick={handleCancel}
                >

                    CANCELAR
                </button>
                <button className="btn btn-primary border-radius-10 mr-3">
                    CADASTRAR
                </button>
            </div>


        </div>
    )
}

export default BaseForm;