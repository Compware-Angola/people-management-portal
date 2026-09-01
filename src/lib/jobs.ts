export type JobCategory = "docente" | "tecnico";

export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  faculty: string;
  contract: "Tempo Integral" | "Tempo Parcial" | "Convidado";
  regime: "Presencial" | "Híbrido";
  level: "Licenciatura" | "Mestrado" | "Doutoramento";
  location: string;
  deadline: string;
  openedDaysAgo: number;
  summary: string;
  bullets: string[];
  description: string[];
  requirements: string[];
  benefits: string[];
  documents: string[];
  applicants: number;
};

export const FACULTIES = [
  "Faculdade de Direito",
  "Faculdade de Engenharia",
  "Faculdade de Enfermagem",
  "Faculdade de Teologia",
  "Faculdade de Gestão",
  "Faculdade de Tecnologias de Informação",
  "Faculdade de Psicologia",
  "Serviços Administrativos",
  "Biblioteca Central",
] as const;

export const CONTRACTS = ["Tempo Integral", "Tempo Parcial", "Convidado"] as const;
export const REGIMES = ["Presencial", "Híbrido"] as const;
export const LEVELS = ["Licenciatura", "Mestrado", "Doutoramento"] as const;

export const CATEGORY_LABEL: Record<JobCategory, string> = {
  docente: "Corpo Docente",
  tecnico: "Corpo Técnico-Administrativo",
};

const DOCS_DOCENTE = [
  "Curriculum Vitae atualizado",
  "Certificados académicos (grau máximo)",
  "Carta de motivação",
  "Cópia do Bilhete de Identidade",
  "Plano de aulas ou portefólio científico",
];

const DOCS_TECNICO = [
  "Curriculum Vitae atualizado",
  "Certificado de habilitações",
  "Carta de motivação",
  "Cópia do Bilhete de Identidade",
];

