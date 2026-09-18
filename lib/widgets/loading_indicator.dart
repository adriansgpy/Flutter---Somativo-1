// Implementa RF09 e RF10 — Indicador de Progresso com Tratamento de Acessibilidade (Semantics)
import 'package:flutter/material.dart';

class LoadingIndicator extends StatelessWidget {
  final String message;

  const LoadingIndicator({super.key, this.message = "Buscando dados na PokéAPI..."});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Semantics(
        label: "Indicador de processamento ativo. Mensagem: $message",
        loading: true,
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
}
