<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class MarcaController extends Controller
{
    // Listar todas as marcas
    public function listarMarcas()
    {
        try {
            // Busca todas as marcas e retorna como JSON
            $marcas = Marca::all();
            return response()->json($marcas);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro caso ocorra uma exceção
            return response()->json(['error' => 'Erro ao listar as marcas.'], 500);
        }
    }

    // Cadastrar uma nova marca
    public function cadastrarMarca(Request $request)
    {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string|unique:marcas', // Nome da marca deve ser único
                'fabricante' => 'required|string',
            ]);

            // Cria uma nova instância de Marca e define seus atributos
            $marca = new Marca;
            $marca->nome = $request->input('nome');
            $marca->fabricante = $request->input('fabricante');

            // Salva a nova marca no banco de dados
            if ($marca->save()) {
                return response()->json($marca, 201); // Retorna a marca cadastrada com código de status 201 (Created)
            } else {
                return response()->json(['error' => 'Erro ao cadastrar a marca.'], 500);
            }
        } catch (ValidationException $e) {
            // Retorna uma resposta de erro caso ocorra uma exceção de validação
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico caso ocorra outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }

    // Atualizar uma marca específica
    public function atualizarMarca(Request $request, $cod)
    {
        try {
            // Valida os dados recebidos no request
            $request->validate([
                'nome' => 'required|string|unique:marcas,nome,'.$cod, // Nome da marca deve ser único, exceto para esta marca
                'fabricante' => 'required|string',
            ]);

            // Busca a marca a ser atualizada pelo seu código
            $marca = Marca::findOrFail($cod);
            $marca->nome = $request->input('nome');
            $marca->fabricante = $request->input('fabricante');

            // Salva as alterações no banco de dados
            if ($marca->save()) {
                return response()->json($marca); // Retorna a marca atualizada
            } else {
                return response()->json(['error' => 'Erro ao atualizar a marca.'], 500);
            }
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso a marca não seja encontrada
            return response()->json(['error' => 'Marca não encontrada.'], 404);
        } catch (ValidationException $e) {
            // Retorna uma resposta de erro caso ocorra uma exceção de validação
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico caso ocorra outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }

    // Deletar uma marca específica
    public function deletarMarca($cod) {
        try {
            // Busca a marca a ser deletada pelo seu código
            $marca = Marca::findOrFail($cod);
            // Verifica se a marca foi deletada com sucesso
            if ($marca->delete()) {
                return response()->json($marca); // Retorna a marca deletada
            } else {
                return response()->json(['error' => 'Erro ao deletar a marca. Marca está sendo utilizada!'], 500);
            }
        } catch (ModelNotFoundException $e) {
            // Retorna uma resposta de erro caso a marca não seja encontrada
            return response()->json(['error' => 'Marca não encontrada.'], 404);
        } catch (\Exception $e) {
            // Retorna uma resposta de erro genérico caso ocorra outra exceção
            return response()->json(['error' => 'Erro interno do servidor.'], 500);
        }
    }
}
