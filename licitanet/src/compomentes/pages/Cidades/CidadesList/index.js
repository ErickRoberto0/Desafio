import React from "react";
import Cidade from "./Cidade"; // Importa o componente Cidade
import style from "./CidadesList.module.css";

// Componente para exibir uma lista de cidades
const CidadesList = ({ cidades, onDelete, onEdit }) => {
    // Função para lidar com a exclusão de uma cidade
    const handleDelete = (cod) => {
        onDelete(cod);
    };

    // Função para lidar com a edição de uma cidade
    const handleEdit = (data) => {
        onEdit(data);
    };

    // Renderização do componente
    return (
        <div className={style.data}>
            {/* Tabela para exibir as cidades */}
            <table className={style.cidades}>
                <thead>
                    {/* Cabeçalho da tabela */}
                    <tr>
                        <th>Cod</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeamento das cidades para renderizar cada uma delas */}
                    {cidades.map((cidade) => (
                        <Cidade
                            key={cidade.cod} // Chave única para cada cidade na lista
                            cidade={cidade} // Passa os dados da cidade para o componente Cidade
                            onDelete={handleDelete} // Passa a função de exclusão para o componente Cidade
                            onEdit={handleEdit} // Passa a função de edição para o componente Cidade
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CidadesList; // Exporta o componente CidadesList
