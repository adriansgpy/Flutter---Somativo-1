// Implementa RF06 — Serviço de Persistência Local para Favoritos e Itens "Consumidos" (Capturados)
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/pokemon.dart';

class StorageService {
  static const String _keyFavoritesPrefix = "user_fav_list_";
  static const String _keyConsumedPrefix = "user_con_list_";

  // Carrega a lista de favoritos vinculada ao usuário logado
  Future<List<Pokemon>> loadFavorites(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "$_keyFavoritesPrefix${username.trim().toLowerCase()}";
    final jsonStr = prefs.getString(key);
    
    if (jsonStr == null) return [];

    try {
      final List decodedList = jsonDecode(jsonStr);
      return decodedList.map((item) => Pokemon.fromStorageJson(item)).toList();
    } catch (e) {
      return []; // Retorna lista vazia em caso de falha de parsing
    }
  }

  // Grava a lista de favoritos do usuário logado de forma persistente
  Future<void> saveFavorites(String username, List<Pokemon> list) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "$_keyFavoritesPrefix${username.trim().toLowerCase()}";
    final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
    await prefs.setString(key, jsonStr);
  }

  // Carrega a lista de itens consumidos ("Capturados") do usuário logado
  Future<List<Pokemon>> loadConsumed(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "$_keyConsumedPrefix${username.trim().toLowerCase()}";
    final jsonStr = prefs.getString(key);
    
    if (jsonStr == null) return [];

    try {
      final List decodedList = jsonDecode(jsonStr);
      return decodedList.map((item) => Pokemon.fromStorageJson(item)).toList();
    } catch (e) {
      return [];
    }
  }

  // Grava a lista de itens consumidos ("Capturados") do usuário logado de forma persistente
  Future<void> saveConsumed(String username, List<Pokemon> list) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "$_keyConsumedPrefix${username.trim().toLowerCase()}";
    final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
    await prefs.setString(key, jsonStr);
  }
}