export const JOBS: Job[] = [
  {
    id: "professor-direito-civil",
    title: "Professor de Direito Civil",
    category: "docente",
    faculty: "Faculdade de Direito",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Doutoramento",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "30 de Setembro de 2026",
    openedDaysAgo: 4,
    summary:
      "Regência das cadeiras de Direito Civil I e II, com orientação de monografias no 4.º ano.",
    bullets: [
      "Carga de 12 horas semanais",
      "Orientação de finalistas",
      "Integração em linha de investigação",
    ],
    description: [
      "A Universidade Metodista de Angola procura um docente para a área de Direito Civil, responsável pela regência das cadeiras de Direito Civil I e II no curso de Direito.",
      "O docente participará ainda nos júris de defesa de monografias e na dinamização de seminários abertos à comunidade académica.",
    ],
    requirements: [
      "Doutoramento em Direito (ou Mestrado com processo de doutoramento em curso)",
      "Mínimo de 3 anos de experiência em docência universitária",
      "Publicações científicas na área jurídica (preferencial)",
      "Disponibilidade para o período diurno",
    ],
    benefits: [
      "Subsídio de transporte e alimentação",
      "Apoio à investigação e participação em conferências",
      "Formação pedagógica contínua",
      "Desconto em cursos de pós-graduação para familiares",
    ],
    documents: DOCS_DOCENTE,
    applicants: 24,
  },
  {
    id: "professor-engenharia-civil",
    title: "Professor de Estruturas e Betão Armado",
    category: "docente",
    faculty: "Faculdade de Engenharia",
    contract: "Tempo Parcial",
    regime: "Presencial",
    level: "Mestrado",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "15 de Outubro de 2026",
    openedDaysAgo: 9,
    summary:
      "Lecionação de Estruturas e Betão Armado com acompanhamento de trabalhos laboratoriais.",
    bullets: [
      "Aulas em regime pós-laboral",
      "Acompanhamento laboratorial",
      "Projetos com empresas parceiras",
    ],
    description: [
      "Pretende-se um docente para a área de Estruturas, com forte componente prática e ligação ao setor da construção em Angola.",
      "As aulas decorrem em regime pós-laboral, com apoio ao laboratório de materiais.",
    ],
    requirements: [
      "Mestrado em Engenharia Civil",
      "Experiência prática em projeto de estruturas",
      "Inscrição válida na Ordem dos Engenheiros de Angola",
    ],
    benefits: [
      "Remuneração por hora competitiva",
      "Acesso a laboratórios e software licenciado",
      "Possibilidade de progressão para tempo integral",
    ],
    documents: DOCS_DOCENTE,
    applicants: 11,
  },
  {
    id: "professor-enfermagem",
    title: "Professor de Enfermagem Clínica",
    category: "docente",
    faculty: "Faculdade de Enfermagem",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Mestrado",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "5 de Outubro de 2026",
    openedDaysAgo: 2,
    summary:
      "Coordenação das práticas clínicas e supervisão de estágios hospitalares dos estudantes.",
    bullets: [
      "Supervisão de estágios",
      "Coordenação de práticas clínicas",
      "Trabalho com hospitais parceiros",
    ],
    description: [
      "Docente responsável pela componente prática do curso de Enfermagem, incluindo a supervisão de estágios em unidades hospitalares parceiras.",
    ],
    requirements: [
      "Mestrado em Enfermagem ou Ciências da Saúde",
      "Experiência clínica mínima de 5 anos",
      "Registo profissional válido",
    ],
    benefits: [
      "Seguro de saúde",
      "Subsídio de transporte",
      "Formação contínua em simulação clínica",
    ],
    documents: DOCS_DOCENTE,
    applicants: 18,
  },
  {
    id: "professor-teologia",
    title: "Professor Convidado de Teologia Prática",
    category: "docente",
    faculty: "Faculdade de Teologia",
    contract: "Convidado",
    regime: "Híbrido",
    level: "Doutoramento",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "20 de Outubro de 2026",
    openedDaysAgo: 15,
    summary:
      "Módulos intensivos de Teologia Prática em regime híbrido, com sessões presenciais mensais.",
    bullets: [
      "Módulos intensivos",
      "Sessões presenciais mensais",
      "Publicação na revista da faculdade",
    ],
    description: [
      "Vaga para docente convidado responsável por módulos intensivos de Teologia Prática, em regime híbrido.",
    ],
    requirements: [
      "Doutoramento em Teologia",
      "Experiência em ensino híbrido",
      "Produção académica recente",
    ],
    benefits: [
      "Honorários por módulo",
      "Apoio logístico às sessões presenciais",
      "Acesso à biblioteca digital",
    ],
    documents: DOCS_DOCENTE,
    applicants: 7,
  },
  {
    id: "professor-ti",
    title: "Professor de Engenharia de Software",
    category: "docente",
    faculty: "Faculdade de Tecnologias de Informação",
    contract: "Tempo Integral",
    regime: "Híbrido",
    level: "Mestrado",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "12 de Outubro de 2026",
    openedDaysAgo: 6,
    summary:
      "Lecionação de Engenharia de Software e orientação de projetos finais de curso.",
    bullets: [
      "Projetos práticos com empresas",
      "Orientação de finalistas",
      "Laboratório de inovação",
    ],
    description: [
      "Docente para as cadeiras de Engenharia de Software, Arquitetura de Sistemas e orientação de projetos finais.",
    ],
    requirements: [
      "Mestrado em Informática ou Engenharia de Software",
      "Experiência prática em desenvolvimento de software",
      "Domínio de metodologias ágeis",
    ],
    benefits: [
      "Equipamento de trabalho",
      "Certificações técnicas financiadas",
      "Regime híbrido flexível",
    ],
    documents: DOCS_DOCENTE,
    applicants: 31,
  },
  {
    id: "professor-psicologia",
    title: "Professor de Psicologia do Desenvolvimento",
    category: "docente",
    faculty: "Faculdade de Psicologia",
    contract: "Tempo Parcial",
    regime: "Presencial",
    level: "Licenciatura",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "28 de Setembro de 2026",
    openedDaysAgo: 12,
    summary:
      "Aulas de Psicologia do Desenvolvimento no 2.º ano e apoio ao gabinete de aconselhamento.",
    bullets: [
      "8 horas semanais",
      "Apoio ao gabinete de aconselhamento",
      "Investigação aplicada",
    ],
    description: [
      "Docente para a cadeira de Psicologia do Desenvolvimento, com colaboração no gabinete de aconselhamento estudantil.",
    ],
    requirements: [
      "Licenciatura em Psicologia (Mestrado preferencial)",
      "Experiência em contexto educativo",
      "Boa capacidade de comunicação",
    ],
    benefits: [
      "Horário compatível com prática clínica",
      "Supervisão académica",
      "Acesso a formação interna",
    ],
    documents: DOCS_DOCENTE,
    applicants: 9,
  },
  {
    id: "tecnico-laboratorio",
    title: "Técnico de Laboratório",
    category: "tecnico",
    faculty: "Faculdade de Engenharia",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Licenciatura",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "8 de Outubro de 2026",
    openedDaysAgo: 3,
    summary:
      "Preparação, manutenção e segurança dos laboratórios de materiais e hidráulica.",
    bullets: [
      "Gestão de equipamento",
      "Apoio às aulas práticas",
      "Controlo de stock e segurança",
    ],
    description: [
      "Responsável pela preparação das aulas práticas, manutenção preventiva do equipamento e cumprimento das normas de segurança laboratorial.",
    ],
    requirements: [
      "Licenciatura ou curso médio técnico na área",
      "Experiência mínima de 2 anos em laboratório",
      "Conhecimentos de normas de segurança",
    ],
    benefits: [
      "Subsídio de alimentação e transporte",
      "Formação técnica especializada",
      "Contrato estável",
    ],
    documents: DOCS_TECNICO,
    applicants: 22,
  },
  {
    id: "assistente-administrativo",
    title: "Assistente Administrativo",
    category: "tecnico",
    faculty: "Serviços Administrativos",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Licenciatura",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "25 de Setembro de 2026",
    openedDaysAgo: 1,
    summary:
      "Atendimento ao público, gestão documental e apoio aos processos de matrícula.",
    bullets: [
      "Atendimento presencial e telefónico",
      "Gestão de arquivo digital",
      "Apoio às matrículas",
    ],
    description: [
      "Apoio administrativo à Secretaria Geral, incluindo atendimento a estudantes, organização documental e processos de matrícula.",
    ],
    requirements: [
      "Licenciatura em Gestão, Administração ou área afim",
      "Domínio de Excel e Word",
      "Excelente comunicação em português",
    ],
    benefits: [
      "Subsídio de transporte",
      "Formação interna em gestão académica",
      "Progressão na carreira administrativa",
    ],
    documents: DOCS_TECNICO,
    applicants: 47,
  },
  {
    id: "bibliotecario",
    title: "Bibliotecário / Gestor de Acervo",
    category: "tecnico",
    faculty: "Biblioteca Central",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Licenciatura",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "18 de Outubro de 2026",
    openedDaysAgo: 8,
    summary:
      "Catalogação do acervo físico e digital e apoio à pesquisa académica dos estudantes.",
    bullets: [
      "Catalogação e indexação",
      "Apoio à pesquisa académica",
      "Gestão do repositório digital",
    ],
    description: [
      "Gestão do acervo da Biblioteca Central, catalogação de novas aquisições e apoio à pesquisa dos estudantes e docentes.",
    ],
    requirements: [
      "Licenciatura em Ciências da Informação ou área afim",
      "Conhecimento de sistemas de gestão bibliográfica",
      "Organização e rigor documental",
    ],
    benefits: [
      "Acesso integral às bases de dados científicas",
      "Formação em curadoria digital",
      "Horário estável",
    ],
    documents: DOCS_TECNICO,
    applicants: 13,
  },
  {
    id: "tecnico-informatica",
    title: "Técnico de Suporte Informático",
    category: "tecnico",
    faculty: "Faculdade de Tecnologias de Informação",
    contract: "Tempo Integral",
    regime: "Híbrido",
    level: "Licenciatura",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "2 de Outubro de 2026",
    openedDaysAgo: 5,
    summary:
      "Manutenção da rede, salas de informática e suporte aos serviços académicos digitais.",
    bullets: [
      "Suporte a utilizadores",
      "Manutenção de rede e servidores",
      "Gestão de salas de informática",
    ],
    description: [
      "Suporte técnico transversal à instituição: redes, equipamentos, salas de informática e plataformas académicas.",
    ],
    requirements: [
      "Licenciatura ou curso técnico em Informática",
      "Experiência em redes e sistemas Windows/Linux",
      "Disponibilidade para escalas rotativas",
    ],
    benefits: [
      "Certificações técnicas financiadas",
      "Equipamento de trabalho",
      "Regime parcialmente remoto",
    ],
    documents: DOCS_TECNICO,
    applicants: 29,
  },
  {
    id: "gestor-financeiro",
    title: "Gestor Financeiro Adjunto",
    category: "tecnico",
    faculty: "Faculdade de Gestão",
    contract: "Tempo Integral",
    regime: "Presencial",
    level: "Mestrado",
    location: "Luanda, Bairro Kinaxixi",
    deadline: "22 de Outubro de 2026",
    openedDaysAgo: 10,
    summary:
      "Apoio à direção financeira no controlo orçamental e reporte institucional.",
    bullets: [
      "Controlo orçamental",
      "Reporte à Reitoria",
      "Gestão de tesouraria",
    ],
    description: [
      "Colaboração direta com a Direção Financeira na elaboração de orçamentos, controlo de execução e reporte institucional.",
    ],
    requirements: [
      "Mestrado em Gestão, Finanças ou Contabilidade",
      "Experiência de 3 anos em funções financeiras",
      "Conhecimento do sistema fiscal angolano",
    ],
    benefits: [
      "Pacote salarial competitivo",
      "Seguro de saúde",
      "Formação em gestão pública e privada",
    ],
    documents: DOCS_TECNICO,
    applicants: 16,
  },
];

