export const DOCUMENT_TYPE_LABELS: Record<number, string> = {
  1: 'BI / Passaporte',
  2: 'Certificado',
  3: 'Fotografias',
  4: 'Cédula Profissional',
  5: 'Declaração de Tempo de Serviço',
  6: 'Declaração de Autorização',
  7: 'Certidão Militar Regularizado',
  8: 'Registo Criminal',
  9: 'Talão de Recenseamento Militar',
  10: 'Atestado Médico',
  11: 'Declaração INAAREES',
  12: 'Declaração de Formação Pedagógica',
  13: 'Curriculum Vitae',
  14: 'Conta Bancária',
  15: 'Carta de Apresentação',
  16: 'Comprovativo Bancário',
  17: 'Projecto de Investigação Científica',
  18: 'Declaração de Proficiência em Inglês',
}

export function getDocumentTypeLabel(id: number): string {
  return DOCUMENT_TYPE_LABELS[id] ?? `Documento (${id})`
}