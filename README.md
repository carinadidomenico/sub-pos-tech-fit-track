# FitTrack

Aplicativo mobile para registro e acompanhamento de hábitos de saúde: consumo de água, horas de sono, humor diário e exercícios realizados. Os dados são armazenados localmente no dispositivo.

## Tecnologias

- React Native + Expo
- TypeScript
- React Navigation
- AsyncStorage
- React Context + hooks

## Funcionalidades

- **Login** e cadastro com sessão persistente
- **Home** com resumo do dia e progresso das metas
- **Registro diário** com validação
- **Histórico** de registros anteriores

## Estrutura de pastas

```
fittrack/
├── assets/
├── src/
│   ├── components/          # Componentes reutilizáveis (botões, cards, formulários)
│   │   ├── CustomButton.tsx
│   │   ├── MoodWidget.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── RecordCard.tsx
│   │   └── ScreenLayout.tsx
│   ├── context/               # Estado global (auth e registros)
│   │   ├── AuthContext.tsx
│   │   └── FitTrackContext.tsx
│   ├── hooks/                 # useAuth, useDailyRecords, useTodaySummary
│   │   ├── useAuth.ts
│   │   ├── useDailyRecords.ts
│   │   └── useTodaySummary.ts
│   ├── models/                # Tipos de dados
│   │   ├── DailyRecord.ts
│   │   ├── User.ts
│   │   └── mocks.ts
│   ├── navigation/            # Rotas do app
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/               # Telas de login, home, registro e histórico
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/              # AsyncStorage (auth e registros)
│   │   ├── authStorage.ts
│   │   └── storage.ts
│   ├── theme/                 # Cores e fontes
│   │   └── index.ts
│   └── utils/                 # Validações e formatação
│       ├── formatDate.ts
│       ├── goals.ts
│       ├── validateAuth.ts
│       └── validateRegister.ts
├── app.json
├── index.ts
├── package.json
└── tsconfig.json
```

## Como executar

### Pré-requisitos

- Node.js
- Expo Go no celular ou emulador Android/iOS

### Instalação

```bash
npm install
npm start
```

Escaneie o QR code com o **Expo Go** ou use `npm run android`, `npm run ios` ou `npm run web`.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o Expo |
| `npm run android` | Abre no Android |
| `npm run ios` | Abre no iOS |
| `npm run web` | Abre no navegador |
