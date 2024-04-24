<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cidade;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class CidadeController extends Controller
{
    // Listar todas as cidades
    public function listarCidades() {
        try {
            // Busca e retorna todas as cidades
            $cidades = Cidade::all();
            return response()->json($cidades);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro em caso de exceção
            return response()->json(['error' => 'Erro ao listar as cidades.'], 500);
        }
    }
   
    // Cadastrar uma nova cidade
    public function cadastrarCidade(Request $request) {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string|unique:cidades',
            ]);

            // Cria uma nova instância de Cidade e define seus atributos
            $cidade = new Cidade;
            $cidade->nome = $request->input('nome');

            // Salva a nova cidade no banco de dados
            if ($cidade->save()) {
                return response()->json($cidade, 201); // Retorna a cidade cadastrada com código de status 201 (Created)
            } else {
                return response()->json(['error' => 'Erro ao cadastrar a cidade.'], 500);
            }
        } catch (ValidationException $e) {
            // Retorna uma resposta de erro em caso de exceção de validação
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico em caso de outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }

    // Atualizar uma cidade específica
    public function atualizarCidade(Request $request, $cod) {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string|unique:cidades,nome,'.$cod,
            ]);

            // Busca a cidade a ser atualizada pelo seu código
            $cidade = Cidade::findOrFail($cod);
            $cidade->nome = $request->input('nome');

            // Salva as alterações no banco de dados
            if ($cidade->save()) {
                return response()->json($cidade); // Retorna a cidade atualizada
            } else {
                return response()->json(['error' => 'Erro ao atualizar a cidade.'], 500);
            }
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso a cidade não seja encontrada
            return response()->json(['error' => 'Cidade não encontrada.'], 404);
        } catch (ValidationException $e) {
            // Retorna uma resposta de erro em caso de exceção de validação
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico em caso de outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }

    // Deletar uma cidade específica
    public function deletarCidade($cod) {
        try {
            // Busca a cidade a ser deletada pelo seu código
            $cidade = Cidade::findOrFail($cod);

            // Verifica se a cidade foi deletada com sucesso
            if ($cidade->delete()) {
                return response()->json($cidade); // Retorna a cidade deletada
            } else {
                return response()->json(['error' => 'Erro ao deletar a cidade.'], 500);
            }
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso a cidade não seja encontrada
            return response()->json(['error' => 'Cidade não encontrada.'], 404);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico em caso de outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }
}
