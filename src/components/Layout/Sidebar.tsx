import React from 'react';
import { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Link,
  Icon,
  Badge,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { useAuthStore } from '../../stores/authStore';
import { 
  Search, 
  Mail, 
  Users, 
  TrendingUp, 
  Receipt,
  Lock
} from 'lucide-react';
import NextLink from '@/components/NextLink';

const services = [
  {
    id: 'analise-credito',
    name: 'Análise de Crédito',
    icon: Search,
    path: '/consultas',
    description: 'Consultas empresariais e análise de risco',
    available: true,
  },
  {
    id: 'cobranca',
    name: 'Cobrança',
    icon: Mail,
    path: '/cobranca',
    description: 'Sistema automatizado de cobrança',
    available: false,
  },
  {
    id: 'geracao-leads',
    name: 'Geração de Leads',
    icon: Users,
    path: '/leads',
    description: 'Identificação de oportunidades de negócio',
    available: false,
  },
  {
    id: 'otimizacao-faturamento',
    name: 'Otimização de Faturamento',
    icon: TrendingUp,
    path: '/faturamento',
    description: 'Análise e otimização de receitas',
    available: false,
  },
  {
    id: 'conciliacao-financeira',
    name: 'Conciliação Financeira',
    icon: Receipt,
    path: '/conciliacao',
    description: 'Automatização da conciliação bancária',
    available: false,
  },
];

export default function Sidebar() {
  const { user } = useAuthStore();
  // const location = useLocation();
  const location = {
    pathname: '/dashboard',
  }
  const [isExpanded, setIsExpanded] = useState(false);

  const hasAccessToService = (serviceId: string) => {
    if (!user?.plan.modules) return serviceId === 'analise-credito';
    return user.plan.modules.includes(serviceId);
  };

  return (
    <Box
      w={isExpanded ? "280px" : "80px"}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      h="calc(100vh - 64px)"
      position="fixed"
      left={0}
      top="64px"
      overflowY="auto"
      p={4}
      zIndex={100}
      transition="width 0.3s ease"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <VStack spacing={4} align="stretch">
        <Box>
          {isExpanded && (
            <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3} textTransform="uppercase">
              Serviços Disponíveis
            </Text>
          )}
          
          <VStack spacing={2} align="stretch">
            {services.map((service) => {
              const hasAccess = hasAccessToService(service.id);
              const isActive = location.pathname === service.path;
              const ServiceIcon = service.icon;

              if (!hasAccess && !service.available) {
                return (
                  <Tooltip
                    key={service.id}
                    label={isExpanded ? undefined : `${service.name} - Não incluído no seu plano`}
                    placement="right"
                    isDisabled={isExpanded}
                  >
                    <Box
                      p={3}
                      rounded="md"
                      bg="gray.50"
                      opacity={0.6}
                      cursor="not-allowed"
                      position="relative"
                    >
                      <VStack align={isExpanded ? "start" : "center"} spacing={2}>
                        <Box display="flex" alignItems="center" gap={3} w="full" justifyContent={isExpanded ? "flex-start" : "center"}>
                          <Icon as={Lock} size={16} color="gray.400" />
                          {isExpanded && (
                            <>
                              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                                {service.name}
                              </Text>
                              <Badge colorScheme="gray" size="sm" ml="auto">
                                Bloqueado
                              </Badge>
                            </>
                          )}
                        </Box>
                        {isExpanded && (
                          <Text fontSize="xs" color="gray.400">
                            {service.description}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </Tooltip>
                );
              }

              if (!service.available) {
                return (
                  <Tooltip
                    key={service.id}
                    label={isExpanded ? undefined : `${service.name} - Em desenvolvimento`}
                    placement="right"
                    isDisabled={isExpanded}
                  >
                    <Box
                      p={3}
                      rounded="md"
                      bg="blue.50"
                      cursor="not-allowed"
                      border="1px"
                      borderColor="blue.200"
                    >
                      <VStack align={isExpanded ? "start" : "center"} spacing={2}>
                        <Box display="flex" alignItems="center" gap={3} w="full" justifyContent={isExpanded ? "flex-start" : "center"}>
                          <ServiceIcon size={16} color="#3182ce" />
                          {isExpanded && (
                            <>
                              <Text fontSize="sm" color="blue.700" fontWeight="medium">
                                {service.name}
                              </Text>
                              <Badge colorScheme="blue" size="sm" ml="auto">
                                Em Breve
                              </Badge>
                            </>
                          )}
                        </Box>
                        {isExpanded && (
                          <Text fontSize="xs" color="blue.600">
                            {service.description}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </Tooltip>
                );
              }

              return (
                <Tooltip
                  key={service.id}
                  label={isExpanded ? undefined : service.name}
                  placement="right"
                  isDisabled={isExpanded}
                >
                  <Link
                    as={NextLink}
                    href={service.path}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      p={3}
                      rounded="md"
                      bg={isActive ? 'brand.50' : 'transparent'}
                      border="1px"
                      borderColor={isActive ? 'brand.200' : 'transparent'}
                      _hover={{
                        bg: isActive ? 'brand.50' : 'gray.50',
                        borderColor: isActive ? 'brand.200' : 'gray.200',
                      }}
                      transition="all 0.2s"
                    >
                      <VStack align={isExpanded ? "start" : "center"} spacing={2}>
                        <Box display="flex" alignItems="center" gap={3} w="full" justifyContent={isExpanded ? "flex-start" : "center"}>
                          <ServiceIcon 
                            size={16} 
                            color={isActive ? '#0066cc' : '#4a5568'} 
                          />
                          {isExpanded && (
                            <>
                              <Text 
                                fontSize="sm" 
                                color={isActive ? 'brand.700' : 'gray.700'} 
                                fontWeight={isActive ? 'semibold' : 'medium'}
                              >
                                {service.name}
                              </Text>
                              {hasAccess && (
                                <Badge colorScheme="green" size="sm" ml="auto">
                                  Ativo
                                </Badge>
                              )}
                            </>
                          )}
                        </Box>
                        {isExpanded && (
                          <Text fontSize="xs" color="gray.500">
                            {service.description}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </Link>
                </Tooltip>
              );
            })}
          </VStack>
        </Box>

        <Divider />

        <Box>
          {isExpanded && (
            <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} textTransform="uppercase">
              Seu Plano
            </Text>
          )}
          <Tooltip
            label={isExpanded ? undefined : `${user?.plan.name} - ${user?.plan.modules?.length || 1} módulo${(user?.plan.modules?.length || 1) > 1 ? 's' : ''}`}
            placement="right"
            isDisabled={isExpanded}
          >
            <Box p={3} bg="gray.50" rounded="md" textAlign={isExpanded ? "left" : "center"}>
              {isExpanded ? (
                <>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                    {user?.plan.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {user?.plan.modules?.length || 1} módulo{(user?.plan.modules?.length || 1) > 1 ? 's' : ''} ativo{(user?.plan.modules?.length || 1) > 1 ? 's' : ''}
                  </Text>
                </>
              ) : (
                <Text fontSize="xs" fontWeight="bold" color="gray.700">
                  {user?.plan.name.charAt(0)}
                </Text>
              )}
            </Box>
          </Tooltip>
        </Box>
      </VStack>
    </Box>
  );
}