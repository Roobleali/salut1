import { type SupportedLanguages } from './translation';

export interface GlossaryTerm {
  id: string;
  industries: string[];
  translations: Record<SupportedLanguages, {
    term: string;
    definition: string;
    example?: string;
  }>;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'mrp',
    industries: ['manufacturing'],
    translations: {
      en: {
        term: 'MRP (Material Requirements Planning)',
        definition: 'A production planning, scheduling, and inventory control system used to manage manufacturing processes.',
        example: 'Using MRP to calculate raw material needs for next month\'s production schedule'
      },
      ro: {
        term: 'MRP (Planificarea Necesarului de Materiale)',
        definition: 'Un sistem de planificare a producției, programare și control al inventarului utilizat pentru gestionarea proceselor de fabricație.',
        example: 'Utilizarea MRP pentru calcularea necesarului de materii prime pentru programul de producție al lunii viitoare.'
      }
    }
  },
  {
    id: 'efactura',
    industries: ['manufacturing', 'healthcare', 'real-estate'],
    translations: {
      en: {
        term: 'e-Factura',
        definition: 'Romanian electronic invoicing system mandatory for B2B transactions.',
        example: 'Submitting monthly supplier invoices through the e-Factura platform.'
      },
      ro: {
        term: 'e-Factura',
        definition: 'Sistem electronic românesc de facturare obligatoriu pentru tranzacțiile B2B.',
        example: 'Transmiterea facturilor lunare către furnizori prin platforma e-Factura.'
      }
    }
  },
  {
    id: 'cnas',
    industries: ['healthcare'],
    translations: {
      en: {
        term: 'CNAS (National Health Insurance House)',
        definition: 'Romanian public institution that manages the health insurance system.',
        example: 'Submitting medical services reports to CNAS for reimbursement.'
      },
      ro: {
        term: 'CNAS (Casa Națională de Asigurări de Sănătate)',
        definition: 'Instituție publică română care administrează sistemul asigurărilor de sănătate.',
        example: 'Transmiterea rapoartelor de servicii medicale către CNAS pentru decontare.'
      }
    }
  }
];
