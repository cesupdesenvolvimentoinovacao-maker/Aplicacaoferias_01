
'use strict';

// ==========================================================================
// DADOS
// ==========================================================================

const dadosFerias = [
  {
    "colaborador": "CARLOS GEOVANNI GONÇALVES SOARES",
    "matricula": "F132101",
    "cargo": "GERENTE DE AMBIENTE",
    "hierarquia": "GESTÃO",
    "local": "CONTERC",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-01-02",
    "data_fim": "2026-01-02",
    "ordem": 1
  },
  {
    "colaborador": "CARLOS GEOVANNI GONÇALVES SOARES",
    "matricula": "F132101",
    "cargo": "GERENTE DE AMBIENTE",
    "hierarquia": "GESTÃO",
    "local": "CONTERC",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-01-12",
    "data_fim": "2026-01-16",
    "ordem": 1
  },
  {
    "colaborador": "CARLOS GEOVANNI GONÇALVES SOARES",
    "matricula": "F132101",
    "cargo": "GERENTE DE AMBIENTE",
    "hierarquia": "GESTÃO",
    "local": "CONTERC",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-01-19",
    "data_fim": "2026-01-23",
    "ordem": 1
  },
  {
    "colaborador": "CARLOS GEOVANNI GONÇALVES SOARES",
    "matricula": "F132101",
    "cargo": "GERENTE DE AMBIENTE",
    "hierarquia": "GESTÃO",
    "local": "CONTERC",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-06",
    "data_fim": "2026-07-25",
    "ordem": 1
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-02-09",
    "data_fim": "2026-02-10",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-05-29",
    "data_fim": "2026-05-29",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-06-18",
    "data_fim": "2026-06-19",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-06-22",
    "data_fim": "2026-06-30",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-01",
    "data_fim": "2026-07-06",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-09-04",
    "data_fim": "2026-09-04",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-10-05",
    "data_fim": "2026-10-09",
    "ordem": 2
  },
  {
    "colaborador": "CAMILA MAIA SALES MOTA",
    "matricula": "F151645",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-12-22",
    "data_fim": "2026-12-31",
    "ordem": 2
  },
  {
    "colaborador": "AILMA DIAS DE HOLANDA",
    "matricula": "F080357",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-01-05",
    "data_fim": "2026-01-09",
    "ordem": 3
  },
  {
    "colaborador": "AILMA DIAS DE HOLANDA",
    "matricula": "F080357",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FOLGA",
    "status": "A Definir",
    "data_inicio": "2026-06-25",
    "data_fim": "2026-06-26",
    "ordem": 3
  },
  {
    "colaborador": "AILMA DIAS DE HOLANDA",
    "matricula": "F080357",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-06-29",
    "data_fim": "2026-06-30",
    "ordem": 3
  },
  {
    "colaborador": "AILMA DIAS DE HOLANDA",
    "matricula": "F080357",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-01",
    "data_fim": "2026-07-03",
    "ordem": 3
  },
  {
    "colaborador": "AILMA DIAS DE HOLANDA",
    "matricula": "F080357",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-09-08",
    "data_fim": "2026-09-27",
    "ordem": 3
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-01-02",
    "data_fim": "2026-01-02",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-02-23",
    "data_fim": "2026-02-28",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-03-01",
    "data_fim": "2026-03-12",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-04-20",
    "data_fim": "2026-04-20",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-06-05",
    "data_fim": "2026-06-05",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-09-28",
    "data_fim": "2026-09-29",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-09-30",
    "data_fim": "2026-09-30",
    "ordem": 4
  },
  {
    "colaborador": "MARIA FERNANDA DINIZ NUNES BRASIL",
    "matricula": "F108901",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-10-01",
    "data_fim": "2026-10-09",
    "ordem": 4
  },
  {
    "colaborador": "ANA PAULA VIANA DE SOUSA",
    "matricula": "B902120",
    "cargo": "BOLSISTA",
    "hierarquia": "BOLSISTA",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-01-05",
    "data_fim": "2026-01-19",
    "ordem": 6
  },
  {
    "colaborador": "ANA PAULA VIANA DE SOUSA",
    "matricula": "B902120",
    "cargo": "BOLSISTA",
    "hierarquia": "BOLSISTA",
    "local": "CEADE",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-06-16",
    "data_fim": "2026-06-30",
    "ordem": 6
  },
  {
    "colaborador": "JORGE ANDRÉ BRASIL LIMA",
    "matricula": "F114537",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-03-23",
    "data_fim": "2026-03-27",
    "ordem": 7
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-01-01",
    "data_fim": "2026-01-02",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-04-06",
    "data_fim": "2026-04-10",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FOLGA",
    "status": "A Definir",
    "data_inicio": "2026-04-20",
    "data_fim": "2026-04-20",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FOLGA",
    "status": "A Definir",
    "data_inicio": "2026-06-05",
    "data_fim": "2026-06-05",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-27",
    "data_fim": "2026-07-31",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-08-01",
    "data_fim": "2026-08-15",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-10-05",
    "data_fim": "2026-10-09",
    "ordem": 8
  },
  {
    "colaborador": "ADRIANO LEITE DE MACÊDO",
    "matricula": "F100021",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FOLGA",
    "status": "A Definir",
    "data_inicio": "2026-12-07",
    "data_fim": "2026-12-07",
    "ordem": 8
  },
  {
    "colaborador": "FERNANDA NOVAIS CRUZ LIMA COSTA",
    "matricula": "F148580",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-02-09",
    "data_fim": "2026-02-13",
    "ordem": 9
  },
  {
    "colaborador": "FERNANDA NOVAIS CRUZ LIMA COSTA",
    "matricula": "F148580",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-06-29",
    "data_fim": "2026-06-30",
    "ordem": 9
  },
  {
    "colaborador": "FERNANDA NOVAIS CRUZ LIMA COSTA",
    "matricula": "F148580",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-01",
    "data_fim": "2026-07-08",
    "ordem": 9
  },
  {
    "colaborador": "FERNANDA NOVAIS CRUZ LIMA COSTA",
    "matricula": "F148580",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-09-08",
    "data_fim": "2026-09-22",
    "ordem": 9
  },
  {
    "colaborador": "GEORGIA MARIA A. GABINIO",
    "matricula": "F148830",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-01-01",
    "data_fim": "2026-01-17",
    "ordem": 10
  },
  {
    "colaborador": "GEORGIA MARIA A. GABINIO",
    "matricula": "F148830",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-04-20",
    "data_fim": "2026-04-20",
    "ordem": 10
  },
  {
    "colaborador": "GEORGIA MARIA A. GABINIO",
    "matricula": "F148830",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-06-05",
    "data_fim": "2026-06-05",
    "ordem": 10
  },
  {
    "colaborador": "GEORGIA MARIA A. GABINIO",
    "matricula": "F148830",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CEQUAM",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-12-28",
    "data_fim": "2026-12-31",
    "ordem": 10
  },
  {
    "colaborador": "VITHOR OLIVEIRA CAMINHA",
    "matricula": "F128686",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-02-09",
    "data_fim": "2026-02-13",
    "ordem": 11
  },
  {
    "colaborador": "VITHOR OLIVEIRA CAMINHA",
    "matricula": "F128686",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CESUP",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-02-18",
    "data_fim": "2026-02-18",
    "ordem": 11
  },
  {
    "colaborador": "VITHOR OLIVEIRA CAMINHA",
    "matricula": "F128686",
    "cargo": "GERENTE DE CÉLULA",
    "hierarquia": "GESTÃO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-05-04",
    "data_fim": "2026-05-18",
    "ordem": 11
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-03-02",
    "data_fim": "2026-03-12",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-06-22",
    "data_fim": "2026-06-23",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FOLGA ELEITORAL",
    "status": "A Definir",
    "data_inicio": "2026-06-25",
    "data_fim": "2026-06-26",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-06-29",
    "data_fim": "2026-06-30",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-07-01",
    "data_fim": "2026-07-03",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-08-31",
    "data_fim": "2026-08-31",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-09-01",
    "data_fim": "2026-09-04",
    "ordem": 12
  },
  {
    "colaborador": "LUANA CAVALCANTI PORTO",
    "matricula": "F112488",
    "cargo": "TECNICO ADMINISTRATIVO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-09-14",
    "data_fim": "2026-09-18",
    "ordem": 12
  },
  {
    "colaborador": "LYSANKA DOS SANTOS XAVIER",
    "matricula": "F123773",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "AUSÊNCIA ABONADA",
    "status": "A Definir",
    "data_inicio": "2026-01-05",
    "data_fim": "2026-01-09",
    "ordem": 13
  },
  {
    "colaborador": "LYSANKA DOS SANTOS XAVIER",
    "matricula": "F123773",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-01-12",
    "data_fim": "2026-01-29",
    "ordem": 13
  },
  {
    "colaborador": "LYSANKA DOS SANTOS XAVIER",
    "matricula": "F123773",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-08-24",
    "data_fim": "2026-08-31",
    "ordem": 13
  },
  {
    "colaborador": "LYSANKA DOS SANTOS XAVIER",
    "matricula": "F123773",
    "cargo": "ADVOGADO IV",
    "hierarquia": "FUNCIONÁRIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-09-01",
    "data_fim": "2026-09-04",
    "ordem": 13
  },
  {
    "colaborador": "THYCYANNE ALVES BEZERRA OLIVEIRA",
    "matricula": "C021155",
    "cargo": "ANALISTA ADMINISTRATIVO",
    "hierarquia": "APOIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-03-16",
    "data_fim": "2026-03-31",
    "ordem": 17
  },
  {
    "colaborador": "THYCYANNE ALVES BEZERRA OLIVEIRA",
    "matricula": "C021155",
    "cargo": "ANALISTA ADMINISTRATIVO",
    "hierarquia": "APOIO",
    "local": "CESUP",
    "tipo": "FÉRIAS",
    "status": "A Definir",
    "data_inicio": "2026-04-01",
    "data_fim": "2026-04-04",
    "ordem": 17
  }
];


