# Salary Predictor - Data Science

Este é um aplicativo de previsão salarial para profissionais de Data Science que utiliza múltiplos algoritmos de Machine Learning para estimar faixas salariais anuais.

## Pré-requisitos

- Docker instalado na sua máquina
- Docker Compose (normalmente vem com a instalação do Docker)


## Variáveis de Ambiente
Para conectar o frontend à API de previsão salarial, você precisará configurar o endpoint da API no seu ambiente local.
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_API_ENDPOINT=http://SEU_IP_LOCAL:8000/prever/
```

## Como executar o aplicativo

1. **Construa e inicie os containers**:

```bash
docker-compose up
```

3. **Acesse o aplicativo**:

Abra seu navegador e visite:
```
http://localhost:3000
```

## Funcionalidades

- Formulário interativo para inserção de dados profissionais
- Previsão salarial usando 4 algoritmos diferentes:
  - K-Nearest Neighbors (KNN)
  - Árvore de Decisão
  - Naive Bayes
  - Support Vector Machine (SVM)
- Página de resultados comparativos
- Design responsivo e moderno

## Estrutura do Projeto

- `App.tsx`: Configuração principal do aplicativo React
- `SalaryPredictor.tsx`: Componente principal do formulário de previsão
- `Results.tsx`: Página de resultados das previsões
- `salaryData.ts`: Dados de configuração (faixas salariais, níveis de experiência, etc.)
- `Dockerfile` e `docker-compose.yml`: Configurações para containerização

## Tecnologias Utilizadas

- React com TypeScript
- React Router para navegação
- TanStack Query para gerenciamento de estado
- Shadcn/ui para componentes UI
- Docker para containerização

## Observações

- O aplicativo depende de uma API externa para fazer as previsões (não incluída neste repositório)
- Todos os campos do formulário são obrigatórios para obter uma previsão
- O aplicativo está configurado para rodar na porta 3000 do seu localhost

