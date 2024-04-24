<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\MarcaController;
//Cria rotas para produto

Route::post('/cadastrar', [ProdutoController::class, 'cadastrarProduto']);
Route::get('/buscar/{cod}', [ProdutoController::class,  'buscarPorId']);
Route::get('/listar', [ProdutoController::class,  'listarProdutos']);
Route::put('/atualizar/{cod}', [ProdutoController::class,  'atualizarProduto']);
Route::delete('/deletar/{cod}', [ProdutoController::class,  'deletarProduto']);

//Cria rota para cidade

Route::get('/cidade', [CidadeController::class,  'listarCidades']);
Route::post('/cadastrarCidade', [CidadeController::class,  'cadastrarCidade']);
Route::put('/atualizarCidade/{cod}', [CidadeController::class,  'atualizarCidade']);
Route::delete('/deletarCidade/{cod}', [CidadeController::class,  'deletarCidade']);

Route::get('/marca', [MarcaController::class,  'listarMarcas']);
Route::post('/cadastrarMarca', [MarcaController::class,  'cadastrarMarca']);
Route::put('/atualizarMarca/{cod}', [MarcaController::class,  'atualizarMarca']);
Route::delete('/deletarMarca/{cod}', [MarcaController::class,  'deletarMarca']);
