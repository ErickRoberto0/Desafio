import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../../Form/SubmitButton";
import Input from "../../Form/input"; // Corrigido para 'Input' com 'I' maiúsculo
import style from '../../Form/Form.module.css';

// Componente para o formulário de cadastro de cidades
const FormCidades = ({ handleSubmit, cidadeData, btnText }) => {
    const [cidade, setCidade] = useState(cidadeData || {}); // Estado para armazenar os dados da cidade
    const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const submit = (e) => {
        e.preventDefault();
        
        // Verifica se o campo obrigatório está preenchido
        if (!cidade.nome) {
            setError("O campo nome da cidade é obrigatório."); // Define a mensagem de erro
            return; // Impede o envio do formulário
        }
        
        try {
            const formattedCidade = {
                nome: cidade.nome,
            };
            handleSubmit(formattedCidade); // Submete os dados da cidade para cadastro
            setCidade({}); // Limpa os dados do formulário após o cadastro
            navigate('/cidades', { state: { message: 'Cidade cadastrada com sucesso!' } }); // Navega para a página de cidades com uma mensagem de sucesso
        } catch (error) {
            console.error("Erro ao cadastrar cidade:", error);
        }
    }

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        setCidade({ ...cidade, [e.target.name]: e.target.value });
    }

    // Renderização do componente
    return (
        <form onSubmit={submit} className={style.form}>
            {/* Exibe a mensagem de erro se houver */}
            {error && <div className={style.error}>{error}</div>}
            <div className={style.inputRow}>
                {/* Campo de entrada para o nome da cidade */}
                <Input 
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    handleOnChange={handleChange}
                    value={cidade.nome || ''}
                />
            </div>
            <div className={style.buttonContainer}>
                {/* Botão de envio do formulário */}
                <SubmitButton text={btnText} />
            </div>
        </form>
    );
}

export default FormCidades; // Exporta o componente FormCidades
