// Implementa RF06 — Serviço de Persistência Local para Favoritos e Itens "Consumidos" (Capturados) com SharedPreferences
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/pokemon.dart';

class StorageService {
  static const String _keyFavoritesPrefix = "user_fav_list_";
  static const String _keyConsumedPrefix = "user_con_list_";
  static const String _keyCurrentUser = "current_user_session";

  // Retorna o usuário logado ativo no SharedPreferences ou 'treinador' como fallback
  Future<String> getActiveUsername() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final user = prefs.getString(_keyCurrentUser);
      if (user != null && user.trim().isNotEmpty) {
        return user.trim();
      }
    } catch (_) {}
    return "treinador";
  }

  // Carrega a lista de favoritos vinculada ao usuário logado no SharedPreferences (RF06)
  Future<List<Pokemon>> loadFavorites(String username) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = "$_keyFavoritesPrefix${username.trim().toLowerCase()}";
      final jsonStr = prefs.getString(key);
      
      if (jsonStr == null || jsonStr.trim().isEmpty) return [];

      final decoded = jsonDecode(jsonStr);
      if (decoded is List) {
        return decoded
            .whereType<Map>()
            .map((item) => Pokemon.fromStorageJson(Map<String, dynamic>.from(item)))
            .toList();
      }
      return [];
    } catch (e) {
      return []; // Proteção contra dados corrompidos
    }
  }

  // Grava a lista de favoritos do usuário logado de forma persistente no SharedPreferences (RF06)
  Future<void> saveFavorites(String username, List<Pokemon> list) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = "$_keyFavoritesPrefix${username.trim().toLowerCase()}";
      final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
      await prefs.setString(key, jsonStr);
    } catch (_) {}
  }

  // Carrega a lista de itens consumidos ("Capturados") do usuário logado no SharedPreferences (RF06)
  Future<List<Pokemon>> loadConsumed(String username) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = "$_keyConsumedPrefix${username.trim().toLowerCase()}";
      final jsonStr = prefs.getString(key);
      
      if (jsonStr == null || jsonStr.trim().isEmpty) return [];

      final decoded = jsonDecode(jsonStr);
      if (decoded is List) {
        return decoded
            .whereType<Map>()
            .map((item) => Pokemon.fromStorageJson(Map<String, dynamic>.from(item)))
            .toList();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // Grava a lista de itens consumidos ("Capturados") do usuário logado de forma persistente no SharedPreferences (RF06)
  Future<void> saveConsumed(String username, List<Pokemon> list) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = "$_keyConsumedPrefix${username.trim().toLowerCase()}";
      final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
      await prefs.setString(key, jsonStr);
    } catch (_) {}
  }
}
