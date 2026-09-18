// Implementa RF06, RF07 e RF10 — Tela de Pokémons "Capturados" (Consumidos) Reativa e Acessível
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/consumed_provider.dart';
import 'detail_screen.dart';

class ConsumedScreen extends StatelessWidget {
  const ConsumedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Pokémons Capturados"),
        backgroundColor: Colors.redAccent,
        foregroundColor: Colors.white,
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: Consumer<ConsumedProvider>(
          builder: (context, consumedProvider, child) {
            final consumedList = consumedProvider.consumed;

            if (consumedList.isEmpty) {
              return Center(
                padding: const EdgeInsets.all(24.0),
                child: Semantics(
                  label: "Lista de capturas vazia. Você ainda não capturou nenhum Pokémon.",
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.catching_pokemon,
                        color: Colors.red.shade200,
                        size: 80,
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        "Nenhuma captura ainda!",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "Abra os detalhes de um Pokémon e toque em 'MARCAR COMO CAPTURADO' para que ele seja catalogado nesta seção.",
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.black54,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              );
            }

            return Semantics(
              label: "Lista de Pokémon capturados. Contém ${consumedList.length} itens.",
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
                itemCount: consumedList.length,
                itemBuilder: (context, index) {
                  final pokemon = consumedList[index];

                  return Semantics(
                    button: true,
                    label: "Pokémon ${pokemon.name}. Clique duas vezes para ver detalhes.",
                    child: Card(
                      margin: const EdgeInsets.symmetric(vertical: 6.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 1,
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        leading: Image.network(
                          pokemon.imageUrl,
                          width: 50,
                          height: 50,
                          fit: BoxFit.contain,
                          errorBuilder: (context, error, stackTrace) => const Icon(Icons.help_outline),
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
                        trailing: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.green.shade50,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.green.shade300),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.check, size: 14, color: Colors.green.shade700),
                              const SizedBox(width: 4),
                              Text(
                                "Capturado",
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green.shade800,
                                ),
                              ),
                            ],
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
