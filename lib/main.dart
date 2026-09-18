// Implementa RF01, RF04, RF07 e RF10 — Ponto de Entrada do App e Gerenciamento de Provedores Globais
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
}