const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
let currentTab = 'programadas';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
// Gap de dias para permitir “encaixar” eventos na mesma trilha sem sobrepor
const PROXIMITY_GAP_DAYS = 1; // você tinha 2; 1 permite encostar dia seguinte

// ==========================================================================
// HELPERS DE DATA
// ==========================================================================

// Transforma "2026-01-01" em Date LOCAL (evita bug de fuso)
function parseISODateLocal(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const parts = iso.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function diffDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utc2 - utc1) / MS_PER_DAY);
}

function getYearRange(year) {
  const start = new Date(year, 0, 1, 12, 0, 0, 0);
  const end = new Date(year, 11, 31, 12, 0, 0, 0);
  return { start, end, totalDays: diffDays(start, end) + 1 };
}

// ==========================================================================
// NORMALIZAÇÕES / REGRAS
// ==========================================================================

function normalizeTipo(tipo) {
  const raw = (tipo || '').toString().trim().toUpperCase();
  const noAccents = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (noAccents.includes('FERIA')) return 'ferias'; // Vermelho
  if (noAccents.includes('ELEITORAL')) return 'eleitoral'; // Azul
  if (noAccents.includes('FOLGA')) return 'folga'; // Laranja
  if (noAccents.includes('AUSENCIA') || noAccents.includes('ABONADA')) return 'ausencia'; // Verde
  return 'outros';
}

