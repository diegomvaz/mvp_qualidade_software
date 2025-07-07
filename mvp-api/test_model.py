import joblib
import os
import pytest
from sklearn.metrics import accuracy_score, classification_report

# Threshold de desempenho mínimo
ACCURACY_THRESHOLD = 0.40

# Lista de modelos a testar
MODELOS = [
    "modelo_árvore.joblib",
    "modelo_knn.joblib",
    "modelo_naive_bayes.joblib",
    "modelo_svm.joblib",
]

@pytest.mark.parametrize("modelo_nome", MODELOS)
def test_modelo_desempenho(modelo_nome):
    # Caminhos
    modelo_path = os.path.join("modelos", modelo_nome)
    X_test = joblib.load("dados/X_test.joblib")
    y_test = joblib.load("dados/y_test.joblib")
    modelo = joblib.load(modelo_path)

    # Predição
    y_pred = modelo.predict(X_test)

    # Métrica de avaliação
    acc = accuracy_score(y_test, y_pred)

    print(f"\n✅ [{modelo_nome}] Accuracy: {acc:.3f}")
    print(classification_report(y_test, y_pred))

    assert acc >= ACCURACY_THRESHOLD, f"{modelo_nome}: Accuracy abaixo do mínimo aceitável: {acc:.3f}"
