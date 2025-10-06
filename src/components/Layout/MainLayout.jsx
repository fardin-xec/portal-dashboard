// src/components/Layout/MainLayout.jsx
import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  useTheme,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import TabsComponent from '../Tabs/TabsComponent';

const MainLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header - Full Width */}
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #9e1b5cff 0%, #92366aff 100%)',
          boxShadow: '0 2px 10px rgba(139, 74, 156, 0.3)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Company Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              
              {/* Fallback Avatar */}
              <Avatar
                className="fallback-avatar"
                sx={{
                  mr: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 45,
                  height: 45,
                  display: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                C
              </Avatar>
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="h5" 
                noWrap 
                component="div" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Portal Dashboard
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  lineHeight: 1
                }}
              >
                Management System
              </Typography>
            </motion.div>
          </Box>

          {/* User Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Welcome Back
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Admin User
                </Typography>
              </Box>
              <Avatar 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                <Person />
              </Avatar>
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Main Content - Full Width, No Sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          pt: { xs: 9, sm: 10 }, // Account for fixed header
          px: { xs: 2, sm: 3, md: 4 },
          pb: 3,
        }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TabsComponent />
        </motion.div>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: { xs: 2, md: 4 },
          mt: 'auto',
          backgroundColor: 'rgba(139, 74, 156, 0.05)',
          borderTop: '1px solid rgba(139, 74, 156, 0.1)',
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: '0.875rem' }}
        >
          © 2024 Portal Dashboard. All rights reserved. | Version 2.1.0
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;