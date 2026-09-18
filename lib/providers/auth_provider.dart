// Implementa RF07 — Provedor de Estado de Sessão e Autenticação (AuthProvider)
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
}
