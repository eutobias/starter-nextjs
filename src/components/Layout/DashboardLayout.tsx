import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(80);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 80) {
        setSidebarWidth(280);
      } else if (e.clientX > 280) {
        setSidebarWidth(80);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      {/* <Sidebar /> */}
      <Box py={6} px={6} transition="margin-left 0.3s ease">
        <Container maxW="6xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
}