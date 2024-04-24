import React from "react";
import { MdBorderColor, MdCancel } from "react-icons/md";
import IconButton from "../../../Form/IconButton";

// Componente para representar uma marca na lista de marcas
const Marca = ({ marca, onDelete, onEdit }) => {
    // Desestruturação das propriedades da marca
    const { cod, nome, fabricante } = marca;

    // Função para lidar com a exclusão da marca
    const handleDelete = () => {
        onDelete(cod);
    };

    // Função para lidar com a edição da marca
    const handleEdit = () => {
        onEdit(marca);
    };

    // Renderização do componente
    return (
        <tr>
            {/* Exibição dos detalhes da marca em células da tabela */}
            <td>{cod}</td>
            <td>{nome}</td>
            <td>{fabricante}</td>
            <td>
                {/* Botão de edição da marca */}
                <IconButton icon={<MdBorderColor />} className="icon-button" onClick={handleEdit} />
                {/* Botão de exclusão da marca */}
                <IconButton icon={<MdCancel />} className="icon-button-del" onClick={handleDelete} />
            </td>
        </tr>
    );
};

export default Marca; // Exporta o componente Marca
