import React from "react";
import Marca from "./Marca"; // Importa o componente Marca
import style from "./MarcasList.module.css"; // Importa os estilos CSS do componente

// Componente para exibir uma lista de marcas
const MarcasList = ({ marcas, onDelete, onEdit }) => {
    // Função para lidar com a exclusão de uma marca
    const handleDelete = cod => {
        onDelete(cod);
    };

    // Função para lidar com a edição de uma marca
    const handleEdit = data => {
        onEdit(data);
    };

    // Renderização do componente
    return (
        <div className={style.data}>
            {/* Tabela para exibir as marcas */}
            <table className={style.marcas}>
                <thead>
                    {/* Cabeçalho da tabela */}
                    <tr>
                        <th>Cod</th>
                        <th>Nome</th>
                        <th>Fabricante</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeamento das marcas para renderizar cada uma delas */}
                    {marcas.map(marca => (
                        <Marca
                            key={marca.cod} // Chave única para cada marca na lista
                            marca={marca} // Passa os dados da marca para o componente Marca
                            onDelete={handleDelete} // Passa a função de exclusão para o componente Marca
                            onEdit={handleEdit} // Passa a função de edição para o componente Marca
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarcasList; // Exporta o componente MarcasList
