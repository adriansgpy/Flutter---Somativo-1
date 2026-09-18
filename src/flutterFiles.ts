// Banco de dados dos arquivos do projeto Flutter para exibição e exportação na UI do Professor/Estudante
export interface FlutterFile {
  path: string;
  name: string;
  type: 'code' | 'yaml' | 'markdown';
  rf: string;
  content: string;
}

export const FLUTTER_PROJECT_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    type: 'yaml',
    rf: 'Geral',
    content: `name: pokedex_interativa
description: "Trabalho de Desenvolvimento Mobile Híbrido - Pokédex Interativa com Persistência Local e Provedores"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  provider: ^6.1.1
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`
  },
  {
    path: 'README.md',
    name: 'README.md',
    type: 'markdown',
    rf: 'Geral',
    content: `# Pokédex Interativa - Trabalho de Desenvolvimento Mobile Híbrido

Este é o projeto completo de uma **Pokédex Interativa** desenvolvido em **Flutter**, focado em boas práticas arquiteturais, persistência de dados local, controle reativo de estado global (através do pacote \`provider\`) e conformidade total com as normas de acessibilidade mobile.

O aplicativo consome dados reais da **PokéAPI** e persiste as preferências do usuário localmente, suportando perfis de usuário isolados.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Flutter SDK](https://docs.flutter.dev/get-started/install) instalado e configurado em sua máquina.

1. **Clonar ou extrair o projeto** para uma pasta local.
2. **Navegar até a pasta raiz** no terminal:
   \`\`\`bash
   cd pokedex_interativa
   \`\`\`
3. **Obter as dependências** do projeto listadas no \`pubspec.yaml\`:
   \`\`\`bash
   flutter pub get
   \`\`\`
4. **Executar o aplicativo** em um emulador ou dispositivo físico conectado:
   \`\`\`bash
   flutter run
   \`\`\`

---

## 📋 Mapeamento de Requisitos Funcionais (RF)

A tabela abaixo detalha quais arquivos do código-fonte implementam e respondem por cada um dos **Requisitos Funcionais (RF01 a RF10)** solicitados na especificação do trabalho:

| Requisito Funcional | Descrição do Requisito | Arquivo(s) de Implementação Principal | Detalhes Técnicos de Implementação |
| :--- | :--- | :--- | :--- |
| **RF01** | **Tela Principal (Catálogo)** | \`lib/screens/catalog_screen.dart\`<br>\`lib/widgets/item_grid_card.dart\` | Exibe a lista inicial de Pokémon consumida via PokéAPI. Usa \`GridView.builder\` e um botão de paginação "Carregar Mais" que adiciona novos itens à lista atual via concatenação rápida. Trata imagens inválidas com placeholders. |
| **RF02** | **Navegação para Detalhes** | \`lib/widgets/item_grid_card.dart\` | Implementa a transição de telas ao tocar em um item do catálogo. Usa o roteamento nativo do Flutter via \`Navigator.push\` direcionando para a \`DetailScreen\`. |
| **RF03** | **Tela de Detalhes** | \`lib/screens/detail_screen.dart\`<br>\`lib/models/pokemon.dart\` | Exibe uma imagem em tamanho maior com animação Hero, atributos físicos (peso e altura), tipos, habilidades e uma descrição textual contextualizada. |
| **RF04** | **Favoritos com Provider** | \`lib/providers/favorites_provider.dart\`<br>\`lib/screens/detail_screen.dart\` | Gerencia o estado de favoritar/desfavoritar de forma global usando a classe \`FavoritesProvider\` baseada em \`ChangeNotifier\`, sem depender de estados locais. |
| **RF05** | **Tela de Favoritos** | \`lib/screens/favorites_screen.dart\` | Exibe todos os Pokémon favoritados pelo usuário ativo. Usa o widget \`Consumer\` para redesenhar a tela de forma reativa e instantânea quando um item é desfavoritado. |
| **RF06** | **Persistência de Dados** | \`lib/services/storage_service.dart\`<br>\`lib/providers/favorites_provider.dart\`<br>\`lib/providers/consumed_provider.dart\` | Salva e carrega os favoritos e pokémons capturados em formato de String JSON serializada no dispositivo usando o pacote \`shared_preferences\`. Os dados persistem entre reinicializações. |
| **RF07** | **Login e "Consumidos"** | \`lib/screens/login_screen.dart\`<br>\`lib/providers/auth_provider.dart\`<br>\`lib/screens/consumed_screen.dart\` | Exige login antes de acessar o catálogo. Controla sessões de forma reativa com o \`AuthProvider\`. Na tela de detalhes, possui um botão para marcar o Pokémon como **"Capturado"** (Rótulo customizado do RF07 da OPÇÃO B) e exibe-os na respectiva listagem. |
| **RF08** | **Busca** | \`lib/screens/catalog_screen.dart\`<br>\`lib/screens/search_screen.dart\` | Campo de texto que recebe termos e realiza a busca exata (em letras minúsculas) na PokéAPI. Ao encontrar o resultado, o fluxo de navegação redireciona **diretamente** para a tela de detalhes. |
| **RF09** | **Feedback de UI** | \`lib/widgets/loading_indicator.dart\`<br>\`lib/widgets/error_view.dart\` | Exibe \`CircularProgressIndicator\` durante chamadas assíncronas de rede e login. Em caso de erro, renderiza uma interface amigável com botão de repetição de chamada, evitando falhas de tela preta/branca. |
| **RF10** | **Acessibilidade** | \`lib/widgets/loading_indicator.dart\`<br>\`lib/widgets/error_view.dart\`<br>\`lib/widgets/item_grid_card.dart\`<br>\`lib/screens/detail_screen.dart\` | Utiliza tags \`Semantics\` com labels descritivos para leitores de tela (TalkBack/VoiceOver). Garante botões com área tátil mínima de \`48x48\` pixels, esquemas de cores de alto contraste e layout fluido adaptável a fontes ampliadas. |

---

## 🛠️ Tecnologias e Pacotes Utilizados

- **Linguagem:** Dart (versão estável compatível com Flutter 3.x)
- **Framework:** Flutter (Material Design 3 integrado)
- **Gerenciamento de Estado:** \`provider\` (^6.1.1)
- **Persistência de Dados:** \`shared_preferences\` (^2.2.2)
- **Consumo de APIs:** \`http\` (^1.2.0)`
  },
  {
    path: 'lib/models/pokemon.dart',
    name: 'pokemon.dart',
    type: 'code',
    rf: 'RF01, RF03, RF06, RF10',
    content: `// Implementa RF01, RF03, RF06 e RF10 — Modelo de Dados do Pokémon e Acessibilidade
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
    final imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/\\$id.png";

    // Decisão técnica de design: Gerar uma descrição customizada bem estruturada
    // com base nos tipos e habilidades do Pokémon para enriquecer os detalhes
    final formattedTypes = typesList.isNotEmpty ? typesList.join(' e ') : 'desconhecido';
    final description = "Este é o Pokémon de número \\$id, conhecido cientificamente como \${name.toUpperCase()}. "
        "É um pokémon do tipo \\$formattedTypes e possui as habilidades: \${abilitiesList.join(', ')}.";

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
    final typeText = types.isNotEmpty ? "Tipos: \${types.join(', ')}." : "";
    return "Imagem do Pokémon \\$name, número \\$id. \\$typeText";
  }
}`
  },
  {
    path: 'lib/services/api_service.dart',
    name: 'api_service.dart',
    type: 'code',
    rf: 'RF01, RF03, RF08, RF09',
    content: `// Implementa RF01, RF03, RF08 e RF09 — Consumo do Web Service da PokéAPI
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
    final url = Uri.parse("\\$baseUrl/pokemon?limit=\\$limit&offset=\\$offset");

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
        throw Exception("Falha ao obter dados da PokéAPI. Código HTTP: \${response.statusCode}");
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

    final url = Uri.parse("\\$baseUrl/pokemon/\\$cleanQuery");

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return Pokemon.fromJson(data);
      } else if (response.statusCode == 404) {
        // Trata explicitamente o código 404 como "não encontrado" conforme as regras da OPÇÃO B
        return null;
      } else {
        throw Exception("Erro do servidor ao consultar o Pokémon. Código: \${response.statusCode}");
      }
    } catch (e) {
      // Repassa erro de rede com mensagem amigável (RF09)
      throw Exception("Ocorreu uma falha na comunicação de rede com o servidor: \\$e");
    }
  }
}`
  },
  {
    path: 'lib/services/auth_service.dart',
    name: 'auth_service.dart',
    type: 'code',
    rf: 'RF07',
    content: `// Implementa RF07 — Serviço de Autenticação Local e Gerenciamento de Sessão com SharedPreferences
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String _keyUserPrefix = "registered_user_";
  static const String _keyCurrentUser = "current_user_session";

  // Cadastra um novo usuário e senha no armazenamento local persistente
  Future<bool> register(String username, String password) async {
    final cleanUser = username.trim().toLowerCase();
    final cleanPassword = password.trim();

    if (cleanUser.isEmpty || cleanPassword.isEmpty) return false;

    final prefs = await SharedPreferences.getInstance();
    
    // Verifica se já existe um usuário cadastrado com esse nome
    final userKey = "\\$_keyUserPrefix\\$cleanUser";
    if (prefs.containsKey(userKey)) {
      return false; // Usuário já cadastrado
    }

    // Salva o cadastro localmente
    await prefs.setString(userKey, cleanPassword);
    return true;
  }

  // Compara credenciais fornecidas com as armazenadas no SharedPreferences
  Future<bool> login(String username, String password) async {
    final cleanUser = username.trim().toLowerCase();
    final cleanPassword = password.trim();

    if (cleanUser.isEmpty || cleanPassword.isEmpty) return false;

    final prefs = await SharedPreferences.getInstance();
    final userKey = "\\$_keyUserPrefix\\$cleanUser";
    
    final savedPassword = prefs.getString(userKey);
    if (savedPassword != null && savedPassword == cleanPassword) {
      // Login bem-sucedido! Salva o usuário logado para persistir a sessão entre inicializações (RF07)
      await prefs.setString(_keyCurrentUser, username.trim());
      return true;
    }
    return false;
  }

  // Recupera o nome de usuário que está ativo na sessão
  Future<String?> getLoggedInUser() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyCurrentUser);
  }

  // Remove a sessão do usuário atual (Logout)
  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_keyCurrentUser);
  }
}`
  },
  {
    path: 'lib/services/storage_service.dart',
    name: 'storage_service.dart',
    type: 'code',
    rf: 'RF06',
    content: `// Implementa RF06 — Serviço de Persistência Local para Favoritos e Itens "Consumidos" (Capturados)
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/pokemon.dart';

class StorageService {
  static const String _keyFavoritesPrefix = "user_fav_list_";
  static const String _keyConsumedPrefix = "user_con_list_";

  // Carrega a lista de favoritos vinculada ao usuário logado
  Future<List<Pokemon>> loadFavorites(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "\\$_keyFavoritesPrefix\${username.trim().toLowerCase()}";
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
    final key = "\\$_keyFavoritesPrefix\${username.trim().toLowerCase()}";
    final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
    await prefs.setString(key, jsonStr);
  }

  // Carrega a lista de itens consumidos ("Capturados") do usuário logado
  Future<List<Pokemon>> loadConsumed(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final key = "\\$_keyConsumedPrefix\${username.trim().toLowerCase()}";
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
    final key = "\\$_keyConsumedPrefix\${username.trim().toLowerCase()}";
    final jsonStr = jsonEncode(list.map((p) => p.toJson()).toList());
    await prefs.setString(key, jsonStr);
  }
}`
  },
  {
    path: 'lib/providers/auth_provider.dart',
    name: 'auth_provider.dart',
    type: 'code',
    rf: 'RF07',
    content: `// Implementa RF07 — Provedor de Estado de Sessão e Autenticação (AuthProvider)
import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();
  String? _currentUser;
  bool _isLoading = true;

  String? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _currentUser != null;

  AuthProvider() {
    _restoreSession();
  }

  // Tenta restaurar a sessão do usuário caso ele já tenha feito login anteriormente
  Future<void> _restoreSession() async {
    _isLoading = true;
    notifyListeners();
    _currentUser = await _authService.getLoggedInUser();
    _isLoading = false;
    notifyListeners();
  }

  // Realiza login local (RF07)
  Future<bool> login(String username, String password) async {
    _isLoading = true;
    notifyListeners();
    
    final success = await _authService.login(username, password);
    if (success) {
      _currentUser = username.trim();
    }
    
    _isLoading = false;
    notifyListeners();
    return success;
  }

  // Realiza o cadastro de um novo usuário e efetua login automático em caso de sucesso
  Future<bool> register(String username, String password) async {
    _isLoading = true;
    notifyListeners();
    
    final success = await _authService.register(username, password);
    if (success) {
      // Faz login automático imediatamente após o cadastro
      final loginSuccess = await _authService.login(username, password);
      if (loginSuccess) {
        _currentUser = username.trim();
      }
    }
    
    _isLoading = false;
    notifyListeners();
    return success;
  }

  // Executa o logout da sessão do usuário
  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();
    
    await _authService.logout();
    _currentUser = null;
    
    _isLoading = false;
    notifyListeners();
  }
}`
  },
  {
    path: 'lib/providers/favorites_provider.dart',
    name: 'favorites_provider.dart',
    type: 'code',
    rf: 'RF04, RF05, RF06',
    content: `// Implementa RF04, RF05 e RF06 — Provedor de Favoritos (ChangeNotifier)
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
}`
  },
  {
    path: 'lib/providers/consumed_provider.dart',
    name: 'consumed_provider.dart',
    type: 'code',
    rf: 'RF06, RF07',
    content: `// Implementa RF06 e RF07 — Provedor de Itens Consumidos / "Capturados" (ChangeNotifier)
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
}`
  },
  {
    path: 'lib/widgets/loading_indicator.dart',
    name: 'loading_indicator.dart',
    type: 'code',
    rf: 'RF09, RF10',
    content: `// Implementa RF09 e RF10 — Indicador de Progresso com Tratamento de Acessibilidade (Semantics)
import 'package:flutter/material.dart';

class LoadingIndicator extends StatelessWidget {
  final String message;

  const LoadingIndicator({super.key, this.message = "Buscando dados na PokéAPI..."});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Semantics(
        label: "Indicador de processamento ativo. Mensagem: \\$message",
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.redAccent),
            ),
            const SizedBox(height: 16),
            Text(
              message,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
                color: Colors.black87,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/widgets/error_view.dart',
    name: 'error_view.dart',
    type: 'code',
    rf: 'RF09, RF10',
    content: `// Implementa RF09 e RF10 — Mensagem de Erro Amigável e Acessível com Botão de Tentar Novamente
import 'package:flutter/material.dart';

class ErrorView extends StatelessWidget {
  final String errorMessage;
  final VoidCallback onRetry;

  const ErrorView({
    super.key,
    required this.errorMessage,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Semantics(
          label: "Tela de aviso de erro: \\$errorMessage. Botão para tentar novamente disponível abaixo.",
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Icon(
                Icons.cloud_off_rounded,
                color: Colors.redAccent,
                size: 72,
              ),
              const SizedBox(height: 16),
              const Text(
                "Infelizmente houve um problema!",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                errorMessage,
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.black54,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              Semantics(
                button: true,
                label: "Toque duas vezes para carregar novamente as informações",
                child: SizedBox(
                  width: 200,
                  height: 48, // Atende RF10 (Área de toque mínima de 48 logical pixels)
                  child: ElevatedButton.icon(
                    onPressed: onRetry,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.redAccent,
                      foregroundColor: Colors.white,
                      elevation: 2,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                    icon: const Icon(Icons.refresh_rounded),
                    label: const Text(
                      "Tentar Novamente",
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
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
}`
  },
  {
    path: 'lib/widgets/item_grid_card.dart',
    name: 'item_grid_card.dart',
    type: 'code',
    rf: 'RF01, RF02, RF10',
    content: `// Implementa RF01, RF02 e RF10 — Card de Item em Grid com Detalhes Visuais e Acessibilidade
import 'package:flutter/material.dart';
import '../models/pokemon.dart';
import '../screens/detail_screen.dart';

class ItemGridCard extends StatelessWidget {
  final Pokemon pokemon;

  const ItemGridCard({super.key, required this.pokemon});

  // Decisão técnica: Mapeamento de cores baseado nos tipos principais do Pokémon
  // para dar uma identidade visual linda ao projeto de faculdade!
  Color _getTypeColor(String type) {
    switch (type.toLowerCase()) {
      case 'fire':
        return Colors.red.shade400;
      case 'water':
        return Colors.blue.shade400;
      case 'grass':
        return Colors.green.shade400;
      case 'electric':
        return Colors.amber.shade500;
      case 'poison':
        return Colors.purple.shade400;
      case 'bug':
        return Colors.lightGreen.shade500;
      case 'normal':
        return Colors.grey.shade400;
      case 'ground':
        return Colors.brown.shade400;
      case 'fairy':
        return Colors.pink.shade300;
      default:
        return Colors.teal.shade400;
    }
  }

  @override
  Widget build(BuildContext context) {
    final primaryType = pokemon.types.isNotEmpty ? pokemon.types.first : 'normal';
    final cardColor = _getTypeColor(primaryType);

    return Semantics(
      button: true,
      label: "Pokémon \${pokemon.name}, número \${pokemon.id}. Toque para ver detalhes.",
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        child: InkWell(
          onTap: () {
            // Navega para a Tela de Detalhes (RF02)
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailScreen(pokemon: pokemon),
              ),
            );
          },
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  cardColor.withOpacity(0.15),
                  cardColor.withOpacity(0.05),
                ],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Identificador / Número do Pokémon
                Padding(
                  padding: const EdgeInsets.only(top: 8.0, right: 12.0),
                  child: Align(
                    alignment: Alignment.topRight,
                    child: Text(
                      "#\${pokemon.id.toString().padLeft(3, '0')}",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ),
                ),
                
                // Imagem do Pokémon (RF01 - com tratamento de placeholder)
                Expanded(
                  child: Hero(
                    tag: "poke_image_\${pokemon.id}",
                    child: Image.network(
                      pokemon.imageUrl,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        // Se falhar o carregamento ou não houver imagem, exibe placeholder sem quebrar layout
                        return Center(
                          child: Icon(
                            Icons.help_outline,
                            size: 48,
                            color: Colors.grey.shade400,
                          ),
                        );
                      },
                      loadingBuilder: (context, child, loadingProgress) {
                        if (loadingProgress == null) return child;
                        return const Center(
                          child: SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.redAccent),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),

                // Nome do Pokémon
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Text(
                    pokemon.name.toUpperCase(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),

                const SizedBox(height: 4),

                // Badges de Tipos do Pokémon
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0, left: 8, right: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: pokemon.types.map((type) {
                      return Flexible(
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 2.0),
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                          decoration: BoxDecoration(
                            color: _getTypeColor(type),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: FittedBox(
                            child: Text(
                              type.toUpperCase(),
                              style: const TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/login_screen.dart',
    name: 'login_screen.dart',
    type: 'code',
    rf: 'RF07, RF09, RF10',
    content: `// Implementa RF07, RF09 e RF10 — Tela de Login e Cadastro com Persistência de Sessão e Acessibilidade
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/favorites_provider.dart';
import '../providers/consumed_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isRegistering = false; // Alterna entre Login e Cadastro
  String? _errorMessage;

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // Executa o envio dos dados (RF07)
  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _errorMessage = null;
    });

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final username = _usernameController.text.trim();
    final password = _passwordController.text;

    bool success;
    if (_isRegistering) {
      success = await authProvider.register(username, password);
    } else {
      success = await authProvider.login(username, password);
    }

    if (success) {
      if (mounted) {
        // Inicializa os demais providers baseados no usuário logado
        final currentUsername = authProvider.currentUser!;
        await Provider.of<FavoritesProvider>(context, listen: false).initialize(currentUsername);
        await Provider.of<ConsumedProvider>(context, listen: false).initialize(currentUsername);
      }
    } else {
      if (mounted) {
        setState(() {
          _errorMessage = _isRegistering
              ? "Este nome de usuário já existe ou é inválido."
              : "Nome de usuário ou senha incorretos.";
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    // Contraste de cores: Fundo com tom pastel elegante e botões de destaque vermelhos (Tema Pokédex)
    return Scaffold(
      backgroundColor: Colors.red.shade50,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Card(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Logotipo decorativo com Semantics (RF10)
                      Semantics(
                        label: "Logotipo decorativo em forma de Pokébola",
                        child: Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.redAccent,
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.black, width: 4),
                          ),
                          child: Center(
                            child: Container(
                              width: 24,
                              height: 24,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.black, width: 4),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        _isRegistering ? "Nova Conta" : "Pokédex Login",
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _isRegistering 
                            ? "Crie sua conta local para salvar seus pokémons"
                            : "Faça o login para acessar o catálogo de Pokémon",
                        style: const TextStyle(fontSize: 14, color: Colors.black54),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 24),

                      if (_errorMessage != null)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 16.0),
                          child: Text(
                            _errorMessage!,
                            style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                            textAlign: TextAlign.center,
                          ),
                        ),

                      // Campo Usuário
                      Semantics(
                        label: "Campo para digitar o nome de usuário",
                        child: TextFormField(
                          controller: _usernameController,
                          decoration: const InputDecoration(
                            labelText: "Nome de Usuário",
                            prefixIcon: Icon(Icons.person_outline),
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) {
                            if (value == null || value.trim().isEmpty) {
                              return "Informe o nome de usuário";
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Campo Senha
                      Semantics(
                        label: "Campo para digitar a senha",
                        child: TextFormField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: const InputDecoration(
                            labelText: "Senha",
                            prefixIcon: Icon(Icons.lock_outline),
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Informe a senha";
                            }
                            if (value.length < 4) {
                              return "A senha precisa ter pelo menos 4 caracteres";
                            }
                            return null;
                          },
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Botão de Envio (RF07 e RF09)
                      Semantics(
                        button: true,
                        label: _isRegistering 
                            ? "Toque duas vezes para cadastrar"
                            : "Toque duas vezes para entrar no aplicativo",
                        child: SizedBox(
                          width: double.infinity,
                          height: 48, // Acessibilidade RF10
                          child: ElevatedButton(
                            onPressed: authProvider.isLoading ? null : _handleSubmit,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.redAccent,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: authProvider.isLoading
                                ? const SizedBox(
                                    width: 24,
                                    height: 24,
                                    child: CircularProgressIndicator(
                                      color: Colors.white,
                                      strokeWidth: 2,
                                    ),
                                  )
                                : Text(
                                    _isRegistering ? "CADASTRAR" : "ENTRAR",
                                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                                  ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Botão para alternar modo
                      Semantics(
                        button: true,
                        label: _isRegistering
                            ? "Já tem uma conta? Clique para ir à tela de entrar"
                            : "Não tem uma conta? Clique para criar uma conta",
                        child: TextButton(
                          onPressed: () {
                            setState(() {
                              _isRegistering = !_isRegistering;
                              _errorMessage = null;
                            });
                          },
                          style: TextButton.styleFrom(
                            minimumSize: const Size(88, 48), // Acessibilidade RF10
                          ),
                          child: Text(
                            _isRegistering
                                ? "Já possui conta? Faça o Login"
                                : "Não possui conta? Cadastre-se gratuitamente",
                            style: TextStyle(
                              color: Colors.red.shade700,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/catalog_screen.dart',
    name: 'catalog_screen.dart',
    type: 'code',
    rf: 'RF01, RF02, RF07, RF08, RF09, RF10',
    content: `// Implementa RF01, RF02, RF07, RF08, RF09 e RF10 — Tela de Catálogo Principal (Pokédex)
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../models/pokemon.dart';
import '../providers/auth_provider.dart';
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
            content: Text("Falha ao carregar mais pokémons: \${e.toString()}"),
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
              backgroundColor: Colors.orange,
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
            content: Text("Ocorreu um erro na busca: \${e.toString()}"),
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
}`
  },
  {
    path: 'lib/screens/detail_screen.dart',
    name: 'detail_screen.dart',
    type: 'code',
    rf: 'RF03, RF04, RF06, RF07, RF10',
    content: `// Implementa RF03, RF04, RF06, RF07 e RF10 — Tela de Detalhes Completa do Pokémon
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/pokemon.dart';
import '../providers/favorites_provider.dart';
import '../providers/consumed_provider.dart';

class DetailScreen extends StatelessWidget {
  final Pokemon pokemon;

  const DetailScreen({super.key, required this.pokemon});

  // Mapeador de cores estético de acordo com o tipo principal do Pokémon
  Color _getTypeColor(String type) {
    switch (type.toLowerCase()) {
      case 'fire':
        return Colors.red.shade400;
      case 'water':
        return Colors.blue.shade400;
      case 'grass':
        return Colors.green.shade400;
      case 'electric':
        return Colors.amber.shade500;
      case 'poison':
        return Colors.purple.shade400;
      case 'bug':
        return Colors.lightGreen.shade500;
      case 'normal':
        return Colors.grey.shade400;
      case 'ground':
        return Colors.brown.shade400;
      case 'fairy':
        return Colors.pink.shade300;
      default:
        return Colors.teal.shade400;
    }
  }

  @override
  Widget build(BuildContext context) {
    final primaryType = pokemon.types.isNotEmpty ? pokemon.types.first : 'normal';
    final themeColor = _getTypeColor(primaryType);

    return Scaffold(
      appBar: AppBar(
        title: Text(pokemon.name.toUpperCase()),
        backgroundColor: themeColor,
        foregroundColor: Colors.white,
        actions: [
          // Ícone de Estrela para Favoritar/Desfavoritar (RF04 e RF10)
          Consumer<FavoritesProvider>(
            builder: (context, favoritesProvider, child) {
              final isFav = favoritesProvider.isFavorite(pokemon.id);
              return Semantics(
                button: true,
                label: isFav 
                    ? "Remover dos favoritos. Pokémon atualmente favoritado."
                    : "Adicionar aos favoritos. Pokémon atualmente não favoritado.",
                child: IconButton(
                  icon: Icon(
                    isFav ? Icons.star_rounded : Icons.star_outline_rounded,
                    color: Colors.white,
                    size: 32,
                  ),
                  onPressed: () {
                    favoritesProvider.toggleFavorite(pokemon);
                  },
                ),
              );
            },
          ),
        ],
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Banner de cabeçalho colorido com a imagem principal em destaque (RF03)
              Container(
                height: 250,
                decoration: BoxDecoration(
                  color: themeColor.withOpacity(0.15),
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(32),
                    bottomRight: Radius.circular(32),
                  ),
                ),
                child: Center(
                  child: Hero(
                    tag: "poke_image_\${pokemon.id}",
                    child: Semantics(
                      label: pokemon.semanticDescription,
                      child: Image.network(
                        pokemon.imageUrl,
                        width: 220,
                        height: 220,
                        fit: BoxFit.contain,
                        errorBuilder: (context, error, stackTrace) {
                          return const Icon(Icons.help_outline, size: 80, color: Colors.grey);
                        },
                      ),
                    ),
                  ),
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Título e ID
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Text(
                            pokemon.name.toUpperCase(),
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                          ),
                        ),
                        Text(
                          "#\${pokemon.id.toString().padLeft(3, '0')}",
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 12),

                    // Badges de Tipos do Pokémon
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: pokemon.types.map((type) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: _getTypeColor(type),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            type.toUpperCase(),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 24),

                    // Botão de Captura ("Consumido" com rótulo "Capturado" - RF07 e RF10)
                    Consumer<ConsumedProvider>(
                      builder: (context, consumedProvider, child) {
                        final isCap = consumedProvider.isConsumed(pokemon.id);
                        return Semantics(
                          button: true,
                          label: isCap 
                              ? "Marcar como não capturado. Status atual: Capturado."
                              : "Marcar como capturado. Status atual: Não capturado.",
                          child: SizedBox(
                            width: double.infinity,
                            height: 48, // Acessibilidade RF10
                            child: ElevatedButton.icon(
                              onPressed: () {
                                consumedProvider.toggleConsumed(pokemon);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: isCap ? Colors.green.shade600 : Colors.redAccent,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 2,
                              ),
                              icon: Icon(isCap ? Icons.check_circle_outline : Icons.catching_pokemon),
                              label: Text(
                                isCap ? "CAPTURADO!" : "MARCAR COMO CAPTURADO",
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        );
                      },
                    ),

                    const SizedBox(height: 24),

                    // Atributos Básicos (Dimensões - RF03)
                    const Text(
                      "Características Físicas",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: Card(
                            elevation: 0,
                            color: Colors.grey.shade100,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 12.0),
                              child: Column(
                                children: [
                                  const Text("Altura", style: TextStyle(fontSize: 12, color: Colors.black54)),
                                  const SizedBox(height: 4),
                                  Text(
                                    "\${(pokemon.height / 10).toStringAsFixed(1)} m",
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Card(
                            elevation: 0,
                            color: Colors.grey.shade100,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 12.0),
                              child: Column(
                                children: [
                                  const Text("Peso", style: TextStyle(fontSize: 12, color: Colors.black54)),
                                  const SizedBox(height: 4),
                                  Text(
                                    "\${(pokemon.weight / 10).toStringAsFixed(1)} kg",
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Habilidades
                    const Text(
                      "Habilidades",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: pokemon.abilities.map((ability) {
                        return Chip(
                          backgroundColor: Colors.white,
                          side: BorderSide(color: Colors.grey.shade300),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          label: Text(
                            ability.toUpperCase(),
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.black87),
                          ),
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 24),

                    // Descrição Geral
                    const Text(
                      "Descrição",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.grey.shade200),
                      ),
                      child: Text(
                        pokemon.description,
                        style: const TextStyle(
                          fontSize: 15,
                          height: 1.5,
                          color: Colors.black87,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/favorites_screen.dart',
    name: 'favorites_screen.dart',
    type: 'code',
    rf: 'RF05, RF06, RF10',
    content: `// Implementa RF05, RF06 e RF10 — Tela de Favoritos Reativa e Acessível com Consumer
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/favorites_provider.dart';
import 'detail_screen.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Meus Favoritos"),
        backgroundColor: Colors.amber,
        foregroundColor: Colors.white,
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: Consumer<FavoritesProvider>(
          builder: (context, favoritesProvider, child) {
            final favoritesList = favoritesProvider.favorites;

            if (favoritesList.isEmpty) {
              return Padding(
                padding: const EdgeInsets.all(24.0),
                child: Center(
                  child: Semantics(
                    label: "Lista de favoritos vazia. Você ainda não favoritou nenhum Pokémon.",
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.star_outline_rounded,
                          color: Colors.amber.shade300,
                          size: 80,
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          "Estante Vazia!",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          "Os Pokémon que você favoritar tocando na estrela da tela de detalhes aparecerão aqui.",
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.black54,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }

            return Semantics(
              label: "Lista de Pokémon favoritados. Contém \${favoritesList.length} itens.",
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
                itemCount: favoritesList.length,
                itemBuilder: (context, index) {
                  final pokemon = favoritesList[index];

                  return Semantics(
                    button: true,
                    label: "Pokémon \${pokemon.name}. Clique duas vezes para ver detalhes ou use o botão para desfavoritar.",
                    child: Card(
                      margin: const EdgeInsets.symmetric(vertical: 6.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 1,
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        leading: Hero(
                          tag: "poke_image_fav_\${pokemon.id}",
                          child: Image.network(
                            pokemon.imageUrl,
                            width: 50,
                            height: 50,
                            fit: BoxFit.contain,
                            errorBuilder: (context, error, stackTrace) => const Icon(Icons.help_outline),
                          ),
                        ),
                        title: Text(
                          pokemon.name.toUpperCase(),
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        subtitle: Text(
                          "Nº \${pokemon.id.toString().padLeft(3, '0')} • \${pokemon.types.join(', ').toUpperCase()}",
                          style: const TextStyle(fontSize: 13, color: Colors.black54),
                        ),
                        trailing: Semantics(
                          button: true,
                          label: "Remover \${pokemon.name} dos favoritos",
                          child: SizedBox(
                            width: 48, // Atende RF10 (Área mínima de toque de 48px)
                            height: 48,
                            child: IconButton(
                              icon: const Icon(Icons.delete_outline_rounded, color: Colors.redAccent),
                              onPressed: () {
                                // Desfavorita e atualiza a tela automaticamente via Consumer (RF05)
                                favoritesProvider.removeFavorite(pokemon.id);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text("\${pokemon.name.toUpperCase()} removido dos favoritos."),
                                    duration: const Duration(seconds: 2),
                                    action: SnackBarAction(
                                      label: "DESFAZER",
                                      textColor: Colors.amber,
                                      onPressed: () {
                                        favoritesProvider.toggleFavorite(pokemon);
                                      },
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                        onTap: () {
                          // Navega para Detalhes (RF02)
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DetailScreen(pokemon: pokemon),
                            ),
                          );
                        },
                      ),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/consumed_screen.dart',
    name: 'consumed_screen.dart',
    type: 'code',
    rf: 'RF06, RF07, RF10',
    content: `// Implementa RF06, RF07 e RF10 — Tela de Pokémons "Capturados" (Consumidos) Reativa e Acessível
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/consumed_provider.dart';
import 'detail_screen.dart';

class ConsumedScreen extends StatelessWidget {
  const ConsumedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Pokémons Capturados"),
        backgroundColor: Colors.redAccent,
        foregroundColor: Colors.white,
      ),
      body: Container(
        color: Colors.grey.shade50,
        child: Consumer<ConsumedProvider>(
          builder: (context, consumedProvider, child) {
            final consumedList = consumedProvider.consumed;

            if (consumedList.isEmpty) {
              return Padding(
                padding: const EdgeInsets.all(24.0),
                child: Center(
                  child: Semantics(
                    label: "Lista de capturas vazia. Você ainda não capturou nenhum Pokémon.",
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.catching_pokemon,
                          color: Colors.red.shade200,
                          size: 80,
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          "Nenhuma captura ainda!",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          "Abra os detalhes de um Pokémon e toque em 'MARCAR COMO CAPTURADO' para que ele seja catalogado nesta seção.",
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.black54,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }

            return Semantics(
              label: "Lista de Pokémon capturados. Contém \${consumedList.length} itens.",
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 12.0),
                itemCount: consumedList.length,
                itemBuilder: (context, index) {
                  final pokemon = consumedList[index];

                  return Semantics(
                    button: true,
                    label: "Pokémon \${pokemon.name}. Clique duas vezes para ver detalhes.",
                    child: Card(
                      margin: const EdgeInsets.symmetric(vertical: 6.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 1,
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        leading: Image.network(
                          pokemon.imageUrl,
                          width: 50,
                          height: 50,
                          fit: BoxFit.contain,
                          errorBuilder: (context, error, stackTrace) => const Icon(Icons.help_outline),
                        ),
                        title: Text(
                          pokemon.name.toUpperCase(),
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        subtitle: Text(
                          "Nº \${pokemon.id.toString().padLeft(3, '0')} • \${pokemon.types.join(', ').toUpperCase()}",
                          style: const TextStyle(fontSize: 13, color: Colors.black54),
                        ),
                        trailing: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.green.shade50,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.green.shade300),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.check, size: 14, color: Colors.green.shade700),
                              const SizedBox(width: 4),
                              Text(
                                "Capturado",
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green.shade800,
                                ),
                              ),
                            ],
                          ),
                        ),
                        onTap: () {
                          // Navega para Detalhes (RF02)
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DetailScreen(pokemon: pokemon),
                            ),
                          );
                        },
                      ),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/search_screen.dart',
    name: 'search_screen.dart',
    type: 'code',
    rf: 'RF08, RF09, RF10',
    content: `// Implementa RF08, RF09 e RF10 — Tela de Busca Dedicada com Redirecionamento Direto e Acessibilidade
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
            _statusMessage = "Pokémon '\$query' não foi encontrado na base de dados.";
          });
        }
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
        _statusMessage = "Erro ao buscar: \${e.toString().replaceFirst("Exception: ", "")}";
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
}`
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    type: 'code',
    rf: 'RF01, RF04, RF07, RF10',
    content: `// Implementa RF01, RF04, RF07 e RF10 — Ponto de Entrada do App e Gerenciamento de Provedores Globais
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/favorites_provider.dart';
import 'providers/consumed_provider.dart';
import 'screens/login_screen.dart';
import 'screens/catalog_screen.dart';
import 'widgets/loading_indicator.dart';

void main() {
  // Inicialização padrão do Flutter binding
  WidgetsFlutterBinding.ensureInitialized();
  
  runApp(
    // Configuração de MultiProvider para registrar as instâncias globais na árvore de widgets
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => FavoritesProvider()),
        ChangeNotifierProvider(create: (_) => ConsumedProvider()),
      ],
      child: const PokedexApp(),
    ),
  );
}

class PokedexApp extends StatelessWidget {
  const PokedexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokédex Interativa',
      debugShowCheckedModeBanner: false,
      
      // Definição de Tema visual refinado (Alta legibilidade, cores vivas inspiradas na Pokédex)
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: Colors.redAccent,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.redAccent,
          primary: Colors.redAccent,
          secondary: Colors.amber,
          background: Colors.grey.shade50,
        ),
        
        // Customização global dos inputs de texto para acessibilidade visual (contraste)
        inputDecorationTheme: const InputDecorationTheme(
          labelStyle: TextStyle(color: Colors.black87),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.redAccent, width: 2.0),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.black38, width: 1.0),
          ),
        ),
        
        // Estilo de texto legível (RF10)
        textTheme: const TextTheme(
          bodyLarge: TextStyle(fontSize: 16, color: Colors.black87),
          bodyMedium: TextStyle(fontSize: 14, color: Colors.black54),
        ),
      ),
      
      // Controle de navegação condicional baseado no estado de sessão do AuthProvider (RF07)
      home: Consumer<AuthProvider>(
        builder: (context, authProvider, child) {
          // Se o AuthProvider estiver lendo o SharedPreferences na inicialização, exibe tela de carregamento
          if (authProvider.isLoading) {
            return const Scaffold(
              body: LoadingIndicator(message: "Restaurando sessão anterior..."),
            );
          }

          // Se estiver autenticado, vai para a Tela Principal. Caso contrário, exibe Tela de Login (RF07)
          if (authProvider.isAuthenticated) {
            return const CatalogScreen();
          } else {
            return const LoginScreen();
          }
        },
      ),
    );
  }
}`
  }
];
