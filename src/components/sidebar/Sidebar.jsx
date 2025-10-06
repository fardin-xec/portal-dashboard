// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  Assignment,
  Comment,
  Person,
  Settings,
  Analytics,
  Notifications,
  Help,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const navigationItems = [
  { text: 'Dashboard', icon: <Dashboard />, active: true },
  { text: 'My Requests', icon: <Assignment />, active: false },
  { text: 'Workflows', icon: <Analytics />, active: false },
  { text: 'Comments', icon: <Comment />, active: false },
];

const serviceItems = [
  { text: 'Profile', icon: <Person />, active: false },
  { text: 'Settings', icon: <Settings />, active: false },
  { text: 'Notifications', icon: <Notifications />, active: false },
  { text: 'Help', icon: <Help />, active: false },
];

const Sidebar = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Toolbar sx={{ px: 2, py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mr: 2,
                background: 'linear-gradient(135deg, #8B4A9C 0%, #A855A8 100%)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                P
              </Typography>
            </Avatar>
          </motion.div>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Portal
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Management System
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation Items */}
      <Box sx={{ px: 1, py: 2 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          Navigation
        </Typography>
        <List sx={{ py: 1 }}>
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: item.active ? 'primary.main' : 'transparent',
                    color: item.active ? 'white' : 'text.primary',
                    '&:hover': {
                      backgroundColor: item.active
                        ? 'primary.dark'
                        : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: item.active ? 'white' : 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: item.active ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Services Section */}
      <Box sx={{ px: 1, py: 2, flexGrow: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        >
          Services
        </Typography>
        <List sx={{ py: 1 }}>
          {serviceItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: (index + 4) * 0.1 }}
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'text.secondary',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Version 2.1.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;