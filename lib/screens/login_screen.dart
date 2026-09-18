// Implementa RF07, RF09 e RF10 — Tela de Login e Cadastro com Persistência de Sessão e Acessibilidade
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
}
