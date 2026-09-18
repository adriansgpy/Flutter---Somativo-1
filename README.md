# Pokédex Interativa - Trabalho de Desenvolvimento Mobile Híbrido

Este é o projeto completo de uma **Pokédex Interativa** desenvolvido em **Flutter**, focado em boas práticas arquiteturais, persistência de dados local, controle reativo de estado global (através do pacote `provider`) e conformidade total com as normas de acessibilidade mobile.

O aplicativo consome dados reais da **PokéAPI** e persiste as preferências do usuário localmente, suportando perfis de usuário isolados.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Flutter SDK](https://docs.flutter.dev/get-started/install) instalado e configurado em sua máquina.

1. **Clonar ou extrair o projeto** para uma pasta local.
2. **Navegar até a pasta raiz** no terminal:
   ```bash
   cd pokedex_interativa
   ```
3. **Obter as dependências** do projeto listadas no `pubspec.yaml`:
   ```bash
   flutter pub get
   ```
4. **Executar o aplicativo** em um emulador ou dispositivo físico conectado:
   ```bash
   flutter run
   ```

---

## 📋 Mapeamento de Requisitos Funcionais (RF)

A tabela abaixo detalha quais arquivos do código-fonte implementam e respondem por cada um dos **Requisitos Funcionais (RF01 a RF10)** solicitados na especificação do trabalho:

| Requisito Funcional | Descrição do Requisito | Arquivo(s) de Implementação Principal | Detalhes Técnicos de Implementação |
| :--- | :--- | :--- | :--- |
| **RF01** | **Tela Principal (Catálogo)** | `lib/screens/catalog_screen.dart`<br>`lib/widgets/item_grid_card.dart` | Exibe a lista inicial de Pokémon consumida via PokéAPI. Usa `GridView.builder` e um botão de paginação "Carregar Mais" que adiciona novos itens à lista atual via concatenação rápida. Trata imagens inválidas com placeholders. |
| **RF02** | **Navegação para Detalhes** | `lib/widgets/item_grid_card.dart` | Implementa a transição de telas ao tocar em um item do catálogo. Usa o roteamento nativo do Flutter via `Navigator.push` direcionando para a `DetailScreen`. |
| **RF03** | **Tela de Detalhes** | `lib/screens/detail_screen.dart`<br>`lib/models/pokemon.dart` | Exibe uma imagem em tamanho maior com animação Hero, atributos físicos (peso e altura), tipos, habilidades e uma descrição textual contextualizada. |
| **RF04** | **Favoritos com Provider** | `lib/providers/favorites_provider.dart`<br>`lib/screens/detail_screen.dart` | Gerencia o estado de favoritar/desfavoritar de forma global usando a classe `FavoritesProvider` baseada em `ChangeNotifier`, sem depender de estados locais. |
| **RF05** | **Tela de Favoritos** | `lib/screens/favorites_screen.dart` | Exibe todos os Pokémon favoritados pelo usuário ativo. Usa o widget `Consumer` para redesenhar a tela de forma reativa e instantânea quando um item é desfavoritado. |
| **RF06** | **Persistência de Dados** | `lib/services/storage_service.dart`<br>`lib/providers/favorites_provider.dart`<br>`lib/providers/consumed_provider.dart` | Salva e carrega os favoritos e pokémons capturados em formato de String JSON serializada no dispositivo usando o pacote `shared_preferences`. Os dados persistem entre reinicializações. |
| **RF07** | **Login e "Consumidos"** | `lib/screens/login_screen.dart`<br>`lib/providers/auth_provider.dart`<br>`lib/screens/consumed_screen.dart` | Exige login antes de acessar o catálogo. Controla sessões de forma reativa com o `AuthProvider`. Na tela de detalhes, possui um botão para marcar o Pokémon como **"Capturado"** (Rótulo customizado do RF07 da OPÇÃO B) e exibe-os na respectiva listagem. |
| **RF08** | **Busca** | `lib/screens/catalog_screen.dart`<br>`lib/screens/search_screen.dart` | Campo de texto que recebe termos e realiza a busca exata (em letras minúsculas) na PokéAPI. Ao encontrar o resultado, o fluxo de navegação redireciona **diretamente** para a tela de detalhes. |
| **RF09** | **Feedback de UI** | `lib/widgets/loading_indicator.dart`<br>`lib/widgets/error_view.dart` | Exibe `CircularProgressIndicator` durante chamadas assíncronas de rede e login. Em caso de erro, renderiza uma interface amigável com botão de repetição de chamada, evitando falhas de tela preta/branca. |
| **RF10** | **Acessibilidade** | `lib/widgets/loading_indicator.dart`<br>`lib/widgets/error_view.dart`<br>`lib/widgets/item_grid_card.dart`<br>`lib/screens/detail_screen.dart` | Utiliza tags `Semantics` com labels descritivos para leitores de tela (TalkBack/VoiceOver). Garante botões com área tátil mínima de `48x48` pixels, esquemas de cores de alto contraste e layout fluido adaptável a fontes ampliadas. |

---

## 🛠️ Tecnologias e Pacotes Utilizados

- **Linguagem:** Dart (versão estável compatível com Flutter 3.x)
- **Framework:** Flutter (Material Design 3 integrado)
- **Gerenciamento de Estado:** `provider` (^6.1.1)
- **Persistência de Dados:** `shared_preferences` (^2.2.2)
- **Consumo de APIs:** `http` (^1.2.0)
