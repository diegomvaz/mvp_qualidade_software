# API de Estimativa de Faixa Salarial

Esta API FastAPI fornece previsões de faixa salarial com base em diferentes modelos de machine learning. Ela inclui quatro modelos: KNN, Árvore de Decisão, Naive Bayes e SVM.

## Pré-requisitos

- Docker e Docker Compose instalados
- Python 3.8 ou superior (se rodar localmente sem Docker)



## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
API_PORT=8000
```

## Como Executar 
1. Construa e inicie os containers:

```bash
docker-compose up --build
```

2. A API estará disponível em:
   - `http://localhost:8000` (ou na porta configurada no seu arquivo .env)

3. Para parar a aplicação:

```bash
docker-compose down
```

## Testando a API

Você pode testar a API usando:

1. Interface interativa Swagger UI:
   - Acesse `http://localhost:8000/docs`

2. Ou faça uma requisição POST para `/prever/` com um corpo JSON como:

```json
{
  "experience_level": "MI",
  "employment_type": "FT",
  "job_title": "Data Scientist",
  "employee_residence": "US",
  "remote_ratio": 50,
  "company_location": "US",
  "company_size": "L"
}
```

## Executando os Testes

Para executar os testes de desempenho dos modelos:

```bash
pytest test_model.py -v
```



## Estrutura de Arquivos

- `main.py`: Aplicação FastAPI principal
- `Dockerfile`: Configuração do container Docker
- `docker-compose.yml`: Orquestração de containers
- `requirements.txt`: Dependências do Python
- `test_model.py`: Testes de desempenho dos modelos
- `modelos/`: Diretório contendo os modelos treinados (.joblib)
- `dados/`: Diretório contendo dados de teste (X_test.joblib, y_test.joblib)

## Observações

- Certifique-se de que os arquivos de modelo (.joblib) estejam no diretório `modelos/`
- Os dados de teste devem estar no diretório `dados/` para os testes funcionarem
- A API já está configurada com CORS para aceitar requisições de `localhost:3000` e `localhost:5173`
