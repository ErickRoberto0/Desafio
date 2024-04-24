import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../../Form/SubmitButton";
import Input from "../../Form/input"; 
import style from '../../Form/Form.module.css';

// Componente para o formulário de cadastro de marcas
const FormMarcas = ({ handleSubmit, btnText, marcaData }) => {
    // Estado para armazenar os dados da marca e mensagens de erro
    const [marca, setMarca] = useState(marcaData || {});
    const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const submit = async (e) => {
        e.preventDefault();
        
        // Verifica se os campos obrigatórios estão preenchidos
        if (!marca.nome || !marca.fabricante) {
            setError("Todos os campos devem ser preenchidos."); // Define a mensagem de erro
            return; // Impede o envio do formulário
        }
        
        try {
            // Formata os dados da marca
            const formattedMarca = {
                nome: marca.nome,
                fabricante: marca.fabricante,
            };
            // Chama a função de envio passada como propriedade
            await handleSubmit(formattedMarca);
            setMarca({}); // Limpa os dados do formulário
            // Navega para a página de marcas com uma mensagem de sucesso
            navigate('/marcas', { state: { message: 'Marca cadastrada com sucesso!' } });
        } catch (error) {
            console.error("Erro ao cadastrar marca:", error);
        }
    };

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        setMarca({ ...marca, [e.target.name]: e.target.value });
    };

    // Renderização do componente
    return (
        <form onSubmit={submit} className={style.form}>
            {/* Exibe a mensagem de erro se houver */}
            {error && <div className={style.error}>{error}</div>}
            <div className={style.inputRow}>
                {/* Campo de entrada para o nome da marca */}
                <Input
                    type="text"
                    name="nome"
                    placeholder="Marca"
                    handleOnChange={handleChange}
                    value={marca.nome || ''}
                />
            </div>
            <div className={style.inputRow}>
                {/* Campo de entrada para o fabricante da marca */}
                <Input
                    type="text"
                    name="fabricante"
                    placeholder="Fabricante"
                    handleOnChange={handleChange}
                    value={marca.fabricante || ''}
                />
            </div>
            <div className={style.buttonContainer}>
                {/* Botão de envio do formulário */}
                <SubmitButton text={btnText} />
            </div>
        </form>
    );
};

export default FormMarcas; // Exporta o componente FormMarcas
