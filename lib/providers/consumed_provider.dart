// Implementa RF06 e RF07 — Provedor de Itens Consumidos / "Capturados" (ChangeNotifier) com SharedPreferences
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../services/storage_service.dart';

class ConsumedProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Pokemon> _consumed = [];
  String? _username;

  List<Pokemon> get consumed => _consumed;

  ConsumedProvider() {
    _autoInit();
  }

  // Inicialização automática para carregar capturas salvas assim que o app inicia (RF06)
  Future<void> _autoInit() async {
    final user = await _storageService.getActiveUsername();
    await initialize(user);
  }

  // Inicializa a lista de Pokémon capturados do usuário logado (RF06)
  Future<void> initialize(String username) async {
    _username = username.trim();
    _consumed = await _storageService.loadConsumed(_username!);
    notifyListeners();
  }

  // Verifica se o Pokémon já está na lista de capturados (consumidos)
  bool isConsumed(int id) {
    return _consumed.any((p) => p.id == id);
  }

  // Alterna o estado de capturado ("Capturado" - RF07 e RF06)
  Future<void> toggleConsumed(Pokemon pokemon) async {
    _username ??= await _storageService.getActiveUsername();
    final user = _username!;

    if (isConsumed(pokemon.id)) {
      _consumed.removeWhere((p) => p.id == pokemon.id);
    } else {
      _consumed.add(pokemon);
    }
    
    notifyListeners();
    // Salva de forma persistente no dispositivo local com SharedPreferences (RF06)
    await _storageService.saveConsumed(user, _consumed);
  }

  // Limpa o estado local ao efetuar logout
  void clear() {
    _consumed = [];
    _username = null;
    notifyListeners();
  }
}
