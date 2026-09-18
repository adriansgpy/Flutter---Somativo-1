// Implementa RF03, RF04, RF06, RF07 e RF10 — Tela de Detalhes Completa do Pokémon
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/pokemon.dart';
import '../providers/favorites_provider.dart';
import '../providers/consumed_provider.dart';

class DetailScreen extends StatelessWidget {
  final Pokemon pokemon;

  const DetailScreen({super.key, required this.pokemon});

  // Mapeador de cores estético de acordo com o tipo principal do Pokémon
  Color _getTypeColor(String type) {
    switch (type.toLowerCase()) {
      case 'fire':
        return Colors.red.shade400;
      case 'water':
        return Colors.blue.shade400;
      case 'grass':
        return Colors.green.shade400;
      case 'electric':
        return Colors.amber.shade500;
      case 'poison':
        return Colors.purple.shade400;
      case 'bug':
        return Colors.lightGreen.shade500;
      case 'normal':
        return Colors.grey.shade400;
      case 'ground':
        return Colors.brown.shade400;
      case 'fairy':
        return Colors.pink.shade300;
      default:
        return Colors.teal.shade400;
    }
  }

  @override
  Widget build(BuildContext context) {
    final primaryType = pokemon.types.isNotEmpty ? pokemon.types.first : 'normal';
    final themeColor = _getTypeColor(primaryType);

    return Scaffold(
      appBar: AppBar(
        title: Text(pokemon.name.toUpperCase()),
        backgroundColor: themeColor,
        foregroundColor: Colors.white,
        actions: [
          // Ícone de Estrela para Favoritar/Desfavoritar (RF04 e RF10)
          Consumer<FavoritesProvider>(
            builder: (context, favoritesProvider, child) {
              final isFav = favoritesProvider.isFavorite(pokemon.id);
              return Semantics(
                button: true,
                label: isFav 
                    ? "Remover dos favoritos. Pokémon atualmente favoritado."
                    : "Adicionar aos favoritos. Pokémon atualmente não favoritado.",
                child: IconButton(
                  icon: Icon(
                    isFav ? Icons.star_rounded : Icons.star_outline_rounded,
                    color: Colors.white,
                    size: 32,
                  ),
                  onPressed: () {
                    favoritesProvider.toggleFavorite(pokemon);
                  },
                ),
              );
            },
          ),
        ],
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Banner de cabeçalho colorido com a imagem principal em destaque (RF03)
              Container(
                height: 250,
                decoration: BoxDecoration(
                  color: themeColor.withOpacity(0.15),
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(32),
                    bottomRight: Radius.circular(32),
                  ),
                ),
                child: Center(
                  child: Hero(
                    tag: "poke_image_${pokemon.id}",
                    child: Semantics(
                      label: pokemon.semanticDescription,
                      child: Image.network(
                        pokemon.imageUrl,
                        width: 220,
                        height: 220,
                        fit: BoxFit.contain,
                        errorBuilder: (context, error, stackTrace) {
                          return const Icon(Icons.help_outline, size: 80, color: Colors.grey);
                        },
                      ),
                    ),
                  ),
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Título e ID
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Text(
                            pokemon.name.toUpperCase(),
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                          ),
                        ),
                        Text(
                          "#${pokemon.id.toString().padLeft(3, '0')}",
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 12),

                    // Badges de Tipos do Pokémon
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: pokemon.types.map((type) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: _getTypeColor(type),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            type.toUpperCase(),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 24),

                    // Botão de Captura ("Consumido" com rótulo "Capturado" - RF07 e RF10)
                    Consumer<ConsumedProvider>(
                      builder: (context, consumedProvider, child) {
                        final isCap = consumedProvider.isConsumed(pokemon.id);
                        return Semantics(
                          button: true,
                          label: isCap 
                              ? "Marcar como não capturado. Status atual: Capturado."
                              : "Marcar como capturado. Status atual: Não capturado.",
                          child: SizedBox(
                            width: double.infinity,
                            height: 48, // Acessibilidade RF10
                            child: ElevatedButton.icon(
                              onPressed: () {
                                consumedProvider.toggleConsumed(pokemon);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: isCap ? Colors.green.shade600 : Colors.redAccent,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 2,
                              ),
                              icon: Icon(isCap ? Icons.check_circle_outline : Icons.catching_pokemon),
                              label: Text(
                                isCap ? "CAPTURADO!" : "MARCAR COMO CAPTURADO",
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        );
                      },
                    ),

                    const SizedBox(height: 24),

                    // Atributos Básicos (Dimensões - RF03)
                    const Text(
                      "Características Físicas",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: Card(
                            elevation: 0,
                            color: Colors.grey.shade100,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 12.0),
                              child: Column(
                                children: [
                                  const Text("Altura", style: TextStyle(fontSize: 12, color: Colors.black54)),
                                  const SizedBox(height: 4),
                                  Text(
                                    "${(pokemon.height / 10).toStringAsFixed(1)} m",
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Card(
                            elevation: 0,
                            color: Colors.grey.shade100,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 12.0),
                              child: Column(
                                children: [
                                  const Text("Peso", style: TextStyle(fontSize: 12, color: Colors.black54)),
                                  const SizedBox(height: 4),
                                  Text(
                                    "${(pokemon.weight / 10).toStringAsFixed(1)} kg",
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Habilidades
                    const Text(
                      "Habilidades",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: pokemon.abilities.map((ability) {
                        return Chip(
                          backgroundColor: Colors.white,
                          side: BorderSide(color: Colors.grey.shade300),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          label: Text(
                            ability.toUpperCase(),
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.black87),
                          ),
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 24),

                    // Descrição Geral
                    const Text(
                      "Descrição",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.grey.shade200),
                      ),
                      child: Text(
                        pokemon.description,
                        style: const TextStyle(
                          fontSize: 15,
                          height: 1.5,
                          color: Colors.black87,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
