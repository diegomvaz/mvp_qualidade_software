import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Users, MapPin, Briefcase, Clock, Building, Calculator, Brain, TreePine, BarChart3, Zap } from 'lucide-react';
import { 
  EXPERIENCE_LEVELS, 
  EMPLOYMENT_TYPES, 
  JOB_TITLES, 
  COUNTRIES, 
  COMPANY_SIZES, 
  REMOTE_RATIOS 
} from '@/data/salaryData';
import { SalaryFormData, ApiPredictionResponse } from '@/utils/salaryPredictor';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { formData, predictions }: { formData: SalaryFormData; predictions: ApiPredictionResponse['previsoes'] } = location.state || {};

  if (!formData || !predictions) {
    navigate('/');
    return null;
  }

  const getDisplayValue = (field: keyof SalaryFormData, value: any) => {
    switch (field) {
      case 'experience_level':
        return EXPERIENCE_LEVELS.find(exp => exp.code === value)?.label || value;
      case 'employment_type':
        return EMPLOYMENT_TYPES.find(emp => emp.code === value)?.label || value;
      case 'job_title':
        return value;
      case 'employee_residence':
      case 'company_location':
        return COUNTRIES.find(country => country.code === value)?.name || value;
      case 'company_size':
        return COMPANY_SIZES.find(size => size.code === value)?.label || value;
      case 'remote_ratio':
        return REMOTE_RATIOS.find(ratio => ratio.value === value)?.label || value;
      default:
        return value;
    }
  };

  const getIcon = (field: keyof SalaryFormData) => {
    switch (field) {
      case 'experience_level':
        return <TrendingUp className="h-4 w-4" />;
      case 'employment_type':
        return <Clock className="h-4 w-4" />;
      case 'job_title':
        return <Briefcase className="h-4 w-4" />;
      case 'employee_residence':
      case 'company_location':
        return <MapPin className="h-4 w-4" />;
      case 'company_size':
        return <Users className="h-4 w-4" />;
      case 'remote_ratio':
        return <Building className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getFieldLabel = (field: keyof SalaryFormData) => {
    switch (field) {
      case 'experience_level':
        return 'Nível de Experiência';
      case 'employment_type':
        return 'Tipo de Contratação';
      case 'job_title':
        return 'Cargo';
      case 'employee_residence':
        return 'Sua Localização';
      case 'company_location':
        return 'Localização da Empresa';
      case 'company_size':
        return 'Tamanho da Empresa';
      case 'remote_ratio':
        return 'Modalidade de Trabalho';
      default:
        return field;
    }
  };

  const getAlgorithmIcon = (algorithm: string) => {
    switch (algorithm) {
      case 'knn':
        return <Users className="h-6 w-6" />;
      case 'árvore':
        return <TreePine className="h-6 w-6" />;
      case 'naive_bayes':
        return <BarChart3 className="h-6 w-6" />;
      case 'svm':
        return <Zap className="h-6 w-6" />;
      default:
        return <Brain className="h-6 w-6" />;
    }
  };

  const getAlgorithmName = (algorithm: string) => {
    switch (algorithm) {
      case 'knn':
        return 'K-Nearest Neighbors';
      case 'árvore':
        return 'Árvore de Decisão';
      case 'naive_bayes':
        return 'Naive Bayes';
      case 'svm':
        return 'Support Vector Machine';
      default:
        return algorithm;
    }
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case 'knn':
        return 'from-blue-50 to-blue-100';
      case 'árvore':
        return 'from-green-50 to-green-100';
      case 'naive_bayes':
        return 'from-purple-50 to-purple-100';
      case 'svm':
        return 'from-orange-50 to-orange-100';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  const getAlgorithmIconColor = (algorithm: string) => {
    switch (algorithm) {
      case 'knn':
        return 'text-blue-600';
      case 'árvore':
        return 'text-green-600';
      case 'naive_bayes':
        return 'text-purple-600';
      case 'svm':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Resultado das Previsões
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comparação entre 4 algoritmos de Machine Learning
          </p>
        </div>

        {/* Resultados dos Algoritmos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(predictions).map(([algorithm, prediction]) => (
            <Card key={algorithm} className={`shadow-xl border-0 bg-gradient-to-br ${getAlgorithmColor(algorithm)}`}>
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto p-3 bg-white rounded-full mb-2 ${getAlgorithmIconColor(algorithm)}`}>
                  {getAlgorithmIcon(algorithm)}
                </div>
                <CardTitle className="text-lg">
                  {getAlgorithmName(algorithm)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {String(prediction)}
                </div>
                <div className="text-sm text-gray-600">
                  por ano
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo das Informações */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Suas Informações</CardTitle>
              <CardDescription>
                Dados utilizados para as previsões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData).map(([field, value]) => (
                <div key={field} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {getIcon(field as keyof SalaryFormData)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">
                      {getFieldLabel(field as keyof SalaryFormData)}
                    </div>
                    <div className="text-gray-600">
                      {getDisplayValue(field as keyof SalaryFormData, value)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Informações sobre os Algoritmos */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sobre os Algoritmos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">K-Nearest Neighbors</h4>
                  <p className="text-sm text-gray-600">
                    Baseia-se em profissionais similares para estimar salários
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <TreePine className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Árvore de Decisão</h4>
                  <p className="text-sm text-gray-600">
                    Usa regras hierárquicas para determinar faixas salariais
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Naive Bayes</h4>
                  <p className="text-sm text-gray-600">
                    Aplica probabilidades condicionais aos dados profissionais
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Zap className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Support Vector Machine</h4>
                  <p className="text-sm text-gray-600">
                    Encontra padrões complexos nos dados salariais
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Nova Previsão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
