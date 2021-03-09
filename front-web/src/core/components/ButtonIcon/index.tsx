import React from 'react'
import './styles.scss'
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg'

type Props = {
    text: string;

} 

const ButtonIcon = ({ text } : Props)  => (
    <div className="default-button">
        <button className="btn btn-primary btn-icon">  
        {text}
        </button>
        <div className="btn-incon-content">
            <ArrowIcon />
        </div>
    </div>
);

export default ButtonIcon;
