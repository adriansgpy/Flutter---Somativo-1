// Implementa RF01, RF02, RF07, RF08, RF09 e RF10 — Tela de Catálogo Principal (Pokédex)
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../models/pokemon.dart';
import '../providers/auth_provider.dart';
import '../providers/favorites_provider.dart';
import '../providers/consumed_provider.dart';
import '../widgets/item_grid_card.dart';
import '../widgets/loading_indicator.dart';
import '../widgets/error_view.dart';
import 'favorites_screen.dart';
import 'consumed_screen.dart';
import 'detail_screen.dart';

class CatalogScreen extends StatefulWidget {
  const CatalogScreen({super.key});

  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  final ApiService _apiService = ApiService();
  final TextEditingController _searchController = TextEditingController();

  List<Pokemon> _pokemonList = [];
  int _currentPage = 0;
  bool _isLoadingInitial = true;
  bool _isLoadingMore = false;
  bool _isLoadingSearch = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _loadInitialData();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final auth = Provider.of<AuthProvider>(context, listen: false);
      final user = auth.currentUser ?? "treinador";
      Provider.of<FavoritesProvider>(context, listen: false).initialize(user);
      Provider.of<ConsumedProvider>(context, listen: false).initialize(user);
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  // Carrega os primeiros 20 Pokémons (RF01)
  Future<void> _loadInitialData() async {
    setState(() {
      _isLoadingInitial = true;
      _errorMessage = null;
    });

    try {
      final list = await _apiService.fetchPokemonPage(0);
      setState(() {
        _pokemonList = list;
        _currentPage = 0;
        _isLoadingInitial = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceFirst("Exception: ", "");
        _isLoadingInitial = false;
      });
    }
  }

