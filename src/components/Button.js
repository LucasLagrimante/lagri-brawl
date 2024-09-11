import React from 'react';
import '../styles/button.css'; // Estilos do botão

const Button = ({ onClick, children, icon }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {icon && <span className="material-icons">{icon}</span>} {/* Adiciona o ícone */}
            {children}
        </button>
    );
};

export default Button;
