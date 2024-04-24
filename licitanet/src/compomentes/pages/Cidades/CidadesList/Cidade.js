import React from "react";
import { MdBorderColor, MdCancel } from "react-icons/md";
import IconButton from "../../../Form/IconButton";

// Componente para representar uma cidade na lista de cidades
const Cidade = ({ cidade, onDelete, onEdit }) => {
    // Desestruturação das propriedades da cidade
    const { cod, nome } = cidade;

    // Função para lidar com a exclusão da cidade
    const handleDelete = () => {
        onDelete(cod);
    };

    // Função para lidar com a edição da cidade
    const handleEdit = () => {
        onEdit(cidade);
    };

    // Renderização do componente
    return ( 
        <tr>
            {/* Exibição dos detalhes da cidade em células da tabela */}
            <td>{cod}</td>
            <td>{nome}</td>
            <td>
                {/* Botão de edição da cidade */}
                <IconButton icon={<MdBorderColor />} className="icon-button" onClick={handleEdit} />
                {/* Botão de exclusão da cidade */}
                <IconButton icon={<MdCancel />} className="icon-button-del" onClick={handleDelete} />
            </td>
        </tr>
    );
};

export default Cidade; // Exporta o componente Cidade
