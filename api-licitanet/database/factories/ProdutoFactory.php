<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Produto>
 */
class ProdutoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->unique()->word,
            'valor'=> $this->faker->numberBetween(1, 5000),
            'estoque'=> $this->faker->numberBetween(0, 1),
            'codMarca'=> $this->faker->numberBetween(1, 4),
            'codCidade'=> $this->faker->numberBetween(1, 4),
        ];
    }
}
