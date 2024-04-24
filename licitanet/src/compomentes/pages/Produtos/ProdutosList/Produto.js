// Importando os módulos necessários do React e de outros pacotes
import React, { Component } from "react";
import { MdBorderColor, MdCancel } from "react-icons/md"; // Importando ícones de edição e exclusão da biblioteca de ícones do React
import IconButton from "../../../Form/IconButton"; // Importando o componente IconButton de um diretório local

// Definindo um componente React chamado Produto
class Produto extends Component {
    
    // Método para lidar com a exclusão do produto
    onDelete = () => {
        // Chamando a função onDelete passada como propriedade e passando o código do produto como argumento
        this.props.onDelete(this.props.produto.cod);
    }

    // Método para lidar com a edição do produto
    onEdit = () => {
        // Chamando a função onEdit passada como propriedade e passando o objeto do produto inteiro como argumento
        this.props.onEdit(this.props.produto);
    }

    // Método de renderização para o componente
    render() {
        // Desestruturando as propriedades para extrair os detalhes do produto
        const { cod, nome, estoque, valor, marca, cidade } = this.props.produto;

        // Renderizando o componente
        return ( 
            <tr>
                {/* Renderizando os detalhes do produto em células da tabela */}
                <td>{cod}</td>
                <td>{nome}</td>
                <td>{marca.nome}</td>
                <td>{cidade.nome}</td>
                <td>{estoque}</td>
                <td>{valor}</td>
                {/* Renderizando botões de edição e exclusão */}
                <td>
                    {/* Componente IconButton para edição com ícone MdBorderColor */}
                    <IconButton icon={<MdBorderColor />} className="icon-button" onClick={this.onEdit} />
                    {/* Componente IconButton para exclusão com ícone MdCancel */}
                    <IconButton icon={<MdCancel />} className="icon-button-del" onClick={this.onDelete} />
                </td>
            </tr>
        )
    }

}

export default Produto; // Exportando o componente Produto
