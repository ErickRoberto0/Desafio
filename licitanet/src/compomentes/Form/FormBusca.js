import React from 'react';
import SubmitButton from './SubmitButton';
import Input from './input'; 
import style from './FormBusca.module.css';

// Componente para o formulário de busca
const FormBusca = ({ onSearch, setBuscaMode }) => {
  // Função para lidar com o envio do formulário de busca
  const handleSubmit = (event) => {
    event.preventDefault();
    const codigo = event.target.BuscaCod.value; // Obtém o valor do input diretamente do evento

    // Verifica se o campo de busca não está vazio
    if (codigo.trim() !== "") {
      setBuscaMode(true); // Define o modo de busca como verdadeiro
      console.log("Código enviado para busca:", codigo);
      onSearch(codigo, true); // Chama a função de busca passando o código e true
    } else {
      console.log("Nenhum código digitado.");
    }
  };

  // Renderização do componente
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {/* Campo de entrada para o código */}
      <Input
        type="number"
        name="BuscaCod"
        placeholder="Digite o Código"
      />
      {/* Botão de busca */}
      <SubmitButton text="Buscar" />
    </form>
  );
};

export default FormBusca; // Exporta o componente FormBusca