function isManagerCargo(cargo) {
  return (cargo || '').toUpperCase().includes('GERENTE');
}

// ==========================================================================
// FILTROS E LÓGICA
// ==========================================================================

function getActiveFilters() {
  return {
    centro: document.getElementById('centroFilter')?.value || '',
    funcao: document.getElementById('funcaoFilter')?.value || '',
    ano: Number(document.getElementById('anoFilter')?.value) || 2026,
    mes: document.getElementById('mesFilter')?.value || '',
    gestor: document.getElementById('gestorFilter')?.value || '',
    funcionario: document.getElementById('funcionarioFilter')?.value || '',
  };
}

function getFilteredEvents() {
  const f = getActiveFilters();
  const yr = getYearRange(f.ano);
  const mesNum = f.mes ? Number(f.mes) : null;

  return dadosFerias.filter((item) => {
    // Filtro por aba
    const s = (item.status || '').toLowerCase();
    if (currentTab === 'programadas') {
      if (s.includes('realiz') || s.includes('conclu')) return false;
    } else {
      const end = parseISODateLocal(item.data_fim) || parseISODateLocal(item.data_inicio);
      if (!end || end > new Date()) return false;
    }

    // Selects
    if (f.centro && item.local !== f.centro) return false;
    if (f.funcao && item.cargo !== f.funcao) return false;
    if (f.funcionario && item.colaborador !== f.funcionario) return false;
    if (f.gestor === 'sim' && !isManagerCargo(item.cargo)) return false;

    const start = parseISODateLocal(item.data_inicio);
    const end = parseISODateLocal(item.data_fim) || start;

    // Filtro mês inicial
    if (mesNum !== null) {
      if (!start) return false;
      if (start.getMonth() + 1 !== mesNum) return false;
    }

    // Filtro ano (evento precisa cruzar o ano selecionado)
    if (start && end) {
      if (end < yr.start || start > yr.end) return false;
    } else if (mesNum !== null) {
      return false;
    }

    return true;
  });
}

