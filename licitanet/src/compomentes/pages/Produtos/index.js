// Importa os módulos e componentes necessários do React, React Router DOM, Axios e estilos
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProdutosList from './ProdutosList'; // Importa o componente de lista de produtos
import FormProdutos from './FormProdutos'; // Importa o formulário de produtos
import Style from './Produtos.module.css'; // Importa os estilos
import Message from '../../layout/Message'; // Importa o componente de mensagem
import SubmitButton from '../../Form/SubmitButton'; // Importa o botão de envio
import FormBusca from '../../Form/FormBusca'; // Importa o formulário de busca

// URLs da API
const API_URL = "http://127.0.0.1:8000/api";
const LISTAR_URL = `${API_URL}/listar`;
const BUSCAR_URL = `${API_URL}/buscar`;

// Componente de Produtos
const Produtos = () => {
  // Estado local do componente
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [produto, setProduto] = useState({}); // Informações de um produto
  const [sortedByCod, setSortedByCod] = useState(false); // Estado de ordenação por código
  const [sortedByEstoque, setSortedByEstoque] = useState(false); // Estado de ordenação por estoque
  const [successMessage, setSuccessMessage] = useState(''); // Mensagem de sucesso
  const [editMode, setEditMode] = useState(false); // Modo de edição
  const [buscaMode, setBuscaMode] = useState(false); // Modo de busca
  const location = useLocation(); // Localização da página

  // Efeito para exibir mensagem de sucesso quando há uma nova localização com uma mensagem
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  // Efeito para obter a lista de produtos ao montar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para obter a lista de produtos (pode ser uma busca com um código específico)
  const fetchProdutos = async (cod = '') => {
    try {
      const url = cod ? `${BUSCAR_URL}/${cod}` : LISTAR_URL;
      const response = await axios.get(url);
      setProdutos(cod ? [response.data] : response.data);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  // Função para lidar com a exclusão de um produto
  const handleDelete = async (cod) => {
    try {
      await axios.delete(`${API_URL}/deletar/${cod}`);
      fetchProdutos(); // Atualiza a lista de produtos
      setSuccessMessage('Produto deletado com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  

  // Função para preparar o formulário para edição de um produto
  const handleEdit = (data) => {
    setProduto(data);
    setEditMode(true);
  };

  // Função para ordenar a lista de produtos por código
  const handleSortByCod = () => {
    const sortedProducts = [...produtos].sort((a, b) => b.cod - a.cod);
    setProdutos(sortedProducts);
    setSortedByCod(true);
    setSortedByEstoque(false);
  };

  // Função para ordenar a lista de produtos por estoque
  const handleSortByEstoque = () => {
    const sortedProducts = [...produtos].sort((a, b) => {
      if (sortedByEstoque) {
        return a.estoque - b.estoque; // Ordena do menor para o maior
      } else {
        return b.estoque - a.estoque; // Ordena do maior para o menor
      }
    });
    setProdutos(sortedProducts);
    setSortedByEstoque(!sortedByEstoque);
    setSortedByCod(false);
  };

  // Função para redefinir a ordenação e exibir a lista de produtos não ordenada
  const handleResetSort = () => {
    fetchProdutos();
    setSortedByCod(false);
    setSortedByEstoque(false);
  };

  // Função para cadastrar ou atualizar um produto
  const cadastrarProduto = async (formattedProduto) => {
    try {
      const url = editMode ? `${API_URL}/atualizar/${produto.cod}` : `${API_URL}/cadastrar`;
      if (editMode) {
        await axios.put(url, formattedProduto);
      } else {
        await axios.post(url, formattedProduto);
      }
      setEditMode(false); // Sai do modo de edição
      fetchProdutos(); // Atualiza a lista de produtos
      setSuccessMessage('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error(editMode ? "Erro ao atualizar produto:" : "Erro ao cadastrar produto:", error);
    }
  };

  // Função para limpar os filtros de ordenação e exibir a lista de produtos não ordenada
  const handleLimpaFiltros = () => {
    fetchProdutos();
    setSortedByCod(false);
    setSortedByEstoque(false);
    setBuscaMode(false);
  };

  // Renderização do componente
  return (
    <div className={Style.container}>
      <h1> Cadastrar Produtos </h1>
      {/* Renderiza o formulário de produtos para cadastrar ou atualizar */}
      <FormProdutos
        handleSubmit={cadastrarProduto}
        produto={produto}
        btnText={editMode ? "Atualizar" : "Cadastrar"}
        editMode={editMode}
      />
      {/* Exibe a mensagem de sucesso, se houver */}
      {successMessage && <Message type="success" msg={successMessage}/>}
      <h1> Lista de Produtos </h1>
      <div className={Style.buttonContainer}>
        {/* Renderiza o formulário de busca */}
        <FormBusca onSearch={fetchProdutos} setBuscaMode={setBuscaMode} />
        {/* Renderiza botão para ordenar por código */}
        
        {!buscaMode && (<>
          {!sortedByCod ? (
            <SubmitButton onClick={handleSortByCod} text="Ordenar por Código" />
          ) : (
            <SubmitButton onClick={handleResetSort} text="Ordenar por Código" />
          )}
          {/* Renderiza botão para ordenar por estoque */}
          {!sortedByEstoque ? (
            <SubmitButton onClick={handleSortByEstoque} text="Ordenar por Estoque" />
          ) : (
            <SubmitButton onClick={handleSortByEstoque} text="Ordenar por Estoque" />
          )}
          </>
        )}
        {/* Renderiza botão para limpar filtros */}
        <div className={Style.clear}>
          <SubmitButton  onClick={handleLimpaFiltros} text="Limpar Filtros" />
        </div>
      </div>
      {/* Renderiza a lista de produtos */}
      <ProdutosList
        produtos={produtos}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Produtos; // Exporta o componente de Produtos
