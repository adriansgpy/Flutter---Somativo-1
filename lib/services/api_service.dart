// Implementa RF01, RF03, RF08 e RF09 — Consumo do Web Service da PokéAPI
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/pokemon.dart';

class ApiService {
  static const String baseUrl = "https://pokeapi.co/api/v2";

  // Busca uma página de Pokémon e resolve cada detalhe para obter imagens e estatísticas (RF01)
  // Decisão técnica: O endpoint de listagem da PokéAPI só retorna nome e URL de detalhe.
  // Para exibir o Grid com a foto oficial correspondente de forma robusta e livre de falhas,
  // fazemos chamadas adicionais para obter os dados completos de cada Pokémon listado.
  Future<List<Pokemon>> fetchPokemonPage(int page, {int limit = 20}) async {
    final offset = page * limit;
    final url = Uri.parse("$baseUrl/pokemon?limit=$limit&offset=$offset");

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final results = data['results'] as List;

        List<Pokemon> pokemonList = [];
        for (var item in results) {
          final detailPokemon = await fetchPokemonDetails(item['name']);
          if (detailPokemon != null) {
            pokemonList.add(detailPokemon);
          }
        }
        return pokemonList;
      } else {
        throw Exception("Falha ao obter dados da PokéAPI. Código HTTP: ${response.statusCode}");
      }
    } catch (e) {
      throw Exception("Não foi possível conectar-se à PokéAPI. Verifique sua conexão de rede.");
    }
  }

  // Busca detalhes completos de um Pokémon pelo ID ou pelo Nome (RF03 e RF08)
  Future<Pokemon?> fetchPokemonDetails(String nameOrId) async {
    // Trata e limpa a busca, garantindo que o nome esteja em minúsculas conforme requisito da OPÇÃO B
    final cleanQuery = nameOrId.trim().toLowerCase();
    if (cleanQuery.isEmpty) return null;

    final url = Uri.parse("$baseUrl/pokemon/$cleanQuery");

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return Pokemon.fromJson(data);
      } else if (response.statusCode == 404) {
        // Trata explicitamente o código 404 como "não encontrado" conforme as regras da OPÇÃO B
        return null;
      } else {
        throw Exception("Erro do servidor ao consultar o Pokémon. Código: ${response.statusCode}");
      }
    } catch (e) {
      // Repassa erro de rede com mensagem amigável (RF09)
      throw Exception("Ocorreu uma falha na comunicação de rede com o servidor: $e");
    }
  }
}