// ==========================================================================
// INICIALIZAÇÃO E RENDER
// ==========================================================================

function init() {
  populateFilters();
  refreshAll();
  setupEventListeners();
}

function refreshAll() {
  updateStats();
  createChart();
  createTimeline();
}

function populateFilters() {
  const unique = (key) => [...new Set(dadosFerias.map((d) => d[key]).filter(Boolean))].sort();

  const fillSelect = (id, items) => {
    const sel = document.getElementById(id);
    if (!sel) return;

    while (sel.options.length > 1) sel.remove(1);

    items.forEach((i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      sel.appendChild(opt);
    });
  };

  fillSelect('centroFilter', unique('local'));
  fillSelect('funcaoFilter', unique('cargo'));
  fillSelect('funcionarioFilter', unique('colaborador'));

  const mesFilter = document.getElementById('mesFilter');
  if (!mesFilter) return;

  while (mesFilter.options.length > 1) mesFilter.remove(1);

  meses.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = String(i + 1);
    opt.textContent = m.toUpperCase();
    mesFilter.appendChild(opt);
  });
}

function updateStats() {
  const events = getFilteredEvents();
  const matriculas = new Set(events.map((e) => e.matricula));
  const el = document.getElementById('totalColaboradores');
  if (el) el.textContent = String(matriculas.size);
}

function createChart() {
  const f = getActiveFilters();
  const yr = getYearRange(f.ano);
  const counts = new Array(12).fill(0);
  const events = getFilteredEvents();

  events.forEach((e) => {
    if (!e.data_inicio) return;
    const start = parseISODateLocal(e.data_inicio);
    if (start && start >= yr.start && start <= yr.end) counts[start.getMonth()]++;
  });

  const max = Math.max(...counts, 1);
  const chart = document.getElementById('chartBars');
  if (!chart) return;

  chart.innerHTML = '';

  meses.forEach((m, i) => {
    const val = counts[i];
    const h = (val / max) * 100;

    const wrapper = document.createElement('div');
    wrapper.className = 'bar-container';
    wrapper.innerHTML = `
      <div class="bar-value">${val > 0 ? val : ''}</div>
      <div class="bar" style="height: ${val > 0 ? h : 2}%"></div>
      <div class="bar-label">${m.substr(0, 3)}</div>
    `;
    chart.appendChild(wrapper);
  });
}

function createTimeline() {
  const content = document.getElementById('timelineContent');
  if (!content) return;

  content.innerHTML = '';

  const events = getFilteredEvents();
  if (events.length === 0) {
    content.innerHTML = '<div style="padding:20px; color:#666;">Nenhum registro encontrado.</div>';
    return;
  }

  // Agrupar por matrícula (1 linha por colaborador)
  const map = {};
  events.forEach((e) => {
    if (!map[e.matricula]) map[e.matricula] = { info: e, events: [] };
    map[e.matricula].events.push(e);
  });

  // Agrupar por local (setores)
  const groups = {};
  Object.values(map).forEach((u) => {
    const local = u.info.local || 'OUTROS';
    if (!groups[local]) groups[local] = [];
    groups[local].push(u);
  });

  const frag = document.createDocumentFragment();

  Object.keys(groups)
    .sort()
    .forEach((local) => {
      const users = groups[local];
      const groupId = local.replace(/\s+/g, '_');

      // Header do grupo
      const header = document.createElement('div');
      header.className = 'group-header';
      header.dataset.group = groupId;
      header.innerHTML = `<span class="expand-icon expanded">▶</span> ${local}`;
      header.onclick = () => toggleGroup(groupId);
      frag.appendChild(header);

      // Container do grupo
      const container = document.createElement('div');
      container.id = `group-${groupId}`;
      frag.appendChild(container);

      users.forEach((u) => createEmployeeRow(u, container));
    });

  content.appendChild(frag);
}

