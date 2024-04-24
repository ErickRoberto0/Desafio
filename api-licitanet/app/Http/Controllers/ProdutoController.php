<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProdutoController extends Controller
{
    // Listar todos os produtos cadastrados
    public function listarProdutos() {
        try {
            // Retorna todos os produtos cadastrados, incluindo informações de marca e cidade
            return Produto::with('marca', 'cidade')->get();
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao listar os produtos.'], 500);
        }
    }

    // Cadastrar um novo produto
    public function cadastrarProduto(Request $request) {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string',
                'valor' => 'required|numeric',
                'estoque' => 'required|numeric',
                'codMarca' => 'required|exists:marcas,cod', // Verifica se a marca existe
                'codCidade' => 'required|exists:cidades,cod', // Verifica se a cidade existe
            ]);

            // Cria um novo produto com os dados fornecidos
            $produto = Produto::create($request->all());

            return $produto; // Retorna o produto cadastrado
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao cadastrar o produto.'], 500);
        }
    }

    // Buscar um produto específico
    public function buscarPorId($cod) {
        try {
            // Busca e retorna um produto específico pelo seu código, incluindo informações de marca e cidade
            return Produto::with('marca', 'cidade')->findOrFail($cod);
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso o produto não seja encontrado
            return response()->json(['error' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao buscar o produto.'], 500);
        }
    }

    // Atualizar um produto específico
    public function atualizarProduto(Request $request, $cod) {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string',
                'valor' => 'required|numeric',
                'estoque' => 'required|numeric',
                'codMarca' => 'required|exists:marcas,cod', // Verifica se a marca existe
                'codCidade' => 'required|exists:cidades,cod', // Verifica se a cidade existe
            ]);

            // Busca o produto a ser atualizado pelo seu código
            $produto = Produto::findOrFail($cod);
            
            // Atualiza os dados do produto com os novos valores fornecidos
            $produto->update($request->all());

            return $produto; // Retorna o produto atualizado
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso o produto não seja encontrado
            return response()->json(['error' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao atualizar o produto.'], 500);
        }
    }

    // Deletar um produto específico
    public function deletarProduto($cod) {
        try {
            // Busca o produto a ser deletado pelo seu código
            $produto = Produto::findOrFail($cod);

            // Verifica se o produto possui estoque
            if ($produto->estoque > 0) {
                // Se o produto ainda tiver estoque, retorna uma mensagem de erro
                return response()->json(['error' => 'Este produto não pode ser excluído porque ainda possui estoque.'], 400);
            }

            // Se o produto não tiver estoque, pode ser excluído
            $produto->delete();

            return $produto; // Retorna o produto deletado
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso o produto não seja encontrado
            return response()->json(['error' => 'Produto não encontrado.'], 404);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao deletar o produto.'], 500);
        }
    }
}
