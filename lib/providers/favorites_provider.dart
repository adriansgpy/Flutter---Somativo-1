// Implementa RF04, RF05 e RF06 — Provedor de Favoritos (ChangeNotifier)
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../services/storage_service.dart';

class FavoritesProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Pokemon> _favorites = [];
  String? _username;

  List<Pokemon> get favorites => _favorites;

  // Inicializa a lista de favoritos com base no usuário autenticado no momento (RF06)
  Future<void> initialize(String username) async {
    _username = username;
    _favorites = await _storageService.loadFavorites(username);
    notifyListeners();
  }

  // Verifica de forma síncrona se um item específico já está na lista de favoritos
  bool isFavorite(int id) {
    return _favorites.any((p) => p.id == id);
  }

  // Alterna o estado de favorito de um Pokémon, sincronizando com o armazenamento local (RF04)
  Future<void> toggleFavorite(Pokemon pokemon) async {
    if (_username == null) return;

    if (isFavorite(pokemon.id)) {
      _favorites.removeWhere((p) => p.id == pokemon.id);
    } else {
      _favorites.add(pokemon);
    }
    
    notifyListeners();
    // Persiste a nova lista de favoritos localmente (RF06)
    await _storageService.saveFavorites(_username!, _favorites);
  }

  // Método auxiliar para remoção direta a partir da Tela de Favoritos (RF05)
  // Garante reatividade instantânea sem necessidade de recarregar a tela
  Future<void> removeFavorite(int id) async {
    if (_username == null) return;
    _favorites.removeWhere((p) => p.id == id);
    notifyListeners();
    await _storageService.saveFavorites(_username!, _favorites);
  }

  // Limpa o estado global ao efetuar logout
  void clear() {
    _favorites = [];
    _username = null;
    notifyListeners();
  }
}
