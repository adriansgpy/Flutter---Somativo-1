// Implementa RF01, RF03, RF06 e RF10 — Modelo de Dados do Pokémon e Acessibilidade
import 'dart:convert';

class Pokemon {
  final int id;
  final String name;
  final String imageUrl;
  final List<String> types;
  final int height;
  final int weight;
  final List<String> abilities;
  final String description;

  Pokemon({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.types,
    required this.height,
    required this.weight,
    required this.abilities,
    this.description = "",
  });

  // Converte o JSON original vindo da PokéAPI (RF01 e RF03)
  factory Pokemon.fromJson(Map<String, dynamic> json) {
    final name = json['name'] as String;
    final id = json['id'] as int;

    // Converte os tipos (geralmente uma lista de objetos na PokéAPI)
    final typesList = (json['types'] as List?)?.map((t) {
      return t['type']['name'] as String;
    }).toList() ?? [];

    // Converte as habilidades
    final abilitiesList = (json['abilities'] as List?)?.map((a) {
      return a['ability']['name'] as String;
    }).toList() ?? [];

    // URL da imagem oficial do Pokémon em alta resolução, conforme especificado na OPÇÃO B
    final imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/$id.png";

    // Decisão técnica de design: Gerar uma descrição customizada bem estruturada
    // com base nos tipos e habilidades do Pokémon para enriquecer os detalhes
    final formattedTypes = typesList.isNotEmpty ? typesList.join(' e ') : 'desconhecido';
    final description = "Este é o Pokémon de número $id, conhecido cientificamente como ${name.toUpperCase()}. "
        "É um pokémon do tipo $formattedTypes e possui as habilidades: ${abilitiesList.join(', ')}.";

    return Pokemon(
      id: id,
      name: name,
      imageUrl: imageUrl,
      types: List<String>.from(typesList),
      height: json['height'] as int? ?? 0,
      weight: json['weight'] as int? ?? 0,
      abilities: List<String>.from(abilitiesList),
      description: description,
    );
  }

  // Serializa para salvar localmente como String JSON no SharedPreferences (RF06)
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'imageUrl': imageUrl,
      'types': types,
      'height': height,
      'weight': weight,
      'abilities': abilities,
      'description': description,
    };
  }

  // Deserializa de dados que foram salvos localmente
  factory Pokemon.fromStorageJson(Map<String, dynamic> json) {
    return Pokemon(
      id: json['id'] as int,
      name: json['name'] as String,
      imageUrl: json['imageUrl'] as String,
      types: List<String>.from(json['types'] as List),
      height: json['height'] as int? ?? 0,
      weight: json['weight'] as int? ?? 0,
      abilities: List<String>.from(json['abilities'] as List),
      description: json['description'] as String? ?? "",
    );
  }

  // Texto amigável de acessibilidade para leitores de tela (RF10)
  String get semanticDescription {
    final typeText = types.isNotEmpty ? "Tipos: ${types.join(', ')}." : "";
    return "Imagem do Pokémon $name, número $id. $typeText";
  }
}
