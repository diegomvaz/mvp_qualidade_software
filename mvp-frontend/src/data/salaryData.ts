
export const SALARY_RANGES = [
  "Até 50k",
  "50k–100k",
  "100k–150k",
  "150k–200k",
  "200k–300k",
  "Acima de 300k"
];

export const EXPERIENCE_LEVELS = [
  { code: "EN", label: "Entry-level (Iniciante)", points: 1 },
  { code: "MI", label: "Mid-level (Intermediário)", points: 2 },
  { code: "SE", label: "Senior-level", points: 3 },
  { code: "EX", label: "Executive-level", points: 4 }
];

export const EMPLOYMENT_TYPES = [
  { code: "FT", label: "Full-time", points: 4 },
  { code: "PT", label: "Part-time", points: 2 },
  { code: "CT", label: "Contract (Temporário)", points: 3 },
  { code: "FL", label: "Freelancer", points: 2 }
];

export const JOB_TITLES = [
  { title: "Data Scientist", points: 3 },
  { title: "Machine Learning Engineer", points: 4 },
  { title: "Data Engineer", points: 4 },
  { title: "Data Analyst", points: 2 },
  { title: "Research Scientist", points: 4 },
  { title: "Data Architect", points: 4 },
  { title: "Applied Scientist", points: 4 },
  { title: "Business Intelligence Analyst", points: 2 },
  { title: "AI Scientist", points: 4 },
  { title: "ML Researcher", points: 3 }
];

export const COUNTRIES = [
  { code: "US", name: "Estados Unidos", points: 4 },
  { code: "GB", name: "Reino Unido", points: 3 },
  { code: "IN", name: "Índia", points: 1 },
  { code: "CA", name: "Canadá", points: 3 },
  { code: "DE", name: "Alemanha", points: 3 },
  { code: "ES", name: "Espanha", points: 2 },
  { code: "FR", name: "França", points: 3 },
  { code: "NL", name: "Holanda", points: 3 },
  { code: "BR", name: "Brasil", points: 1 },
  { code: "AU", name: "Austrália", points: 3 }
];

export const COMPANY_SIZES = [
  { code: "S", label: "Small (< 50 funcionários)", points: 2 },
  { code: "M", label: "Medium (50-250 funcionários)", points: 3 },
  { code: "L", label: "Large (> 250 funcionários)", points: 4 }
];

export const REMOTE_RATIOS = [
  { value: 0, label: "Presencial (0% remoto)", points: 2 },
  { value: 50, label: "Híbrido (50% remoto)", points: 3 },
  { value: 100, label: "Totalmente remoto", points: 4 }
];
