import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Style from './Cidades.module.css';
import FormCidades from './FormCidades';
import CidadesList from './CidadesList';
import Message from '../../layout/Message';

// URLs da API
const API_URL = "http://127.0.0.1:8000/api";
const LISTAR_CIDADES_URL = `${API_URL}/cidade`;
const DELETAR_CIDADE_URL = `${API_URL}/deletarCidade`;
const CADASTRAR_URL = `${API_URL}/cadastrarCidade`;

// Componente principal para o gerenciamento de cidades
const Cidades = () => {
  const [cidades, setCidades] = useState([]); // Estado para armazenar a lista de cidades
  const location = useLocation();
  let message = ''; // Mensagem de sucesso ou erro
  if (location.state) {
    message = location.state.message;
  }

  // Função para obter a lista de cidades da API
  const getCidades = useCallback(async () => {
    try {
      const response = await axios.get(LISTAR_CIDADES_URL);
      setCidades(response.data);
    } catch (error) {
      console.error("Erro ao obter cidades:", error);
    }
  }, []);

  // Função para cadastrar uma nova cidade
  const cadastrarCidade = useCallback(async (formattedCidade) => {
    try {
      await axios.post(CADASTRAR_URL, formattedCidade);
      getCidades(); // Atualiza a lista de cidades após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar cidade:", error);
    }
  }, [getCidades]);

  // Função para excluir uma cidade
  const deleteCidade = useCallback(async (cod) => {
    try {
      await axios.delete(`${DELETAR_CIDADE_URL}/${cod}`);
      getCidades(); // Atualiza a lista de cidades após a exclusão
    } catch (error) {
      console.error("Erro ao excluir cidade:", error);
    }
  }, [getCidades]);

  useEffect(() => {
    getCidades(); // Atualiza a lista de cidades quando o componente é montado
  }, [getCidades]);

  // Função para lidar com a exclusão de uma cidade
  const handleDelete = useCallback((cod) => {
    deleteCidade(cod);
  }, [deleteCidade]);

  // Função para lidar com a edição de uma cidade (ainda não implementada)
  const handleEdit = useCallback((data) => {
    console.log(data); // Ainda não implementado
  }, []);

  return (
    <div className={Style.container}>
      <h1> Cadastrar Cidades </h1>
      {/* Componente de formulário para cadastrar uma nova cidade */}
      <FormCidades handleSubmit={cadastrarCidade}  btnText="Cadastrar" />
      {/* Exibe a mensagem de sucesso */}
      { message && <Message type="success" msg={message}/>}
      <h1> Lista de Cidades </h1>
      {/* Componente para exibir a lista de cidades */}
      <CidadesList
        cidades={cidades}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Cidades; // Exporta o componente Cidades
