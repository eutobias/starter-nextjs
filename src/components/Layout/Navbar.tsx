import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Text,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { Link as NextLink, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../stores/authStore';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import { VStack } from "@chakra-ui/react";
import NextLink from "@/components/NextLink";
import { useAuthStore } from "@/stores/authStore";

const Links = [
  { name: "Dashboard", href: "/painel", icon: BarChart3, painelOnly: false },
  { name: "Consultas", href: "/painel/consultas", icon: FileText },
  { name: "Histórico", href: "/painel/historico", icon: FileText },
  { name: "Estatísticas", href: "/painel/estatisticas", icon: BarChart3 },
  { name: "Usuários", href: "/painel/usuarios", icon: Users },
  { name: "Configurações", href: "/painel/configuracoes", icon: Settings },
  { name: "Planos", href: "/painel/planos", icon: Settings },
  // { name: "Admin", href: "/admin", icon: Settings, adminOnly: true },
];

const NavLink = ({ children, href, icon: Icon }: any) => (
  <Link
    as={NextLink}
    href={href}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    display="flex"
    alignItems="center"
    gap={2}
  >
    <Icon size={16} />
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuthStore();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    // navigate("/");
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      shadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems="center">
          <HStack as={NextLink} href="/" spacing={2}>
            <Building2 size={28} color="#0066cc" />
            <Text fontWeight="bold" fontSize="xl" color="brand.500">
              Business Hub
            </Text>
          </HStack>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.filter((link) => !link.adminOnly || user?.isAdmin).map(
              (link) => (
                <NavLink
                  key={link.name}
                  href={
                    user?.isAdmin && link.name === "Dashboard"
                      ? "/admin/dashboard"
                      : link.href
                  }
                  icon={link.icon}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <HStack>
                <Avatar size="sm" name={user?.name} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight="600">
                    {user?.name}
                  </Text>
                  <Badge colorScheme="brand" fontSize="xs">
                    {user?.plan.name}
                  </Badge>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <ChevronDownIcon />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={NextLink} href="/perfil">
                Meu Perfil
              </MenuItem>
              <MenuItem as={NextLink} href="/planos">
                Planos
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout} icon={<LogOut size={16} />}>
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.filter((link) => !link.adminOnly || user?.isAdmin).map(
              (link) => (
                <NavLink
                  key={link.name}
                  href={
                    user?.isAdmin && link.name === "Dashboard"
                      ? "/admin/dashboard"
                      : link.href
                  }
                  icon={link.icon}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
