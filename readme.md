# Salary Predictor - Full Stack Data Science Project


Este projeto é um sistema completo de previsão salarial para profissionais de Data Science, composto por três componentes principais:

1. **Notebook de Modelagem**: Desenvolvimento e treinamento dos modelos de Machine Learning
2. **API FastAPI**: Serviço RESTful para fazer previsões usando os modelos treinados
3. **Frontend React**: Interface interativa para coletar dados e visualizar previsões

📹 [Vídeo Explicativo](https://www.youtube.com/watch?v=1vQf8irQgzo)


## 📌 Visão Geral

O sistema utiliza 4 algoritmos de Machine Learning para prever faixas salariais com base em características como:
- Nível de experiência
- Tipo de emprego
- Cargo
- Localização
- Tamanho da empresa
- Percentual de trabalho remoto

## 📊 Faixas Salariais Definidas

O modelo classifica os salários em 6 faixas:
1. Até 50k
2. 50k–100k
3. 100k–150k
4. 150k–200k
5. 200k–300k
6. Acima de 300k



## 🛠️ Componentes do Projeto

### 1. Notebook de Modelagem (`notebook.ipynb`)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1mC9WyQrV1hJr7peZItVTkAhQtVXJfHLw?usp=sharing)

- Pré-processamento de dados de salários de Data Science
- Treinamento de 4 modelos:
  - K-Nearest Neighbors (KNN)
  - Árvore de Decisão
  - Naive Bayes
  - Support Vector Machine (SVM)
- Avaliação comparativa dos modelos
- Exportação dos modelos para produção

### 2. API FastAPI (`backend/`)
- Serviço RESTful com FastAPI
- Endpoint `/prever/` para fazer previsões
- Documentação interativa com Swagger UI
- Configuração de CORS para integração com frontend

### 3. Frontend React (`frontend/`)
- Interface moderna com React + TypeScript
- Formulário interativo para entrada de dados
- Visualização comparativa das previsões
- Design responsivo


## 🤖 Modelos de Machine Learning

O sistema utiliza quatro algoritmos com os seguintes desempenhos:

| Modelo       | Acurácia | Melhores Parâmetros               |
|--------------|----------|-----------------------------------|
| SVM          | 44.54%   | C=1, kernel='rbf'                 |
| Árvore       | 43.48%   | max_depth=10                      |
| KNN          | 41.44%   | n_neighbors=5                     |
| Naive Bayes  | 8.34%    | -                                 |

## 💡 Tecnologias Utilizadas

- **Modelagem**:
  - Python
  - Scikit-learn
  - Pandas
  - Matplotlib/Seaborn

- **Backend**:
  - FastAPI
  - Uvicorn
  - Joblib

- **Frontend**:
  - React
  - TypeScript
  - TanStack Query
  - Shadcn/ui

- **Infraestrutura**:
  - Docker
  - Docker Compose

