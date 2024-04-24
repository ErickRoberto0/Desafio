import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FormMarcas from './FormMarcas';
import MarcasList from './MarcasList';
import Style from './Marcas.module.css';
import Message from '../../layout/Message';

const API_URL = "http://127.0.0.1:8000/api";
const LISTAR_MARCAS_URL = `${API_URL}/marca`;
const DELETAR_MARCA_URL = `${API_URL}/deletarMarca`;
const CADASTRAR_URL = `${API_URL}/cadastrarMarca`;

const Marcas = () => {
    // Estado local do componente
    const [marcas, setMarcas] = useState([]); // Lista de marcas
    const location = useLocation(); // Localização da página para exibir mensagens
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    // Função para obter as marcas da API
    const getMarcas = useCallback(async () => {
        try {
            const response = await axios.get(LISTAR_MARCAS_URL);
            setMarcas(response.data);
        } catch (error) {
            console.error("Erro ao obter marcas:", error);
        }
    }, []);

    // Função para cadastrar uma nova marca
    const cadastrarMarca = useCallback(async (formattedMarca) => {
        try {
            await axios.post(CADASTRAR_URL, formattedMarca);
            getMarcas(); // Atualiza a lista de marcas após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar marca:", error);
        }
    }, [getMarcas]);

    // Função para excluir uma marca
    const deleteMarca = useCallback(async (cod) => {
        try {
            await axios.delete(`${DELETAR_MARCA_URL}/${cod}`);
            getMarcas(); // Atualiza a lista de marcas após a exclusão
        } catch (error) {
            console.error("Erro ao excluir marca:", error);
        }
    }, [getMarcas]);

    // Efeito para obter as marcas ao montar o componente
    useEffect(() => {
        getMarcas();
    }, [getMarcas]);

    // Função para lidar com a exclusão de uma marca
    const handleDelete = useCallback((cod) => {
        deleteMarca(cod);
    }, [deleteMarca]);

    // Função para lidar com a edição de uma marca
    const handleEdit = useCallback((data) => {
        console.log(data); // Ação de edição
    }, []);

    return (
        <div className={Style.container}>
            {/* Título para o formulário de cadastro de marcas */}
            <h1> Cadastrar Marcas </h1>
            {/* Componente de formulário para cadastrar marcas */}
            <FormMarcas handleSubmit={cadastrarMarca} btnText="Cadastrar" />
            {/* Exibe a mensagem de sucesso, se houver */}
            { message && <Message type="success" msg={message}/> }
            {/* Título para a lista de marcas */}
            <h1> Lista de Marcas </h1>
            {/* Componente de lista de marcas */}
            <MarcasList
                marcas={marcas}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default Marcas;
