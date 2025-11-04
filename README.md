# Quiz LDR

**Desenvolvido por Júlia Bastos Barreto - RA: 22124071-6**

Este projeto consiste no desenvolvimento de uma aplicação móvel em React Native (Expo) que opera como um quiz temático. O objetivo primário, alinhado com a liberdade de tema concedida, foi selecionar um assunto de interesse pessoal para garantir a viabilidade e o engajamento no processo de desenvolvimento.

O aplicativo desafia os conhecimentos dos usuários sobre a artista e, em termos técnicos, implementa requisitos fundamentais de persistência de dados local (ranking de pontuações) e interação aprimorada via atuadores do dispositivo.

---

## 1. Visão Geral e Requisitos

### Estrutura de Telas
O aplicativo possui uma navegação completa, totalizando cinco telas distintas (Home, Quiz, Ranking, Curiosidades e Sobre).

### Persistência de Dados (Ranking Local)
Para atender ao requisito de armazenamento de dados, foi implementada a biblioteca **AsyncStorage**. Essa solução permite a persistência local das pontuações dos usuários, estabelecendo um *Ranking Local* durável que exibe as maiores pontuações por dificuldade.

### Interação com Atuadores
O projeto faz uso de dois atuadores para enriquecer a experiência do usuário:
- **Som (expo-av):** essencial para o Quiz Musical, onde o usuário deve identificar a faixa sonora.  
- **Vibração (Vibration):** fornece feedback tátil imediato em acertos e erros.

---

## 2. Tecnologias e Arquitetura

O projeto foi desenvolvido em **React Native** utilizando a plataforma **Expo** para ambiente de desenvolvimento e build.

### 2.1 Bibliotecas Essenciais

O arquivo `package.json` define as seguintes dependências:

- `@react-native-async-storage/async-storage`: Solução assíncrona para persistência local de dados (o ranking).  
- `expo-av`: Biblioteca principal para o uso do Atuador de Som.  
- `lucide-react-native`: Utilizado para ícones modernos baseados em SVG.

### 2.2 Visão Técnica da Arquitetura e Componentização

A arquitetura do projeto está centralizada no `App.js` como roteador.  
A lógica de negócio está modularizada em `services/` e os estilos em `styles/`.

| Módulo Principal | Função Técnica e Destaque |
|------------------|----------------------------|
| **App.js** | Roteador Central: Gerencia a navegação entre as 5 telas via switch-case e coordena a aplicação do tema global. |
| **screens/quiz.js** | Lógica do Jogo: Contém a função `handleResposta`, que gerencia a pontuação, o fluxo das perguntas e coordena os dois atuadores (Som e Vibração). |
| **screens/ranking.js** | Persistência de Dados: Implementa o I/O assíncrono com o AsyncStorage e a função de reset, protegida por um Modal de Confirmação customizado para melhor experiência do usuário (substituindo o uso de `alert()` nativo). |
| **services/funcoes_service.js** | Abstração de Atuadores: Isola a lógica de Vibration e expo-av do componente, facilitando a manutenção e garantindo o uso correto dos recursos nativos. |
| **styles/tema_estilos.js** | Design System: Centraliza cores (bg, primária, sucesso, erro) e tipografia, garantindo coesão visual em todas as telas. |

---

## 3. Funcionalidades

O aplicativo possui cinco módulos de tela principais, estruturados para garantir uma experiência completa e desafiadora:

### 1. Tela Home (Início)
**Navegação:** Ponto de entrada que oferece acesso direto às principais funcionalidades (Jogar, Ranking, Curiosidades, Sobre).

### 2. Tela Quiz (Jogar)
**Módulos de Dificuldade:** O usuário pode selecionar entre os níveis Fácil, Médio e Difícil, ajustando a complexidade das perguntas e a pontuação.  
**Tipos de Perguntas:** Texto, Imagem e Música (Áudio).  
**Feedback de Interação:** O atuador de Vibração é acionado para notificar o usuário com feedback tátil, tanto em caso de acerto (vitória) quanto de erro (reforço negativo).

### 3. Tela Ranking
**Persistência Local:** Exibe as pontuações mais altas registradas no dispositivo (AsyncStorage).  
**Gerenciamento:** Implementa a funcionalidade de reset do ranking (remoção do item chave no AsyncStorage) protegida por um Modal de Confirmação customizado em `screens/ranking.js`.

### 4. Tela Curiosidades
**Conteúdo Secundário:** Apresenta informações e fatos adicionais sobre a temática do app.

### 5. Tela Sobre
**Metadados:** Exibe a versão do aplicativo e informações de desenvolvimento.

---

## 4. Instalação e Execução

### 🧩 Pré-requisitos
- **Node.js** instalado  
- **Expo CLI** instalado globalmente (`npm install -g expo-cli`) ou uso de `npx expo`

---

### Passos para Execução

# 1. Clone o Repositório
git clone https://github.com/julbastos/quiz-ldr.git
cd quiz-ldr

# 2. Instale as Dependências
npm install
# ou
yarn install

# 3. Execute o Projeto
npx expo start

# 6. Aprendizados e Próximos Passos

## Aprendizados

O desenvolvimento deste projeto proporcionou um aprofundamento na gestão de estado complexa e na integração de funcionalidades nativas em React Native:

- **Manipulação de Atuadores:** A integração do 'expo-av' exigiu um entendimento rigoroso do ciclo de vida dos objetos de som para garantir que os recursos de áudio fossem carregados e descarregados corretamente, evitando consumo excessivo de memória.  
- **Modularização e Arquitetura:** O isolamento da lógica de negócio (como as funções de serviço para atuadores e AsyncStorage) em módulos separados contribuiu para um código mais limpo.  
- **Persistência de Dados:** Foi consolidada a prática de salvar e recuperar dados estruturados (JSON) no AsyncStorage, crucial para a funcionalidade de ranking.

## Próximos Passos (Melhorias Futuras)

- **Integração com Firebase:** Substituir o armazenamento local (AsyncStorage) pelo Firebase Firestore para implementar um ranking global, permitindo a comparação de pontuações entre múltiplos usuários.  
- **Temporizador:** Adicionar um componente de temporizador com contagem regressiva para aumentar a dificuldade e a pressão competitiva do quiz.  
- **Efeitos Visuais:** Implementar animações e transições mais sofisticadas para feedback visual de acerto e erro, aprimorando a experiência do usuário.
