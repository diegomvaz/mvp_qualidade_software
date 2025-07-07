
import {
  EXPERIENCE_LEVELS,
  EMPLOYMENT_TYPES,
  JOB_TITLES,
  COUNTRIES,
  COMPANY_SIZES,
  REMOTE_RATIOS,
  SALARY_RANGES
} from '@/data/salaryData';

export interface SalaryFormData {
  experience_level: string;
  employment_type: string;
  job_title: string;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

export interface ApiPredictionResponse {
  previsoes: {
    knn: string;
    árvore: string;
    naive_bayes: string;
    svm: string;
  };
}

export async function predictSalaryFromApi(formData: SalaryFormData): Promise<ApiPredictionResponse> {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Erro ao chamar API:', error);
    // Fallback para algoritmo local em caso de erro
    // const points = calculatePoints(formData);
    // const localPrediction = predictSalaryRange(formData, points);

    // return {
    //   previsoes: {
    //     knn: 'localPrediction',
    //     árvore: localPrediction,
    //     naive_bayes: localPrediction,
    //     svm: localPrediction,
    //   }
    // };
  }
}

// Manter funções existentes como fallback
export function predictSalaryRange(formData: SalaryFormData, points: number): string {
  // Algoritmo baseado em pontuação (1-20 pontos possíveis)
  // Ajustado para considerar combinações realistas

  if (points <= 8) return SALARY_RANGES[0]; // Até 50k
  if (points <= 12) return SALARY_RANGES[1]; // 50k–100k
  if (points <= 15) return SALARY_RANGES[2]; // 100k–150k
  if (points <= 17) return SALARY_RANGES[3]; // 150k–200k
  if (points <= 19) return SALARY_RANGES[4]; // 200k–300k
  return SALARY_RANGES[5]; // Acima de 300k
}

export function calculatePoints(formData: SalaryFormData): number {
  let points = 0;

  // Experience level
  const expLevel = EXPERIENCE_LEVELS.find((exp: any) => exp.code === formData.experience_level);
  points += expLevel?.points || 0;

  // Employment type
  const empType = EMPLOYMENT_TYPES.find((emp: any) => emp.code === formData.employment_type);
  points += empType?.points || 0;

  // Job title
  const jobTitle = JOB_TITLES.find((job: any) => job.title === formData.job_title);
  points += jobTitle?.points || 0;

  // Employee residence
  const empResidence = COUNTRIES.find((country: any) => country.code === formData.employee_residence);
  points += empResidence?.points || 0;

  // Company location  
  const compLocation = COUNTRIES.find((country: any) => country.code === formData.company_location);
  points += compLocation?.points || 0;

  // Company size
  const compSize = COMPANY_SIZES.find((size: any) => size.code === formData.company_size);
  points += compSize?.points || 0;

  // Remote ratio
  const remoteRatio = REMOTE_RATIOS.find((remote: any) => remote.value === formData.remote_ratio);
  points += remoteRatio?.points || 0;

  return points;
}
