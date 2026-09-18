// Implementa RF01, RF02 e RF10 — Card de Item em Grid com Detalhes Visuais e Acessibilidade
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../screens/detail_screen.dart';

class ItemGridCard extends StatelessWidget {
  final Pokemon pokemon;

  const ItemGridCard({super.key, required this.pokemon});

  // Decisão técnica: Mapeamento de cores baseado nos tipos principais do Pokémon
  // para dar uma identidade visual linda ao projeto de faculdade!
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
    final cardColor = _getTypeColor(primaryType);

    return Semantics(
      button: true,
      label: "Pokémon ${pokemon.name}, número ${pokemon.id}. Toque para ver detalhes.",
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        child: InkWell(
          onTap: () {
            // Navega para a Tela de Detalhes (RF02)
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailScreen(pokemon: pokemon),
              ),
            );
          },
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  cardColor.withOpacity(0.15),
                  cardColor.withOpacity(0.05),
                ],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Identificador / Número do Pokémon
                Padding(
                  padding: const EdgeInsets.only(top: 8.0, right: 12.0),
                  child: Align(
                    alignment: Alignment.topRight,
                    child: Text(
                      "#${pokemon.id.toString().padLeft(3, '0')}",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ),
                ),
                
                // Imagem do Pokémon (RF01 - com tratamento de placeholder)
                Expanded(
                  child: Hero(
                    tag: "poke_image_${pokemon.id}",
                    child: Image.network(
                      pokemon.imageUrl,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        // Se falhar o carregamento ou não houver imagem, exibe placeholder sem quebrar layout
                        return Center(
                          child: Icon(
                            Icons.help_outline,
                            size: 48,
                            color: Colors.grey.shade400,
                          ),
                        );
                      },
                      loadingBuilder: (context, child, loadingProgress) {
                        if (loadingProgress == null) return child;
                        return const Center(
                          child: SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.redAccent),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),

                // Nome do Pokémon
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Text(
                    pokemon.name.toUpperCase(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),

                const SizedBox(height: 4),

                // Badges de Tipos do Pokémon
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0, left: 8, right: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: pokemon.types.map((type) {
                      return Flexible(
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 2.0),
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                          decoration: BoxDecoration(
                            color: _getTypeColor(type),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: FittedBox(
                            child: Text(
                              type.toUpperCase(),
                              style: const TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
