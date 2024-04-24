import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Select from "../../Form/Select";
import SubmitButton from "../../Form/SubmitButton";
import Input from "../../Form/input"; // Corrigido o nome do arquivo
import style from '../../Form/Form.module.css';

// Função para buscar dados da API
const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        return [];
    }
};

// Componente do formulário de produtos
const FormProdutos = ({ handleSubmit, btnText, produtoData }) => {
    // Estados locais do componente
    const [marcas, setMarcas] = useState([]); // Lista de marcas
    const [cidades, setCidades] = useState([]); // Lista de cidades
    const [produto, setProduto] = useState(produtoData || {}); // Dados do produto
    const [submitted, setSubmitted] = useState(false); // Estado para controle de envio do formulário
    const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
    const navigator = useNavigate(); // Hook para navegação programática

    // Efeito para buscar as marcas e cidades ao montar o componente ou quando houver novo envio
    useEffect(() => {
        fetchMarcas();
        fetchCidades();
    }, [submitted]);

    // Função para buscar as marcas na API
    const fetchMarcas = async () => {
        const data = await fetchData("http://127.0.0.1:8000/api/marca");
        setMarcas(data);
    };

    // Função para buscar as cidades na API
    const fetchCidades = async () => {
        const data = await fetchData("http://127.0.0.1:8000/api/cidade");
        setCidades(data);
    };

    // Função para submeter o formulário
    const submit = async (e) => {
        e.preventDefault();
        
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!produto.nome || !produto.valor || !produto.estoque || !produto.marca || !produto.cidade) {
            setError("Todos os campos devem ser preenchidos."); // Define a mensagem de erro
            return; // Impede o envio do formulário
        }
        
        try {
            // Formata os dados do produto
            const formattedProduto = {
                nome: produto.nome,
                valor: parseInt(produto.valor),
                estoque: parseInt(produto.estoque),
                codMarca: parseInt(produto.marca.cod),
                codCidade: parseInt(produto.cidade.cod)
            };
            // Chama a função de envio do formulário passada por props
            await handleSubmit(formattedProduto);
            setSubmitted(true); // Atualiza o estado de envio do formulário
            setProduto({}); // Reseta os dados do produto
            // Navega para a página de produtos com a mensagem de sucesso
            navigator('/produtos', { state: { message: 'Produto cadastrado com sucesso!' } });
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
    };

    // Função para lidar com a mudança nos campos do formulário
    const handleChande = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    // Função para lidar com a seleção da marca no select
    const handleSelectMarca = (e) => {
        setProduto({ ...produto, marca: { cod: e.target.value }});
    };
    
    // Função para lidar com a seleção da cidade no select
    const handleSelectCidade = (e) => {
        setProduto({ ...produto, cidade: { cod: e.target.value }});
    };

    // Renderização do componente
    return (
        <form onSubmit={submit} className={style.form}>
            {error && <div className={style.error}>{error}</div>} {/* Exibe a mensagem de erro se houver */}
            <div className={style.inputRow}>
                <Input type="text" name="nome" placeholder="Nome" handleOnChange={handleChande} value={produto.nome || ''}/>
            </div>
            <div className={style.inputRow}>
                {/* Componente select para seleção de marca */}
                <Select name="marca_id" text="Selecione a marca" options={marcas} handleOnChange={handleSelectMarca} value={produto.marca ? produto.marca.cod : ''}/>
                {/* Componente select para seleção de cidade */}
                <Select name="cidade_id" text="Selecione a cidade" options={cidades} handleOnChange={handleSelectCidade} value={produto.cidade ? produto.cidade.cod : ''}/>
                <Input type="number" name="estoque" placeholder="Estoque" handleOnChange={handleChande} value={produto.estoque || ''}/>
                <Input type="number" name="valor" placeholder="Valor" handleOnChange={handleChande} value={produto.valor || ''}/>
            </div>
            <div className={style.buttonContainer}>
                <p className={style.p} > Modo de Edição = Atualizar  </p><SubmitButton text={btnText} />
            </div>
        </form>
    );
}

export default FormProdutos; // Exporta o componente de FormProdutos