  // Carrega a página seguinte e concatena à lista existente (RF01)
  Future<void> _loadMoreData() async {
    if (_isLoadingMore) return;

    setState(() {
      _isLoadingMore = true;
    });

    try {
      final nextPage = _currentPage + 1;
      final list = await _apiService.fetchPokemonPage(nextPage);
      setState(() {
        _pokemonList.addAll(list);
        _currentPage = nextPage;
        _isLoadingMore = false;
      });
    } catch (e) {
      setState(() {
        _isLoadingMore = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Falha ao carregar mais pokémons: ${e.toString()}"),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  // Realiza a busca pelo nome exato (RF08 e RF09)
  Future<void> _handleSearch() async {
    final query = _searchController.text.trim();
    if (query.isEmpty) return;

    setState(() {
      _isLoadingSearch = true;
    });

    try {
      final pokemon = await _apiService.fetchPokemonDetails(query);
      setState(() {
        _isLoadingSearch = false;
      });

      if (mounted) {
        if (pokemon != null) {
          // Limpa campo de busca para uso posterior
          _searchController.clear();
          // Navega diretamente para a Tela de Detalhes do item encontrado (RF08)
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => DetailScreen(pokemon: pokemon),
            ),
          );
        } else {
          // Trata o 404 como "não encontrado" sem estourar exception
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text("Nenhum Pokémon encontrado com este nome exato."),
              backgroundColor: Colors.deepOrange,
            ),
          );
        }
      }
    } catch (e) {
      setState(() {
        _isLoadingSearch = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Ocorreu um erro na busca: ${e.toString()}"),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Pokédex Interativa",
          style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1),
        ),
        backgroundColor: Colors.redAccent,
        foregroundColor: Colors.white,
        actions: [
          // Botão Logout
          Semantics(
            button: true,
            label: "Sair da conta de usuário",
            child: IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () {
                Provider.of<FavoritesProvider>(context, listen: false).clear();
                Provider.of<ConsumedProvider>(context, listen: false).clear();
                authProvider.logout();
              },
            ),
          )
        ],
      ),
      body: Container(
        color: Colors.grey.shade100,
        child: Column(
          children: [
            // Campo de busca (RF08)
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(
                children: [
                  Expanded(
                    child: Semantics(
                      label: "Campo de pesquisa. Digite o nome exato do Pokémon em minúsculas.",
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.05),
                              blurRadius: 4,
                            ),
                          ],
                        ),
                        child: TextField(
                          controller: _searchController,
                          textInputAction: TextInputAction.search,
                          onSubmitted: (_) => _handleSearch(),
                          decoration: const InputDecoration(
                            hintText: "Buscar por nome exato (ex: pikachu)",
                            prefixIcon: Icon(Icons.search, color: Colors.redAccent),
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Semantics(
                    button: true,
                    label: "Executar busca de pokémon",
                    child: SizedBox(
                      height: 48, // Acessibilidade RF10
                      child: ElevatedButton(
                        onPressed: _isLoadingSearch ? null : _handleSearch,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.redAccent,
                          foregroundColor: Colors.white,
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: _isLoadingSearch
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2,
                                ),
                              )
                            : const Text("Buscar", style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Visualização Principal
            Expanded(
              child: _isLoadingInitial
                  ? const LoadingIndicator(message: "Carregando a Pokédex...")
                  : _errorMessage != null
                      ? ErrorView(
                          errorMessage: _errorMessage!,
                          onRetry: _loadInitialData,
                        )
                      : Column(
                          children: [
                            Expanded(
                              child: LayoutBuilder(
                                builder: (context, constraints) {
                                  // Adaptação responsiva de colunas para o grid (RF10)
                                  final double width = constraints.maxWidth;
                                  int crossAxisCount = 2;
                                  if (width > 900) {
                                    crossAxisCount = 5;
                                  } else if (width > 600) {
                                    crossAxisCount = 3;
                                  }

                                  return GridView.builder(
                                    padding: const EdgeInsets.symmetric(horizontal: 12.0),
                                    itemCount: _pokemonList.length,
                                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: crossAxisCount,
                                      crossAxisSpacing: 12,
                                      mainAxisSpacing: 12,
                                      childAspectRatio: 0.85,
                                    ),
                                    itemBuilder: (context, index) {
                                      return ItemGridCard(pokemon: _pokemonList[index]);
                                    },
                                  );
                                },
                              ),
                            ),
                            
                            // Botão Carregar Mais (RF01 e RF09)
                            Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Semantics(
                                button: true,
                                label: "Carregar mais 20 Pokémons no catálogo",
                                child: SizedBox(
                                  width: double.infinity,
                                  height: 48, // Acessibilidade RF10
                                  child: ElevatedButton(
                                    onPressed: _isLoadingMore ? null : _loadMoreData,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.redAccent,
                                      foregroundColor: Colors.white,
                                      elevation: 3,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                    ),
                                    child: _isLoadingMore
                                        ? const SizedBox(
                                            width: 24,
                                            height: 24,
                                            child: CircularProgressIndicator(
                                              color: Colors.white,
                                              strokeWidth: 2.5,
                                            ),
                                          )
                                        : const Text(
                                            "CARREGAR MAIS",
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              letterSpacing: 0.8,
                                            ),
                                          ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        elevation: 8,
        child: SizedBox(
          height: 60,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              // Aba Favoritos (RF05)
              Semantics(
                button: true,
                label: "Ir para a tela de pokémons favoritos",
                child: InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const FavoritesScreen()),
                    );
                  },
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: const Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.star, color: Colors.amber, size: 24),
                        Text(
                          "Favoritos",
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black87),
                        )
                      ],
                    ),
                  ),
                ),
              ),

              // Aba Capturados (RF07)
              Semantics(
                button: true,
                label: "Ir para a tela de pokémons capturados",
                child: InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const ConsumedScreen()),
                    );
                  },
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: const Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.catching_pokemon, color: Colors.redAccent, size: 24),
                        Text(
                          "Capturados",
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black87),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
