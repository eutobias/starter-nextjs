import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  cnpj: string;
  isAdmin: boolean;
  plan: {
    id: string;
    name: string;
    monthlyValue: number;
    includedConsultations: number;
    excessValue: number;
    modules: string[];
  };
  permissions: {
    tool: string;
    canView: boolean;
    canExecute: boolean;
    canManage: boolean;
  }[];
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulação de API call com diferentes tipos de usuário
          let mockUser: User;
          
          if (email === 'admin@exemplo.com') {
            // Usuário Administrador
            mockUser = {
              id: '1',
              name: 'Admin Sistema',
              email: email,
              companyName: 'Business Hub Admin',
              cnpj: '00.000.000/0001-00',
              isAdmin: true,
              plan: {
                id: '3',
                name: 'Empresarial',
                monthlyValue: 699.90,
                includedConsultations: 1000,
                excessValue: 2.90,
              },
              permissions: [
                {
                  tool: 'admin_panel',
                  canView: true,
                  canExecute: true,
                  canManage: true,
                },
                {
                  tool: 'user_management',
                  canView: true,
                  canExecute: true,
                  canManage: true,
                },
                {
                  tool: 'consultas_empresariais',
                  canView: true,
                  canExecute: true,
                  canManage: true,
                },
              ],
            };
          } else {
            // Usuário Regular
            mockUser = {
              id: '2',
              name: 'João Silva',
              email: email,
              companyName: 'Silva & Associados Ltda',
              cnpj: '12.345.678/0001-90',
              isAdmin: false,
              plan: {
                id: '2',
                name: 'Profissional',
                monthlyValue: 299.90,
                includedConsultations: 100,
                excessValue: 4.50,
              },
              permissions: [
                {
                  tool: 'consultas_empresariais',
                  canView: true,
                  canExecute: true,
                  canManage: false,
                },
              ],
            };
          }

          set({ 
            user: mockUser, 
            token: 'mock-jwt-token',
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: any) => {
        set({ isLoading: true });
        try {
          // Simulação de registro
          const newUser: User = {
            id: Math.random().toString(),
            name: data.name,
            email: data.email,
            companyName: data.companyName,
            cnpj: data.cnpj,
            isAdmin: false,
              modules: ['analise-credito', 'cobranca', 'geracao-leads', 'otimizacao-faturamento', 'conciliacao-financeira'],
              modules: ['analise-credito', 'otimizacao-faturamento'],
            plan: data.plan,
            permissions: [
              {
                tool: 'consultas_spc',
                canView: true,
                canExecute: true,
                canManage: false,
              },
            ],
          };

          set({ 
            user: newUser, 
            token: 'mock-jwt-token',
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);