function createEmployeeRow(user, container) {
  const row = document.createElement('div');
  row.className = 'timeline-row';

  // Coluna nome
  const cellName = document.createElement('div');
  cellName.className = 'employee-cell';
  cellName.innerHTML = `
    <div class="employee-name">${formatarNome(user.info.colaborador)}</div>
    <div class="employee-id">${user.info.cargo}</div>
  `;
  row.appendChild(cellName);

  // Grid base (12 colunas)
  const grid = document.createElement('div');
  grid.className = 'timeline-grid';

  for (let i = 0; i < 12; i++) {
    const cell = document.createElement('div');
    cell.className = 'month-cell';
    grid.appendChild(cell);
  }

  // Trilhas para evitar sobreposição
  const trilhas = [];

  user.events.sort((a, b) => (a.data_inicio || '').localeCompare(b.data_inicio || ''));

  const year = getActiveFilters().ano;
  const yr = getYearRange(year);

  user.events.forEach((evt) => {
    if (!evt.data_inicio) return;

    const start = parseISODateLocal(evt.data_inicio);
    let end = parseISODateLocal(evt.data_fim) || start;
    if (!start || !end) return;

    // ✅ Proteção para dados invertidos (fim antes do início)
    if (end < start) end = start;

    // Ignorar fora do ano selecionado
    if (end < yr.start || start > yr.end) return;

    // Encaixe em trilha existente
    let trilhaIndex = -1;
    for (let i = 0; i < trilhas.length; i++) {
      const lastEvt = trilhas[i][trilhas[i].length - 1];
      const lastEnd = parseISODateLocal(lastEvt.data_fim) || parseISODateLocal(lastEvt.data_inicio);
      if (!lastEnd) continue;

      // Cabe se houver pelo menos PROXIMITY_GAP_DAYS de separação
      if (diffDays(lastEnd, start) >= PROXIMITY_GAP_DAYS) {
        trilhaIndex = i;
        break;
      }
    }

    if (trilhaIndex === -1) {
      trilhas.push([evt]);
      trilhaIndex = trilhas.length - 1;
    } else {
      trilhas[trilhaIndex].push(evt);
    }

    // Clamp para o ano
    const vStart = start < yr.start ? yr.start : start;
    const vEnd = end > yr.end ? yr.end : end;

    const leftPct = (diffDays(yr.start, vStart) / yr.totalDays) * 100;
    const widthPct = Math.max(((diffDays(vStart, vEnd) + 1) / yr.totalDays) * 100, 1);

    const bar = document.createElement('div');
    bar.className = `vacation-bar ${normalizeTipo(evt.tipo)}`;
    bar.style.left = `${leftPct}%`;
    bar.style.width = `${widthPct}%`;
    bar.style.top = `${6 + trilhaIndex * 32}px`;

    const dDays = diffDays(start, end) + 1;
    bar.textContent =
      dDays > 4
        ? `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`
        : '';

    bar.title = `${evt.tipo}: ${start.toLocaleDateString()} a ${end.toLocaleDateString()}`;

    grid.appendChild(bar);
  });

  // Ajusta altura da linha se tiver empilhamento
if (trilhas.length > 1) {
  const h = (trilhas.length * 32) + 16;
  row.style.minHeight = `${h}px`;
}

  row.appendChild(grid);
  container.appendChild(row);
}

function formatarNome(nome) {
  if (!nome) return '';
  const p = nome.toLowerCase().split(' ').filter(Boolean);

  if (p.length > 2) {
    const first = p[0];
    const last = p[p.length - 1];
    return `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
  }

  return p.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

// Toggle grupo (corrigido: sem querySelector “onclick=...”)
function toggleGroup(id) {
  const el = document.getElementById(`group-${id}`);
  const header = document.querySelector(`.group-header[data-group="${id}"]`);
  const icon = header?.querySelector('.expand-icon');
  if (!el) return;

  const isHidden = el.style.display === 'none';
  el.style.display = isHidden ? 'block' : 'none';
  icon?.classList.toggle('expanded', isHidden);
}

// ==========================================================================
// EVENTOS
// ==========================================================================

function setupEventListeners() {
  const ids = ['centroFilter', 'funcaoFilter', 'anoFilter', 'mesFilter', 'gestorFilter', 'funcionarioFilter'];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', refreshAll);
  });

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab || 'programadas';
      refreshAll();
    };
  });

  const toggleAllBtn = document.getElementById('toggleAllBtn');
  if (toggleAllBtn) {
    toggleAllBtn.onclick = () => {
      const allGroups = document.querySelectorAll('[id^="group-"]');
      const anyHidden = Array.from(allGroups).some((g) => g.style.display === 'none');

      allGroups.forEach((g) => (g.style.display = anyHidden ? 'block' : 'none'));

      // Atualiza setas
      document.querySelectorAll('.group-header').forEach((h) => {
        const ic = h.querySelector('.expand-icon');
        ic?.classList.toggle('expanded', anyHidden);
      });

      toggleAllBtn.textContent = anyHidden ? '▲ Recolher Tudo' : '▼ Expandir Tudo';
    };
  }
}

// ==========================================================================
// START
// ==========================================================================
init();
