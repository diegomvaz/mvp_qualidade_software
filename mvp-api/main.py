from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
import pandas as pd
import os

app = FastAPI(title="API Estimadora de Faixa Salarial")

origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",  # React
]

# Adiciona o middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Origem que pode fazer requisições
    allow_credentials=True,
    allow_methods=["*"],                # Métodos permitidos (GET, POST, etc.)
    allow_headers=["*"],                # Headers permitidos
)


# Caminho dos modelos salvos
MODELOS = {
    "knn": "modelo_knn.joblib",
    "árvore": "modelo_árvore.joblib",
    "naive_bayes": "modelo_naive_bayes.joblib",
    "svm": "modelo_svm.joblib"
}

# Faixas salariais esperadas (se os modelos usaram categorias codificadas como índices)
FAIXAS = [
    "Até 50k",
    "50k–100k",
    "100k–150k",
    "150k–200k",
    "200k–300k",
    "Acima de 300k"
]

class EntradaProfissional(BaseModel):
    experience_level: str
    employment_type: str
    job_title: str
    employee_residence: str
    remote_ratio: int
    company_location: str
    company_size: str

@app.post("/prever/")
def prever_todos_modelos(dados: EntradaProfissional):
    entrada_df = pd.DataFrame([dados.dict()])

    previsoes = {}

    for nome, caminho_modelo in MODELOS.items():
        try:
            clf = load(os.path.join("modelos", caminho_modelo))
            pred = clf.predict(entrada_df)[0]

            # Se for índice numérico, mapear para faixa
            if isinstance(pred, (int, float)) and int(pred) < len(FAIXAS):
                faixa = FAIXAS[int(pred)]
            else:
                faixa = str(pred)

            previsoes[nome] = faixa
        except Exception as e:
            previsoes[nome] = f"Erro: {str(e)}"

    return {"previsoes": previsoes}