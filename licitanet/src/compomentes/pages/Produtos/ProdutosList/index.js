import React, { Component } from "react";
import Produto from "./Produto"; // Importação do componente Produto
import style from "./ProdutosList.module.css"; // Estilos do componente

class ProdutosList extends Component {
    // Função para lidar com a exclusão de um produto
    onDelete = cod => {
        this.props.onDelete(cod);
    }

    // Função para lidar com a edição de um produto
    onEdit = data => {
        this.props.onEdit(data);
    }

    render() {
        // Destruturação da lista de produtos recebida por props
        const produtos = this.props.produtos;

        return (
            <div className={style.data}>
                <table className={style.produtos}>
                    <thead>
                        <tr>
                            {/* Cabeçalhos da tabela */}
                            <th>Cod</th>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Cidade</th>
                            <th>Estoque</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapeia a lista de produtos e renderiza um componente Produto para cada produto
                            produtos.map((produto) => {
                                return (
                                    <Produto
                                        produto={produto}
                                        key={produto.cod}
                                        onDelete={this.onDelete}
                                        onEdit={this.onEdit}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProdutosList; // Exporta o componente ProdutosList
