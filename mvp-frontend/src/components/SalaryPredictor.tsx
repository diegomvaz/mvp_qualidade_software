
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Users, MapPin, Briefcase, Clock, Building } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  EXPERIENCE_LEVELS,
  EMPLOYMENT_TYPES,
  JOB_TITLES,
  COUNTRIES,
  COMPANY_SIZES,
  REMOTE_RATIOS
} from '@/data/salaryData';
import { SalaryFormData, predictSalaryFromApi } from '@/utils/salaryPredictor';

const SalaryPredictor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SalaryFormData>({
    experience_level: '',
    employment_type: '',
    job_title: '',
    employee_residence: '',
    remote_ratio: 0,
    company_location: '',
    company_size: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof SalaryFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    // Validar se todos os campos estão preenchidos
    const requiredFields = Object.keys(formData) as (keyof SalaryFormData)[];
    const isFormComplete = requiredFields.every(field =>
      formData[field] !== '' && formData[field] !== undefined
    );

    if (!isFormComplete) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para obter a previsão.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    try {
      const apiResponse = await predictSalaryFromApi(formData);

      setIsCalculating(false);

      // Navegar para a página de resultados com os dados da API
      navigate('/results', {
        state: {
          formData,
          predictions: apiResponse.previsoes
        }
      });

      toast({
        title: "Previsão calculada!",
        description: "Resultados dos 4 algoritmos obtidos com sucesso!",
      });
    } catch (error) {
      setIsCalculating(false);
      toast({
        title: "Erro na previsão",
        description: "Houve um problema ao calcular a previsão. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Previsor de Salário Data Science
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra sua faixa salarial anual estimada baseada em suas características profissionais
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Informações Profissionais
              </CardTitle>
              <CardDescription>
                Preencha todos os campos para obter uma previsão precisa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Experience Level */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Nível de Experiência
                </Label>
                <Select onValueChange={(value) => handleInputChange('experience_level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level.code} value={level.code}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tipo de Contratação
                </Label>
                <Select onValueChange={(value) => handleInputChange('employment_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <SelectItem key={type.code} value={type.code}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Cargo
                </Label>
                <Select onValueChange={(value) => handleInputChange('job_title', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TITLES.map((job) => (
                      <SelectItem key={job.title} value={job.title}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Employee Residence */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sua Localização
                </Label>
                <Select onValueChange={(value) => handleInputChange('employee_residence', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Onde você mora?" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Company Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Localização da Empresa
                </Label>
                <Select onValueChange={(value) => handleInputChange('company_location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Onde fica a empresa?" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Tamanho da Empresa
                </Label>
                <Select onValueChange={(value) => handleInputChange('company_size', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size.code} value={size.code}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Remote Ratio */}
              <div className="space-y-2">
                <Label>Modalidade de Trabalho</Label>
                <Select onValueChange={(value) => handleInputChange('remote_ratio', Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {REMOTE_RATIOS.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value.toString()}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handlePredict}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular Faixa Salarial
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Informações */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Como funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calculator className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4 Algoritmos Diferentes</h4>
                  <p className="text-sm text-gray-600">
                    KNN, Árvore de Decisão, Naive Bayes e SVM para máxima precisão
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Análise Comparativa</h4>
                  <p className="text-sm text-gray-600">
                    Compare resultados de diferentes modelos de machine learning
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">API em Tempo Real</h4>
                  <p className="text-sm text-gray-600">
                    Previsões atualizadas baseadas em dados reais do mercado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalaryPredictor;
