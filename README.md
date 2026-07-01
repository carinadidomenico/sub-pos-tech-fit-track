# FitTrack

Aplicativo mobile para registro e acompanhamento de hábitos de saúde: consumo de água, horas de sono, humor diário e exercícios realizados. Os dados são armazenados localmente no dispositivo.

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 56) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Navegação | [React Navigation](https://reactnavigation.org/) (Native Stack) |
| Persistência | [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) |
| Estado global | React Context + hooks customizados |
| UI / layout | React Native StyleSheet, Safe Area Context |
| Web (opcional) | react-native-web + react-dom (Metro bundler) |

## Funcionalidades

- **Home / Dashboard** — resumo do dia, progresso das metas e atalhos de navegação
- **Registro diário** — formulário com validação (água, sono, humor, exercício)
- **Histórico** — lista de registros com destaque para metas atingidas e exercícios realizados

### Metas diárias

| Métrica | Meta |
|---------|------|
| Água | 2 000 ml |
| Sono | 7 h |
| Humor | ≥ 3 (escala 1–5) |
| Exercício | realizado |

## Estrutura de pastas

```
fittrack/
├── assets/                 # Ícones e imagens do Expo
├── src/
│   ├── App.tsx             # Entry do app (Provider + Navigator)
│   ├── components/         # Componentes reutilizáveis de UI
│   │   ├── CustomButton.tsx
│   │   ├── MoodWidget.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── RecordCard.tsx
│   │   └── ScreenLayout.tsx
│   ├── context/
│   │   └── FitTrackContext.tsx   # Estado global e operações CRUD
│   ├── hooks/
│   │   ├── useDailyRecords.ts    # Lista e persistência de registros
│   │   └── useTodaySummary.ts    # Resumo e progresso do dia atual
│   ├── models/
│   │   ├── DailyRecord.ts        # Tipos e metas centralizadas
│   │   └── mocks.ts              # Dados fictícios para desenvolvimento
│   ├── navigation/
│   │   ├── RootNavigator.tsx     # Stack Navigator (Home, Register, History)
│   │   └── types.ts              # Tipagem das rotas
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/
│   │   └── storage.ts            # Acesso ao AsyncStorage
│   ├── theme/
│   │   └── index.ts              # Cores, tipografia e layout
│   └── utils/
│       ├── formatDate.ts         # Formatação de datas
│       ├── goals.ts              # Funções puras de metas e progresso
│       ├── goals.examples.ts     # Exemplos de uso das metas
│       └── validateRegister.ts   # Validação do formulário
├── app.json                # Configuração Expo
├── index.ts                # Registro do componente raiz
├── package.json
├── tsconfig.json
└── Problema.md             # Enunciado do projeto acadêmico
```

## Arquitetura

O projeto separa responsabilidades em camadas:

- **UI** (`components/`, `screens/`) — renderização e interação
- **Estado** (`context/`, `hooks/`) — lógica de negócio consumida pelas telas
- **Models** (`models/`) — tipos e interfaces de dados
- **Services** (`services/`) — único ponto de acesso ao AsyncStorage
- **Utils** (`utils/`) — funções puras (metas, progresso, validação, datas)

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/go) no celular (para testes mobile) ou emulador Android/iOS

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
# Iniciar Metro Bundler
npm start

# Android
npm run android

# iOS (macOS)
npm run ios

# Navegador
npm run web
```

No terminal do Expo, escaneie o QR code com o **Expo Go** ou pressione `a` (Android) / `i` (iOS).

> **Web:** use `npm run web` para abrir a interface no navegador. Abrir diretamente a URL do Metro (`http://localhost:8081`) sem o modo web exibe apenas o manifesto JSON do Expo Go.

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor de desenvolvimento Expo |
| `npm run android` | Abre no emulador/dispositivo Android |
| `npm run ios` | Abre no simulador/dispositivo iOS |
| `npm run web` | Executa a versão web no navegador |
