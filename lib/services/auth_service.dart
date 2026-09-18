// Implementa RF07 — Serviço de Autenticação Local e Gerenciamento de Sessão com SharedPreferences
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
    final userKey = "$_keyUserPrefix$cleanUser";
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
    final userKey = "$_keyUserPrefix$cleanUser";
    
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
}
