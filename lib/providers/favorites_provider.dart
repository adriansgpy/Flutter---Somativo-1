// Implementa RF04, RF05 e RF06 — Provedor de Favoritos (ChangeNotifier) com SharedPreferences
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../services/storage_service.dart';

class FavoritesProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Pokemon> _favorites = [];
  String? _username;

  List<Pokemon> get favorites => _favorites;

  FavoritesProvider() {
    _autoInit();
  }

  // Inicialização automática para carregar favoritos salvos assim que o app inicia (RF06)
  Future<void> _autoInit() async {
    final user = await _storageService.getActiveUsername();
    await initialize(user);
  }

  // Inicializa a lista de favoritos com base no usuário autenticado no momento (RF06)
  Future<void> initialize(String username) async {
    _username = username.trim();
    _favorites = await _storageService.loadFavorites(_username!);
    notifyListeners();
  }

  // Verifica de forma síncrona se um item específico já está na lista de favoritos
  bool isFavorite(int id) {
    return _favorites.any((p) => p.id == id);
  }

  // Alterna o estado de favorito de um Pokémon, sincronizando com o armazenamento local (RF04 e RF06)
  Future<void> toggleFavorite(Pokemon pokemon) async {
    _username ??= await _storageService.getActiveUsername();
    final user = _username!;

    if (isFavorite(pokemon.id)) {
      _favorites.removeWhere((p) => p.id == pokemon.id);
    } else {
      _favorites.add(pokemon);
    }
    
    notifyListeners();
    // Persiste a nova lista de favoritos localmente com SharedPreferences (RF06)
    await _storageService.saveFavorites(user, _favorites);
  }

  // Método auxiliar para remoção direta a partir da Tela de Favoritos (RF05)
  // Garante reatividade instantânea sem necessidade de recarregar a tela
  Future<void> removeFavorite(int id) async {
    _username ??= await _storageService.getActiveUsername();
    final user = _username!;
    _favorites.removeWhere((p) => p.id == id);
    notifyListeners();
    await _storageService.saveFavorites(user, _favorites);
  }

  // Limpa o estado global ao efetuar logout
  void clear() {
    _favorites = [];
    _username = null;
    notifyListeners();
  }
}
