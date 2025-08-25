import { create } from 'zustand';

export interface Consulta {
  id: string;
  cnpj: string;
  companyName: string;
  consultationType: string;
  date: Date;
  status: 'success' | 'error' | 'pending';
  result?: any;
  observations?: string;
  pdfUrl?: string;
  cost: number;
}

interface ConsultasStore {
  consultas: Consulta[];
  isLoading: boolean;
  currentMonthUsage: {
    total: number;
    included: number;
    excess: number;
    cost: number;
  };
  addConsulta: (consulta: Omit<Consulta, 'id'>) => void;
  updateConsulta: (id: string, updates: Partial<Consulta>) => void;
  getConsultas: () => Promise<void>;
  processarPlanilha: (file: File) => Promise<void>;
}

export const useConsultasStore = create<ConsultasStore>((set, get) => ({
  consultas: [
    {
      id: '1',
      cnpj: '11.222.333/0001-81',
      companyName: 'Empresa Exemplo Ltda',
      consultationType: 'Relatório Completo',
      date: new Date(),
      status: 'success',
      cost: 4.50,
      observations: 'Empresa com bom histórico comercial',
      pdfUrl: '#',
    },
    {
      id: '2', 
      cnpj: '22.333.444/0001-92',
      companyName: 'Comércio ABC S.A.',
      consultationType: 'Consulta Básica',
      date: new Date(Date.now() - 86400000),
      status: 'success',
      cost: 2.50,
    },
  ],
  isLoading: false,
  currentMonthUsage: {
    total: 45,
    included: 100,
    excess: 0,
    cost: 0,
  },

  addConsulta: (consulta) => {
    const newConsulta = {
      ...consulta,
      id: Math.random().toString(),
    };
    set((state) => ({
      consultas: [newConsulta, ...state.consultas],
    }));
  },

  updateConsulta: (id, updates) => {
    set((state) => ({
      consultas: state.consultas.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  },

  getConsultas: async () => {
    set({ isLoading: true });
    // Simulação de API call
    setTimeout(() => {
      set({ isLoading: false });
    }, 1000);
  },

  processarPlanilha: async (file: File) => {
    set({ isLoading: true });
    
    // Simulação de processamento
    setTimeout(() => {
      const mockConsultas = [
        {
          cnpj: '33.444.555/0001-03',
          companyName: 'Nova Empresa Ltd',
          consultationType: 'Relatório Completo',
          date: new Date(),
          status: 'success' as const,
          cost: 4.50,
        },
        {
          cnpj: '44.555.666/0001-14', 
          companyName: 'Comércio XYZ',
          consultationType: 'Consulta Básica',
          date: new Date(),
          status: 'success' as const,
          cost: 2.50,
        },
      ];

      mockConsultas.forEach((consulta) => {
        get().addConsulta(consulta);
      });

      set({ isLoading: false });
    }, 3000);
  },
}));