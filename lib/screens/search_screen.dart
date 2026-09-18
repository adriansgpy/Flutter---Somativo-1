// Implementa RF08, RF09 e RF10 — Tela de Busca Dedicada com Redirecionamento Direto e Acessibilidade
import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'detail_screen.dart';
import '../widgets/loading_indicator.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final ApiService _apiService = ApiService();
  final TextEditingController _searchController = TextEditingController();
  
  bool _isLoading = false;
  String? _statusMessage;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  // Executa busca pelo nome exato (RF08)
  Future<void> _executeSearch() async {
    final query = _searchController.text.trim();
    if (query.isEmpty) {
      setState(() {
        _statusMessage = "Por favor, insira o nome ou ID de um Pokémon.";
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _statusMessage = null;
    });

    try {
      final pokemon = await _apiService.fetchPokemonDetails(query);
      setState(() {
        _isLoading = false;
      });

      if (mounted) {
        if (pokemon != null) {
          // Navega DIRETO para a Tela de Detalhes do item encontrado (RF08)
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => DetailScreen(pokemon: pokemon),
            ),
          );
        } else {
          // Trata o 404 como "não encontrado" (RF08 e RF09)
          setState(() {
            _statusMessage = "Pokémon '$query' não foi encontrado na base de dados.";
          });
        }
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
        _statusMessage = "Erro ao buscar: ${e.toString().replaceFirst("Exception: ", "")}";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Busca Avançada"),
        backgroundColor: Colors.redAccent,
        foregroundColor: Colors.white,
      ),
      body: Container(
        color: Colors.grey.shade50,
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              "Pesquise seu Pokémon",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            const Text(
              "Digite o nome exato ou ID numérico. Ao encontrar o resultado, você será redirecionado imediatamente para a tela de detalhes.",
              style: TextStyle(fontSize: 14, color: Colors.black54),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),

            // Campo de Entrada (RF08 e RF10)
            Semantics(
              label: "Campo para busca de Pokémon por nome exato em minúsculas",
              child: TextField(
                controller: _searchController,
                textInputAction: TextInputAction.search,
                onSubmitted: (_) => _executeSearch(),
                decoration: InputDecoration(
                  labelText: "Nome ou ID do Pokémon",
                  hintText: "Exemplo: charizard ou 6",
                  prefixIcon: const Icon(Icons.search, color: Colors.redAccent),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Botão de Pesquisa (RF08 e RF10)
            Semantics(
              button: true,
              label: "Toque duas vezes para pesquisar",
              child: SizedBox(
                height: 48, // Acessibilidade RF10
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _executeSearch,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.redAccent,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                  ),
                  child: const Text(
                    "PESQUISAR",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Indicador de Carregamento ou Mensagem de Status (RF09)
            if (_isLoading)
              const LoadingIndicator(message: "Buscando dados da criatura...")
            else if (_statusMessage != null)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.red.shade200),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.info_outline, color: Colors.redAccent),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        _statusMessage!,
                        style: TextStyle(color: Colors.red.shade800, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
