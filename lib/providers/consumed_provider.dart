// Implementa RF06 e RF07 — Provedor de Itens Consumidos / "Capturados" (ChangeNotifier)
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../services/storage_service.dart';

class ConsumedProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Pokemon> _consumed = [];
  String? _username;

  List<Pokemon> get consumed => _consumed;

  // Inicializa a lista de Pokémon capturados do usuário logado (RF06)
  Future<void> initialize(String username) async {
    _username = username;
    _consumed = await _storageService.loadConsumed(username);
    notifyListeners();
  }

  // Verifica se o Pokémon já está na lista de capturados (consumidos)
  bool isConsumed(int id) {
    return _consumed.any((p) => p.id == id);
  }

  // Alterna o estado de capturado ("Capturado" - RF07)
  Future<void> toggleConsumed(Pokemon pokemon) async {
    if (_username == null) return;

    if (isConsumed(pokemon.id)) {
      _consumed.removeWhere((p) => p.id == pokemon.id);
    } else {
      _consumed.add(pokemon);
    }
    
    notifyListeners();
    // Salva de forma persistente no dispositivo local (RF06)
    await _storageService.saveConsumed(_username!, _consumed);
  }

  // Limpa o estado local ao efetuar logout
  void clear() {
    _consumed = [];
    _username = null;
    notifyListeners();
  }
}