export function getJob(id: string) {
  return JOBS.find((j) => j.id === id);
}

export type ApplicationStatus = "enviada" | "analise" | "aprovada" | "rejeitada";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  enviada: "Enviada",
  analise: "Em análise",
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
};

export const STATUS_CLASS: Record<ApplicationStatus, string> = {
  enviada: "bg-warning/15 text-warning border-warning/30",
  analise: "bg-accent/20 text-accent-foreground border-accent/40",
  aprovada: "bg-success/15 text-success border-success/30",
  rejeitada: "bg-destructive/15 text-destructive border-destructive/30",
};

export type MyApplication = {
  id: string;
  jobId: string;
  submittedAt: string;
  status: ApplicationStatus;
  timeline: { label: string; date: string; done: boolean }[];
};

export const MY_APPLICATIONS: MyApplication[] = [
  {
    id: "APL-2026-0041",
    jobId: "professor-direito-civil",
    submittedAt: "12 de Agosto de 2026",
    status: "analise",
    timeline: [
      { label: "Candidatura submetida", date: "12 Ago 2026", done: true },
      { label: "Documentos validados", date: "13 Ago 2026", done: true },
      { label: "Análise pelo departamento", date: "Em curso", done: false },
      { label: "Entrevista", date: "Pendente", done: false },
      { label: "Decisão final", date: "Pendente", done: false },
    ],
  },
  {
    id: "APL-2026-0038",
    jobId: "tecnico-informatica",
    submittedAt: "5 de Agosto de 2026",
    status: "aprovada",
    timeline: [
      { label: "Candidatura submetida", date: "5 Ago 2026", done: true },
      { label: "Documentos validados", date: "6 Ago 2026", done: true },
      { label: "Análise pelo departamento", date: "8 Ago 2026", done: true },
      { label: "Entrevista", date: "11 Ago 2026", done: true },
      { label: "Decisão final — Aprovada", date: "14 Ago 2026", done: true },
    ],
  },
  {
    id: "APL-2026-0030",
    jobId: "assistente-administrativo",
    submittedAt: "28 de Julho de 2026",
    status: "enviada",
    timeline: [
      { label: "Candidatura submetida", date: "28 Jul 2026", done: true },
      { label: "Documentos validados", date: "Pendente", done: false },
      { label: "Análise pelo departamento", date: "Pendente", done: false },
    ],
  },
  {
    id: "APL-2026-0012",
    jobId: "professor-psicologia",
    submittedAt: "2 de Julho de 2026",
    status: "rejeitada",
    timeline: [
      { label: "Candidatura submetida", date: "2 Jul 2026", done: true },
      { label: "Documentos validados", date: "3 Jul 2026", done: true },
      { label: "Decisão final — Não selecionada", date: "18 Jul 2026", done: true },
    ],
  },
];
