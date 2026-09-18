// Implementa RF05, RF06 e RF10 — Tela de Favoritos Reativa e Acessível com Consumer
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/favorites_provider.dart';
import 'detail_screen.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Meus Favoritos"),
        backgroundColor: Colors.amber,
        foregroundColor: Colors.white,
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: Consumer<FavoritesProvider>(
          builder: (context, favoritesProvider, child) {
            final favoritesList = favoritesProvider.favorites;

            if (favoritesList.isEmpty) {
              return Padding(
                padding: const EdgeInsets.all(24.0),
                child: Center(
                  child: Semantics(
                    label: "Lista de favoritos vazia. Você ainda não favoritou nenhum Pokémon.",
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.star_outline_rounded,
                          color: Colors.amber.shade300,
                          size: 80,
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          "Estante Vazia!",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          "Os Pokémon que você favoritar tocando na estrela da tela de detalhes aparecerão aqui.",
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.black54,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }

            return Semantics(
              label: "Lista de Pokémon favoritados. Contém ${favoritesList.length} itens.",
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
                itemCount: favoritesList.length,
                itemBuilder: (context, index) {
                  final pokemon = favoritesList[index];

                  return Semantics(
                    button: true,
                    label: "Pokémon ${pokemon.name}. Clique duas vezes para ver detalhes ou use o botão para desfavoritar.",
                    child: Card(
                      margin: const EdgeInsets.symmetric(vertical: 6.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 1,
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        leading: Hero(
                          tag: "poke_image_fav_${pokemon.id}",
                          child: Image.network(
                            pokemon.imageUrl,
                            width: 50,
                            height: 50,
                            fit: BoxFit.contain,
                            errorBuilder: (context, error, stackTrace) => const Icon(Icons.help_outline),
                          ),
                        ),
                        title: Text(
                          pokemon.name.toUpperCase(),
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        subtitle: Text(
                          "Nº ${pokemon.id.toString().padLeft(3, '0')} • ${pokemon.types.join(', ').toUpperCase()}",
                          style: const TextStyle(fontSize: 13, color: Colors.black54),
                        ),
                        trailing: Semantics(
                          button: true,
                          label: "Remover ${pokemon.name} dos favoritos",
                          child: SizedBox(
                            width: 48, // Atende RF10 (Área mínima de toque de 48px)
                            height: 48,
                            child: IconButton(
                              icon: const Icon(Icons.delete_outline_rounded, color: Colors.redAccent),
                              onPressed: () {
                                // Desfavorita e atualiza a tela automaticamente via Consumer (RF05)
                                favoritesProvider.removeFavorite(pokemon.id);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text("${pokemon.name.toUpperCase()} removido dos favoritos."),
                                    duration: const Duration(seconds: 2),
                                    action: SnackBarAction(
                                      label: "DESFAZER",
                                      textColor: Colors.amber,
                                      onPressed: () {
                                        favoritesProvider.toggleFavorite(pokemon);
                                      },
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                        onTap: () {
                          // Navega para Detalhes (RF02)
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DetailScreen(pokemon: pokemon),
                            ),
                          );
                        },
                      ),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
